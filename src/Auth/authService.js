// authService.js
const BASE_URL = "http://vipasyanadoc-001-site19.ktempurl.com";

export const login = async (credentials) => {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include' // Ensure cookies are included
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Login failed');
  }
  return result;
};
