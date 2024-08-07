import React, { useState, useEffect } from 'react';
import { isTokenExpired, refreshAccessToken } from '../utils/token';

interface LoginModalProps {
  show: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

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
        throw new Error(errorData.message || errorData.detail || "로그인 실패");
      }

      const data = await response.json();
      localStorage.setItem('token', data.access);
      localStorage.setItem('refresh_token', data.refresh); // Refresh token 저장
      alert('로그인 성공');
      onLoginSuccess();
      onClose();
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
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refresh_token');
      if (isTokenExpired(token) && refreshToken) {
        try {
          await refreshAccessToken(refreshToken);
        } catch (error) {
          console.error(error);
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          setErrorMessage('세션이 만료되었습니다. 다시 로그인해주세요.');
          onClose();
        }
      }
    };

    if (show) {
      checkTokenExpiry();
    }
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white p-8 rounded shadow-md w-96 z-10">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">X</button>
        <h2 className="text-2xl font-bold mb-4">로그인</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full mb-2 p-2 border rounded ${errorMessage && 'border-red-500'}`}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full mb-2 p-2 border rounded ${errorMessage && 'border-red-500'}`}
        />
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          로그인 하기
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
