import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RegisterRequest, LoginRequest, AuthResponse } from '../../models/auth.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3000';
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.baseUrl = (window as any).__env?.API_URL || 'http://localhost:3000';
    }
  }

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

  // Fetch all categories
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

  // Fetch sub-categories for a category id
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

  // Submit a prompt to get a lesson
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

    // Fetch lesson history
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

  // Fetch a single lesson by its ID
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

  // Fetch all users (admin)
async getAllUsers(): Promise<Array<{ id: string; name: string; idNumber: string; phone?: string }>> {
  const res = await fetch(`${this.baseUrl}/users`, {
    method: 'GET',
    headers: this.getAuthHeaders(),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Failed to load users' }));
    throw new Error(err.message || 'Failed to load users');
  }
  return res.json();
}

// Fetch user history by ID (admin)
async getUserHistory(userId: string): Promise<any[]> {
  const res = await fetch(`${this.baseUrl}/users/${userId}/history`, {
    method: 'GET',
    headers: this.getAuthHeaders(),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Failed to load history' }));
    throw new Error(err.message || 'Failed to load history');
  }
  return res.json();
}



  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  }

}
