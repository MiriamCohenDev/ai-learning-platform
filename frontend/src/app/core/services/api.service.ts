import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RegisterRequest, LoginRequest, AuthResponse } from '../../models/auth.model';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';

/**
 * ApiService handles all HTTP requests to the backend API.
 * 
 * Responsibilities:
 * - User authentication (register, login)
 * - Fetching categories and sub-categories
 * - Submitting prompts and retrieving lessons
 * - Admin operations (fetch users and user history)
 * 
 * Notes:
 * - Checks if running in the browser before using cookies or environment values.
 * - Throws errors with messages if the API response is not ok.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  /** Base URL of the backend API, read from environment config */
  private baseUrl = environment.apiUrl;
  private platformId = inject(PLATFORM_ID);
  private tokenService = inject(TokenService);

  constructor() {
    // Ensure baseUrl is set only in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.baseUrl = environment.apiUrl;
    }
  }

  /**
  * Registers a new user.
  * @param data RegisterRequest containing name, ID number, etc.
  * @returns AuthResponse including JWT token
  * @throws Error if registration fails
  */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return response.json();
  }

  /**
 * Logs in a user.
 * @param data LoginRequest containing name and ID
 * @returns AuthResponse including JWT token
 * @throws Error if login fails
 */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  }

  /**
 * Fetch all main categories.
 * This endpoint is public, no authentication required.
 */
  async getCategories(): Promise<Array<{ _id: string; name: string }>> {
    const res = await fetch(`${this.baseUrl}/categories`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to load categories' }));
      throw new Error(err.message || 'Failed to load categories');
    }
    return res.json();
  }

  /**
 * Fetch sub-categories for a specific category.
 * This endpoint is public, no authentication required.
 * @param categoryId The ID of the category
 */
  async getSubCategories(categoryId: string): Promise<Array<{ _id: string; name: string }>> {
    const res = await fetch(`${this.baseUrl}/categories/${categoryId}/sub-categories`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to load sub-categories' }));
      throw new Error(err.message || 'Failed to load sub-categories');
    }
    return res.json();
  }

  /**
 * Submit a prompt to generate a lesson via AI.
 * Requires user authentication (adds JWT in headers).
 * @param data Object containing categoryId, subCategoryId, and user prompt
 * @returns Object containing the AI-generated lesson
 * @throws Error if submission fails or AI returns out-of-scope response
 */
  async submitPrompt(data: {
    categoryId: string;
    subCategoryId: string;
    prompt: string;
  }): Promise<{ lesson: string }> {
    const res = await fetch(`${this.baseUrl}/prompts`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to generate lesson' }));
      throw new Error(err.message || 'Failed to generate lesson');
    }
    return res.json();
  }

  /**
 * Fetch the authenticated user's lesson history.
 * @returns Array of lessons
 * @throws Error if request fails
 */
  async getHistory(): Promise<any[]> {
    const res = await fetch(`${this.baseUrl}/prompts/history`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to load history' }));
      throw new Error(err.message || 'Failed to load history');
    }

    return res.json();
  }

  /**
  * Fetch a single lesson by ID for the authenticated user.
  * @param id The prompt/lesson ID
  */
  async getLessonById(id: string): Promise<any> {
    const res = await fetch(`${this.baseUrl}/prompts/history/${id}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to load lesson' }));
      throw new Error(err.message || 'Failed to load lesson');
    }

    return res.json();
  }

  /**
   * Admin: Fetch all users.
   * Requires admin authentication.
   * @returns Array of users with id, name, ID number, optional phone
   */
  async getAllUsers(): Promise<Array<{ id: string; name: string; idNumber: string; phone?: string }>> {
    const res = await fetch(`${this.baseUrl}/admin/users`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to load users' }));
      throw new Error(err.message || 'Failed to load users');
    }
    return res.json();
  }

  /**
   * Admin: Fetch a specific user's lesson history.
   * @param userId The user ID
   */
  async getUserHistory(userId: string): Promise<any[]> {
    const res = await fetch(`${this.baseUrl}/admin/users/${userId}/history`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to load history' }));
      throw new Error(err.message || 'Failed to load history');
    }
    return res.json();
  }

  /**
  * Admin: Fetch a specific prompt for a specific user.
  * @param userId The user ID
  * @param promptId The prompt ID
  */
  async getUserPrompt(userId: string, promptId: string): Promise<any> {
    const res = await fetch(`${this.baseUrl}/admin/users/${userId}/prompt/${promptId}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to load lesson' }));
      throw new Error(err.message || 'Failed to load lesson');
    }
    return res.json();
  }

  /**
 * Returns the HTTP headers for authenticated requests.
 * Adds Authorization header with JWT if token exists in cookies.
 */
  private getAuthHeaders(): HeadersInit {
    const token = this.tokenService.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  }

}
