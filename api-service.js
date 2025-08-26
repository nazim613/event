// Use the environment variable for the base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * A reusable function to handle API requests.
 * It abstracts away the base URL and error handling.
 * @param {string} endpoint The specific API endpoint (e.g., '/form').
 * @param {object} options Fetch options (method, headers, body, etc.).
 * @returns {Promise<object>} The JSON response data.
 */
const apiCall = async (endpoint, options = {}) => {
  // Check if the API base URL is defined
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

    // We check for response.status === 204 to handle no content responses.
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

// Updated loginUser to separate token and user data in localStorage
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
      // Store token and non-sensitive user data separately for better security
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        id: data.user.id,
        name: data.user.name,
      }));
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

export const createCommunityPost = async (postData) => {
  const { content, authorId, token } = postData;
  return apiCall('/community/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // This is correct, token is used for authentication
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content, authorId }),
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