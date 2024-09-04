export function isTokenExpired(token: string | null): boolean {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.exp * 1000 < Date.now();
}

export function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
}

export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
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
    deleteCookie('token');
    deleteCookie('refresh_token');
    alert('세션이 만료되었습니다');
    window.location.href = '/';
    throw new Error('Failed to refresh access token');
  }

  const data = await response.json();
  setCookie('token', data.access, 7);
  return data.access;
}
