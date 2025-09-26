// This file is a placeholder for non-Gemini API calls, e.g., to your own backend for auth, booking, etc.
// For now, it is empty as the current feature set does not require it.

export const mockApiCall = async () => {
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
}
