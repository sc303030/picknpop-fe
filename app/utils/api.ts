import {getCookie, isTokenExpired, refreshAccessToken} from './token';

async function apiCall(url: string, options: RequestInit = {}): Promise<Response> {
  let access: string | null = null;
  let refresh: string | null = null;

  const headers = new Headers(options.headers); // 기존 헤더를 기반으로 새 Headers 객체 생성

  if (typeof window !== 'undefined') {
    // 클라이언트에서 실행될 때
    access = getCookie('token'); // 쿠키에서 access token 가져오기
    refresh = getCookie('refresh_token'); // 쿠키에서 refresh token 가져오기
  } else if (headers.has('cookie')) {
    // 서버에서 실행될 때, 쿠키가 이미 헤더에 포함된 경우
    const cookieHeader = headers.get('cookie') || '';
    access = cookieHeader.match(/token=([^;]+)/)?.[1] || null;
    refresh = cookieHeader.match(/refresh_token=([^;]+)/)?.[1] || null;
  }

  if (!access) {
    throw new Error('No access token available');
  }

  // access token이 만료된 경우, refresh token을 사용해 갱신
  if (isTokenExpired(access) && refresh) {
    access = await refreshAccessToken(refresh);
    headers.set('Authorization', `Bearer ${access}`);
  } else {
    headers.set('Authorization', `Bearer ${access}`);
  }

  const response = await fetch(url, {
    ...options,
    headers, // 새로 설정된 headers 객체를 사용
  });

  // 401 Unauthorized 발생 시 재시도 로직
  if (response.status === 401 && refresh) {
    try {
      access = await refreshAccessToken(refresh);
      headers.set('Authorization', `Bearer ${access}`);
      const retryResponse = await fetch(url, {
        ...options,
        headers, // 재시도 시에도 같은 headers 객체를 사용
      });
      return retryResponse;
    } catch (error) {
      throw new Error('Failed to refresh token');
    }
  }

  return response;
}

export default apiCall;
