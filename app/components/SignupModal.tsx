import React, { useState } from 'react';
import ModalLayout from './ModalLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';

interface SignupModalProps {
  show: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ show, onClose }) => {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickname, setNickname] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    password1: '',
    password2: '',
    nickname: '',
    terms: '',
  });

  const [showPassword1, setShowPassword1] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrors({ username: '', password1: '', password2: '', nickname: '', terms: '' });

    if (password1 !== password2) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password2: '비밀번호가 일치하지 않습니다.',
      }));
      return;
    }

    // Check if the user has agreed to both conditions
    if (!agreeToTerms) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        terms: '필수 동의 사항에 체크해주세요.',
      }));
      return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/accounts/registration/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password1,
        password2,
        nickname,
      }),
    });

    if (response.ok) {
      onClose();
      alert("회원가입 성공!");
    } else {
      const data = await response.json();
      setErrors(data);
    }
  };

  // Handle Link Clicks and Checkbox Updates

  const handleTermsClick = () => {
    setAgreeToTerms(true);
  };

  return (
    <ModalLayout show={show} onClose={onClose}>
      <div className="relative bg-white p-8 shadow-md w-full h-full sm:rounded-2xl sm:w-96 sm:h-auto">
        <button onClick={onClose} className="text-2xl absolute top-2 right-2 text-gray-600">X</button>
        <form className="flex min-h-full flex-col justify-center px-6 lg:px-8" onSubmit={handleSubmit}>
          <div className="text-center font-schoolbell text-orange-600 text-3xl sm:mx-auto sm:w-full sm:max-w-sm">
            picknpop
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-2">
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  이메일<span className="pl-1 text-red-800">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="username"
                    value={username}
                    placeholder="email@email.com"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="password1" className="block text-sm font-medium leading-6 text-gray-900">
                  비밀번호<span className="pl-1 text-red-800">*</span>
                </label>
                <div className="mt-2">
                  <div className="relative">
                    <input
                      type={showPassword1 ? 'text' : 'password'}
                      id="password1"
                      required
                      value={password1}
                      placeholder="비밀번호"
                      onChange={(e) => setPassword1(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword1(!showPassword1)}
                      className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                    >
                      <FontAwesomeIcon icon={showPassword1 ? faEye : faEyeSlash} />
                    </button>
                  </div>
                  {errors.password1 && <p className="text-red-500 text-sm">{errors.password1}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="password2" className="block text-sm font-medium leading-6 text-gray-900">
                  비밀번호 확인<span className="pl-1 text-red-800">*</span>
                </label>
                <div className="relative mt-2">
                  <input
                    type="password"
                    id="password2"
                    required
                    value={password2}
                    placeholder="비밀번호 확인"
                    onChange={(e) => setPassword2(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                {errors.password2 && <p className="text-red-500 text-sm">{errors.password2}</p>}
              </div>

              <div>
                <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-gray-900">
                  닉네임<span className="pl-1 text-red-800">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="nickname"
                    required
                    value={nickname}
                    placeholder="닉네임 입력"
                    onChange={(e) => setNickname(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  {errors.nickname && <p className="text-red-500 text-sm">{errors.nickname}</p>}
                </div>
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="pt-3">
                <label className="inline-flex items-center relative">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="form-checkbox text-orange-600 peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-orange-600 checked:border-orange-600"
                  />
                  <span
                    className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-[10px] transform -translate-x-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20"
                         fill="currentColor"
                         stroke="currentColor" strokeWidth="1">
                      <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"></path>
                    </svg>
                  </span>
                  <span className="ml-2 text-sm font-medium text-gray-500">
                    <Link href="/terms-of-service" className="cursor-pointer underline mr-1" target="_blank" rel="noopener noreferrer" onClick={handleTermsClick}>이용약관 동의</Link>
                    <span className="text-orange-600">(필수)</span>
                  </span>
                </label>
              </div>

              {errors.terms && <p className="text-red-500 text-sm mt-2">{errors.terms}</p>}

              <div className="pt-4">
                <button type="submit"
                        className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400">
                  회원가입
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ModalLayout>
  );
};

export default SignupModal;
