'use client'; // 클라이언트 컴포넌트로 선언

import { useState } from 'react';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    file: null as File | null,
  });

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
      <form onSubmit={handleSubmit} className="mt-8 bg-white p-4 rounded-2xl">
          <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">프로필 수정</h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                  <div className="">
                      <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                          이메일
                      </label>
                      <div className="mt-2">
                          <div
                              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600">
                              <input
                                  type="text"
                                  name="username"
                                  id="username"
                                  value={formData.username}
                                  onChange={handleChange}
                                  className="block select-none flex-1 border-0 focus:outline-none bg-transparent py-1.5 pl-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              />
                          </div>
                      </div>
                  </div>

                  <div className="">
                      <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                          닉네임
                      </label>
                      <div className="mt-2">
                          <div
                              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600">
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


                  <div className="">
                      <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                          프로필 사진
                      </label>
                      <div className="mt-2 flex gap-x-3">
                          <svg className="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor"
                               aria-hidden="true">
                              <path
                                  fillRule="evenodd"
                                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                  clipRule="evenodd"
                              />
                          </svg>
                          <div
                              className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 w-full">
                              <div className="text-center">
                                  <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24"
                                       fill="currentColor"
                                       aria-hidden="true">
                                      <path
                                          fillRule="evenodd"
                                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                          clipRule="evenodd"
                                      />
                                  </svg>
                                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                      <label
                                          htmlFor="file-upload"
                                          className="relative cursor-pointer rounded-md bg-white font-semibold text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-600 focus-within:ring-offset-2 hover:text-orange-500"
                                      >
                                          <span>Upload a file</span>
                                          <input
                                              id="file-upload"
                                              name="file"
                                              type="file"
                                              className="sr-only"
                                              onChange={handleChange}
                                          />
                                      </label>
                                      <p className="pl-1">or drag and drop</p>
                                  </div>
                                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" className="text-sm font-semibold leading-6 text-gray-900">취소하기</button>
              <button type="submit"
                      className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">저장하기
              </button>
          </div>
      </form>
  );
};

export default ProfileForm;
