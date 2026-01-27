// API service for communicating with the FastAPI backend

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

/**
 * Send a message to the chat API and get a response
 * @param {string} message - The user's message
 * @returns {Promise<string>} - The AI's reply
 * @throws {Error} - If the API call fails
 */
export async function sendMessage(message) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `Server error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    // Network errors or other fetch failures
    if (error.message.includes('Failed to fetch')) {
      throw new Error(
        'Unable to connect to the server. Please make sure the backend is running on port 8000.'
      );
    }
    throw error;
  }
}

/**
 * Check if the API is available
 * @returns {Promise<boolean>} - True if the API is reachable
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    return response.ok;
  } catch (error) {
    return false;
  }
}
