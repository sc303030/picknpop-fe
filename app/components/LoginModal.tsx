import React, { useState, useEffect } from 'react';
import ModalLayout from './ModalLayout';
import { isTokenExpired, refreshAccessToken } from '../utils/token';
import { setCookie, getCookie, deleteCookie } from '../utils/cookies';
import { LoginModalProps } from '@/app/types';

const LoginModal: React.FC<LoginModalProps> = ({ show, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/accounts/sign-in/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.detail || '로그인 실패');
      }

      const data = await response.json();

      // 쿠키에 access token과 refresh token 저장 (1일간 유효)
      setCookie('token', data.access, 1); // access token 저장
      setCookie('refresh_token', data.refresh, 7); // refresh token은 7일간 유효

      onLoginSuccess();
      onClose();
      window.location.reload(); // 새로고침하여 상태 반영
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  useEffect(() => {
  const checkTokenExpiry = async () => {
    const token = getCookie('token');
    const refreshToken = getCookie('refresh_token');

    // token과 refreshToken이 undefined가 아닐 때 처리
    if (token && isTokenExpired(token) && refreshToken) {
      try {
        await refreshAccessToken(refreshToken);
      } catch (error) {
        console.error(error);
        deleteCookie('token');
        deleteCookie('refresh_token');
        setErrorMessage('세션이 만료되었습니다. 다시 로그인해주세요.');
        onClose();
      }
    }
  };

  if (show) {
    checkTokenExpiry();
  }
}, [show]);

  return (
    <ModalLayout show={show} onClose={onClose}>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
            alt="Your Company"
            width={40}
            height={40}
          />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                이메일<span className="pl-1 text-red-800">*</span>
              </label>

              <div className="mt-2">
                <input
                  type="email"
                  value={username}
                  autoComplete="email"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  className={`block w-full focus:outline-none rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 ${
                    errorMessage && 'border-red-500'
                  }`}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  비밀번호<span className="pl-1 text-red-800">*</span>
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-orange-600 hover:text-orange-400">
                    비밀번호 찾기
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full focus:outline-none rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 ${
                    errorMessage && 'border-red-500'
                  }`}
                />
              </div>
            </div>

            {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}

            <div>
              <button
                onClick={handleLogin}
                className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                로그인
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            계정이 필요하신가요?{' '}
            <a href="#" className="font-semibold leading-6 text-orange-600 hover:text-orange-400">
              가입하기
            </a>
          </p>
        </div>
      </div>
    </ModalLayout>
  );
};

export default LoginModal;
