import { isTokenExpired, refreshAccessToken } from './token';
import { getCookie } from './cookies';

async function apiCall(url: string, options: RequestInit = {}): Promise<Response> {
  let access = getCookie('token'); // 쿠키에서 access token 가져오기
  const refresh = getCookie('refresh_token'); // 쿠키에서 refresh token 가져오기

  if (!access) {
    throw new Error('No access token available');
  }

  // access token이 만료된 경우, refresh token을 사용해 갱신
  if (isTokenExpired(access) && refresh) {
    access = await refreshAccessToken(refresh);
  }

  // API 요청 수행
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${access}`,
    },
  });

  // 만약 401 Unauthorized가 발생한 경우, 토큰 갱신을 시도하고 재시도
  if (response.status === 401 && refresh) {
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
