'use client';
import { useState, useEffect } from 'react';
import { CommentBoxProps } from "@/app/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { getCookie } from "@/app/utils/cookies"; // 쿠키에서 토큰 가져오기 위한 함수

const CommentBox: React.FC<CommentBoxProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 저장할 state

  useEffect(() => {
    const token = getCookie('token'); // 쿠키에서 token 확인
    if (token) {
      setIsLoggedIn(true); // 토큰이 있으면 로그인 상태로 설정
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl my-8">
      <div className="flex items-start h-10">
        <div className="mr-3">
          <div className="h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold">
            <FontAwesomeIcon icon={faComment} className="text-xl" />
          </div>
        </div>
        <div className="relative flex-1 h-10">
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-orange-200 pr-12 h-10"
            rows={1}
            placeholder={isLoggedIn ? "댓글을 입력하세요." : "로그인이 필요합니다."}
            value={comment}
            onChange={handleInputChange}
            disabled={!isLoggedIn}
            required
          />
          {isLoggedIn && (
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 border shadow border-gray-400 w-7 h-7 rounded-full focus:outline-none hover:ring hover:ring-orange-200"
            >
              <FontAwesomeIcon icon={faArrowUp} size="sm" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default CommentBox;
