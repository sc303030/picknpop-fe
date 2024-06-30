// utils/token.ts

export function isTokenExpired(token: string | null): boolean {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.exp * 1000 < Date.now();
}

export async function refreshAccessToken(refreshToken: string): Promise<string> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/accounts/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh access token');
  }

  const data = await response.json();
  localStorage.setItem('token', data.access);
  return data.access;
}
