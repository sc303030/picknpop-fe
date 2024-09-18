'use client';
import { useState } from 'react';
import {CommentBoxProps} from "@/app/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {faComment} from "@fortawesome/free-regular-svg-icons";


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
    <form onSubmit={handleSubmit} className="rounded-2xl my-8">
      <div className="flex items-start h-10">
        <div className="mr-3">
          <div className="h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold">
            <FontAwesomeIcon icon={faComment} className="text-xl"/>
          </div>
        </div>
        <div className="relative flex-1 h-10">
          <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-orange-200 pr-12 h-10"
              rows={1}
              placeholder="댓글을 입력하세요."
              value={comment}
              onChange={handleInputChange}
          />
          <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 border shadow border-gray-400 w-7 h-7 rounded-full focus:outline-none hover:ring hover:ring-orange-200"
          >
            <FontAwesomeIcon icon={faArrowUp} size="sm"/>
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentBox;
