'use client';

import { useState, useEffect } from 'react';
import apiCall from "@/app/utils/api";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    file: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // 성공 메시지

  // Function to fetch profile data
  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(`${process.env.NEXT_PUBLIC_USER_API_URL}/accounts/profile/`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const data = await response.json();
      setFormData({
        username: data[0].username || '',
        nickname: data[0].nickname || '',
        file: null,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.files ? target.files[0] : null,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formDataToSend = new FormData();
    formDataToSend.append('nickname', formData.nickname);
    if (formData.file) {
      formDataToSend.append('avatar', formData.file);
    }

    try {
      const response = await apiCall(`${process.env.NEXT_PUBLIC_USER_API_URL}/accounts/profile/modify/`, {
        method: 'PATCH',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
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
                  className="block select-none flex-1 border-0 focus:outline-none bg-transparent py-1.5 pl-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                  className="block flex-1 border-0 bg-transparent focus:outline-none py-1.5 pl-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="닉네임을 입력해주세요."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">취소하기</button>
        <button
          type="submit"
          className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          저장하기
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
