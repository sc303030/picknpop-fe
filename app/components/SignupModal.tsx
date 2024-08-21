import React, { useState } from 'react';
import ModalLayout from './ModalLayout';

interface SignupModalProps {
  show: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ show, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '', nickname: '' });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrors({ username: '', password: '', nickname: '' }); // Reset errors

    const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/accounts/sign-up/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        nickname,
        terms,
      }),
    });

    if (response.ok) {
      // 성공적으로 회원가입이 완료된 경우 처리
      console.log('회원가입 성공');
      onClose();
    } else {
      // 실패한 경우 처리
      const data = await response.json();
      setErrors(data);
      console.error('회원가입 실패', data);
    }
  };

  return (
    <ModalLayout show={show} onClose={onClose}>
      <h2 className="text-2xl mb-4">픽앤팝 회원 가입하기</h2>
      <p className="mb-4">환영합니다!</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">이메일</label>
        <input
          type="email"
          id="username"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="이메일을 입력하세요"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">비밀번호</label>
        <input
          type="password"
          id="password"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mt-4">닉네임</label>
        <input
          type="text"
          id="nickname"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          required
        />
        {errors.nickname && <p className="text-red-500 text-sm">{errors.nickname}</p>}

        <label className="block mt-4">
          <input
            type="checkbox"
            id="terms"
            className="mr-2"
            checked={terms}
            onChange={e => setTerms(e.target.checked)}
            required
          /> 픽앤팝 운영 정책에 동의합니다.
        </label>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600">
          회원 가입하기
        </button>
        {/* <button type="button" className="w-full bg-red-500 text-white py-2 mt-2 rounded-md hover:bg-red-600">구글계정으로 가입하기</button> */}
      </form>
    </ModalLayout>
  );
};

export default SignupModal;
