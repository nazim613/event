// lib/api-service.js

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