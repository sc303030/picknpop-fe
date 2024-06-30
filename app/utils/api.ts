import { isTokenExpired, refreshAccessToken } from './token';

async function apiCall(url: string, options: RequestInit = {}): Promise<Response> {
  let access = localStorage.getItem('token');
  const refresh = localStorage.getItem('refresh_token');

  if (!access) {
    throw new Error('No access token available');
  }

  if (isTokenExpired(access) && refresh) {
    access = await refreshAccessToken(refresh);
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${access}`,
    },
  });

  if (response.status === 401 && refresh) {  // Unauthorized
    try {
      access = await refreshAccessToken(refresh);
      const retryResponse = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${access}`,
        },
      });
      return retryResponse;
    } catch (error) {
      throw new Error('Failed to refresh token');
    }
  }

  return response;
}

export default apiCall;
