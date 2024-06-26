import React, { useState } from 'react';

interface NewPostModalProps {
  show: boolean;
  onClose: () => void;
}

const NewPostModal: React.FC<NewPostModalProps> = ({ show, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePost = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_POST_API_URL}/posts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,  // JWT 토큰이 필요하다면 이렇게 추가하세요
      },
      body: JSON.stringify({
        title: title,
        content: content
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Post created:', data);
      onClose();  // Post 성공 후 모달 닫기
    } else {
      throw new Error('Something went wrong while posting data');
    }
  } catch (error) {
    console.error('Failed to create post:', error);
  }
};

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white p-8 rounded shadow-md w-full max-w-3xl z-10">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">X</button>
        <h2 className="text-2xl font-bold mb-4">새 포스트 작성</h2>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          rows={10}
        ></textarea>
        <button
          onClick={handlePost}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          기록하기
        </button>
      </div>
    </div>
  );
};

export default NewPostModal;
