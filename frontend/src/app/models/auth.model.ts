export interface RegisterRequest {
  name: string;
  idNumber: string;
  phone?: string;
}

export interface LoginRequest {
  name: string;
  idNumber: string;
}


export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    name: string;
    idNumber: string;
    role: 'user' | 'admin';
  };
}


export interface AuthError {
  message: string;
  statusCode?: number;
}
