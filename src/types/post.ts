// User types
export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  role?: 'ADMIN' | 'USER';
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

// Post types - mapped to backend Post entity
export interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  author: User;
  createdAt: string;
  comments: Comment[];
}

export interface CreatePostRequest {
  title: string;
  content: string;
  imageUrl?: string;
}

// Comment types
export interface Comment {
  id: number;
  content: string;
  author: User;
  postId: number;
  createdAt: string;
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