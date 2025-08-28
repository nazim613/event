// Use the environment variable for the base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Import Supabase client
import { supabase } from './supabaseClient'; // Make sure this path is correct

/**
 * A reusable function to handle API requests.
 * It abstracts away the base URL and error handling.
 * @param {string} endpoint The specific API endpoint (e.g., '/form').
 * @param {object} options Fetch options (method, headers, body, etc.).
 * @returns {Promise<object>} The JSON response data.
 */
const apiCall = async (endpoint, options = {}) => {
  if (!API_BASE_URL) {
    throw new Error("API base URL is not configured. Please check your .env.local file.");
  }

  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    if (response.status === 204) {
      return {};
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

/**
 * Sends a new form submission to the backend.
 * @param {object} formData The data for the form to be submitted.
 * @returns {Promise<object>} The server's response.
 */
export const createForm = (formData) => {
  return apiCall('/form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
};

/**
 * Fetches all events from the backend.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of events.
 */
export const getEvents = () => {
  return apiCall('/events');
};

/**
 * Fetches all community posts from the backend.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of community posts.
 */
export const getCommunityPosts = () => {
  return apiCall('/community/posts');
};

/**
 * Updated loginUser to also sign in with Supabase client.
 * @param {object} credentials The user's login credentials.
 * @returns {Promise<object>} The server's response.
 */
export const loginUser = async (credentials) => {
  try {
    const data = await apiCall('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (data && data.user && data.token) {
      // Store token and non-sensitive user data separately
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        id: data.user.id,
        name: data.user.name,
      }));

      // A crucial step: Tell the Supabase client about the user session.
      // This allows it to make authenticated calls to storage.
      await supabase.auth.setSession({
        access_token: data.token,
        refresh_token: data.refreshToken,
      });
    }
    
    return data;
  } catch (error) {
    console.error('Login failed:', error.message);
    throw new Error(error.message || 'Login failed');
  }
};

export const registerUser = async (userData) => {
  try {
    const data = await apiCall('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    return data;
  } catch (error) {
    console.error('Registration failed:', error.message);
    throw new Error(error.message || 'Registration failed');
  }
};

/**
 * Creates a new community post, including an optional image upload to Supabase Storage.
 * @param {object} postData The data for the post.
 * @param {string} postData.content The content of the post.
 * @param {string} postData.authorId The ID of the author.
 * @param {File | null} postData.imageFile The image file to upload.
 * @param {string} postData.token The user's authentication token.
 * @returns {Promise<object>} The server's response.
 */
export const createCommunityPost = async ({ content, authorId, imageFile, token }) => {
  let postImageUrl = null;

  // Step 1: Upload the image to Supabase Storage if an image file exists
  if (imageFile) {
    const fileName = `${Date.now()}_${imageFile.name.replace(/\s/g, '_')}`;
    const filePath = `public/${authorId}/${fileName}`;
    
    // The RLS policy will now pass because the Supabase client is authenticated
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('community_posts') // Replace 'community-images' with your bucket name
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      throw new Error('Failed to upload image.');
    }

    // Step 2: Get the public URL for the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from('community_posts') // Replace with your bucket name
      .getPublicUrl(uploadData.path);

    postImageUrl = publicUrlData.publicUrl;
  }

  // Step 3: Call your backend API with the post content and image URL
  return apiCall('/community/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content, authorId, postImageUrl }), // Send the image URL to your backend
  });
};

/**
 * Updated to require a token for proper authorization.
 * @param {string} postId The ID of the post to update.
 * @param {boolean} isLiked The new like status.
 * @param {string} token The user's authentication token.
 * @returns {Promise<object>} A promise that resolves to the updated post object.
 */
export const togglePostLike = (postId, isLiked, token) => {
  return apiCall(`/community/posts/${postId}/like`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // ADDED: Authorization header to authenticate the user
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isLiked }),
  });
};
