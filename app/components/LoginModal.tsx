import React, { useState, useEffect, FormEvent } from 'react';
import ModalLayout from './ModalLayout';
import { isTokenExpired, refreshAccessToken } from '../utils/token';
import { setCookie, getCookie, deleteCookie } from '../utils/cookies';
import { LoginModalProps } from '@/app/types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const LoginModal: React.FC<LoginModalProps> = ({ show, onClose, onLoginSuccess, openSignupModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    // Reset error messages
    setUsernameError('');
    setPasswordError('');
    setErrorMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/accounts/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // 에러 메시지 설정
        let hasError = false;
        if (errorData.username) {
          setUsernameError('해당 아이디를 찾을 수 없습니다.');
          hasError = true;
        }
        if (errorData.password) {
          setPasswordError('비밀번호가 틀렸습니다.');
          hasError = true;
        }

        // usernameError나 passwordError가 설정되지 않은 경우에만 일반 에러 메시지 설정
        if (!hasError) {
          setErrorMessage('알 수 없는 오류가 발생했습니다.');
        }
        return; // 더 이상 진행하지 않음
      }

      const data = await response.json();
      setCookie('token', data.access, 1);
      setCookie('refresh_token', data.refresh, 7);

      onLoginSuccess();
      onClose();
      window.location.reload();
    } catch (error) {
      setErrorMessage('알 수 없는 오류가 발생했습니다.');
    }
  };


  useEffect(() => {
    const checkTokenExpiry = async () => {
      const token = getCookie('token');
      const refreshToken = getCookie('refresh_token');

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
      <form onSubmit={handleLogin} className="relative bg-white p-8 shadow-md w-full h-full sm:rounded-2xl sm:w-96 sm:h-[70%]">
        <button onClick={onClose} type="button" className="text-2xl absolute top-2 right-2 text-gray-600">X</button>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="text-center font-schoolbell text-orange-600 text-4xl sm:mx-auto sm:w-full sm:max-w-sm">
            picknpop
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
                    placeholder="email@email.com"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    className={`block w-full focus:outline-none rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 ${
                      usernameError ? 'border-red-500' : ''
                    }`}
                  />
                  {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    비밀번호<span className="pl-1 text-red-800">*</span>
                  </label>
                </div>
                <div className="mt-2">
                  <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        value={password}
                        placeholder="비밀번호"
                        onChange={(e) => setPassword(e.target.value)}
                        className={`block w-full focus:outline-none rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 ${
                          passwordError ? 'border-red-500' : ''
                        }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                    >
                      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                    </button>
                  </div>
                  {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                </div>
              </div>

              {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}

              <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                  로그인
                </button>
              </div>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
              계정이 필요하신가요?{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  openSignupModal();
                }}
                className="font-semibold leading-6 text-orange-600 hover:text-orange-400"
              >
                가입하기
              </a>
            </p>
          </div>
        </div>
      </form>
    </ModalLayout>
  );
};

export default LoginModal;
