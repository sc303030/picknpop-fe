'use client';
import { useState } from 'react';
import {CommentBoxProps} from "@/app/types";



const CommentBox: React.FC<CommentBoxProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

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
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded-2xl mb-4">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            F
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            rows={3}
            placeholder="댓글을 입력하세요."
            value={comment}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex-shrink-0">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200">
            등록
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentBox;
