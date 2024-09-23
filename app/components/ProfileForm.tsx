'use client';

import { useState, useEffect } from 'react';
import apiCall from "@/app/utils/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    currentPassword: '', // 현재 비밀번호
    newPassword: '', // 새 비밀번호
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // 프로필 수정 에러 메시지
  const [success, setSuccess] = useState<string | null>(null); // 프로필 수정 성공 메시지
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null); // 비밀번호 수정 성공 메시지
  const [passwordError, setPasswordError] = useState<string | null>(null); // 비밀번호 수정 에러 메시지

  // State for toggling password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(`${process.env.NEXT_PUBLIC_USER_API_URL}/accounts/user/`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('프로필 데이터를 불러오는 데 실패했습니다.');
      }

      const data = await response.json();
      setFormData({
        ...formData,
        username: data.username || '',
        nickname: data.nickname || '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
        throw new Error('이미 존재하는 닉네임입니다.');
      }

      setSuccess('프로필이 성공적으로 업데이트 되었습니다!');
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
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
        throw new Error('비밀번호 변경에 실패했습니다.');
      }

      setPasswordSuccess('비밀번호가 성공적으로 변경되었습니다.');
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
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
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full py-1.5 rounded-md border-0 shadow-sm text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  disabled
                />
              </div>
            </div>

            <div>
              <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-gray-900">
                닉네임
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="nickname"
                  id="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  className="block w-full py-1.5 rounded-md border-0 shadow-sm focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="닉네임을 입력해주세요."
                  required
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
              <div className="relative mt-2">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  name="currentPassword"
                  id="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="block w-full py-1.5 rounded-md border-0 shadow-sm focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="현재 비밀번호를 입력하세요."
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                >
                  <FontAwesomeIcon icon={showCurrentPassword ? faEye : faEyeSlash} />
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-900">
                새 비밀번호
              </label>
              <div className="relative mt-2">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="block w-full py-1.5 rounded-md border-0 shadow-sm focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="새 비밀번호를 입력하세요."
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                >
                  <FontAwesomeIcon icon={showNewPassword ? faEye : faEyeSlash} />
                </button>
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
