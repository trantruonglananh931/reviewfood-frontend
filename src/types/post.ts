// User types
export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

// Authentication types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Post types
export interface Post {
  id: number;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  reactions: Reaction[];
  commentCount: number;
}

// Comment types
export interface Comment {
  id: number;
  content: string;
  author: User;
  postId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentRequest {
  content: string;
}

// Reaction types
export type ReactionType = 'LIKE' | 'LOVE' | 'ANGRY';

export interface Reaction {
  id: number;
  type: ReactionType;
  user: User;
  postId: number;
  createdAt: string;
}

export interface CreateReactionRequest {
  type: ReactionType;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}