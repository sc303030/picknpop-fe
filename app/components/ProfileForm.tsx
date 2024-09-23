'use client';

import { useState, useEffect } from 'react';
import apiCall from "@/app/utils/api";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    currentPassword: '', // 현재 비밀번호
    newPassword: '', // 새 비밀번호
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // 성공 메시지
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null); // 비밀번호 성공 메시지
  const [passwordError, setPasswordError] = useState<string | null>(null); // 비밀번호 에러 메시지

  // 프로필 데이터를 가져오는 함수
  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(`${process.env.NEXT_PUBLIC_USER_API_URL}/accounts/user/`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const data = await response.json();
      setFormData({
        ...formData,
        username: data.username || '',
        nickname: data.nickname || '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  // 입력 변화 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 프로필 수정 처리
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formDataToSend = new FormData();
    formDataToSend.append('nickname', formData.nickname);

    try {
      const response = await apiCall(`${process.env.NEXT_PUBLIC_USER_API_URL}/accounts/user/`, {
        method: 'PATCH',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setSuccess('프로필이 업데이트 되었습니다!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError(null);
    setPasswordSuccess(null);

    const passwordData = {
      old_password: formData.currentPassword,
      new_password1: formData.newPassword,
      new_password2: formData.newPassword,
    };

    try {
      const response = await apiCall(`${process.env.NEXT_PUBLIC_USER_API_URL}/accounts/password/change/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData),
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      setPasswordSuccess('비밀번호가 성공적으로 변경되었습니다.');
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 bg-white p-4 rounded-2xl">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">프로필 수정</h2>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                이메일
              </label>
              <div className="mt-2">
                <div
                  className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600"
                >
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full py-1.5 pl-1.5 rounded-md border-0 shadow-sm text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-gray-900">
                닉네임
              </label>
              <div className="mt-2">
                <div
                  className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600"
                >
                  <input
                    type="text"
                    name="nickname"
                    id="nickname"
                    autoComplete="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    className="block w-full py-1.5 pl-1.5 rounded-md border-0 shadow-sm focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="닉네임을 입력해주세요."
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            수정하기
          </button>
        </div>
      </form>

      <form onSubmit={handlePasswordChange} className="mt-8 bg-white p-4 rounded-2xl">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">비밀번호 변경</h2>

          {loading && <p>Loading...</p>}
          {passwordError && <p className="text-red-500">{passwordError}</p>}
          {passwordSuccess && <p className="text-green-500">{passwordSuccess}</p>}

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium leading-6 text-gray-900">
                현재 비밀번호
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="block w-full py-1.5 pl-1.5 rounded-md border-0 shadow-sm focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="현재 비밀번호를 입력하세요."
                />
              </div>
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-900">
                새 비밀번호
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="block w-full py-1.5 pl-1.5 rounded-md border-0 shadow-sm focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="새 비밀번호를 입력하세요."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            비밀번호 변경
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
