import axiosClient from './axiosClient';
import type { Post, CreatePostRequest } from '../types/post';

const POST_API_URL = '/posts';

/**
 * Fetch all posts from the backend
 * GET /api/posts
 */
export const getAllPosts = async (): Promise<Post[]> => {
  try {
    console.log('Fetching posts from:', POST_API_URL);
    const response = await axiosClient.get<Post[]>(POST_API_URL);
    console.log('Posts response:', response.data);
    
    // Handle case where response might be wrapped in an object
    const data = Array.isArray(response.data) ? response.data : response.data;
    return data;
  } catch (error: any) {
    console.error('Error fetching posts:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
    });
    throw error;
  }
};

/**
 * Get a single post by ID
 * Note: Backend doesn't provide GET /api/posts/{id}, so we fetch all and filter
 * This can be optimized later if backend adds GET /api/posts/{id}
 */
export const getPostById = async (id: number): Promise<Post | null> => {
  try {
    const allPosts = await getAllPosts();
    const post = allPosts.find((p) => p.id === id);
    return post || null;
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new post (ADMIN only)
 * POST /api/posts
 */
export const createPost = async (postData: CreatePostRequest): Promise<Post> => {
  try {
    const response = await axiosClient.post<Post>(POST_API_URL, postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

/**
 * Update an existing post (ADMIN only)
 * PUT /api/posts/{id}
 */
export const updatePost = async (
  id: number,
  postData: CreatePostRequest
): Promise<Post> => {
  try {
    const response = await axiosClient.put<Post>(
      `${POST_API_URL}/${id}`,
      postData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating post with id ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a post (ADMIN only)
 * DELETE /api/posts/{id}
 */
export const deletePost = async (id: number): Promise<void> => {
  try {
    await axiosClient.delete(`${POST_API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting post with id ${id}:`, error);
    throw error;
  }
};
