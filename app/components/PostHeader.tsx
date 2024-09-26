import React, { useState } from 'react';
import {JwtPayload, PostHeaderProps} from '@/app/types';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import EmotionButtons from "@/app/components/EmotionButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { getCookie } from "@/app/utils/cookies";
import { jwtDecode } from 'jwt-decode';
import { useModalContext } from '@/app/components/ModalProvider';


const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const { showNewPostModal, showDeletePostModal } = useModalContext();
  const formattedDate = format(parseISO(post.created_at), 'yyyy년 M월 d일 HH:mm', { locale: ko });

  const getLoggedInUserId = (): string | null => {
    const token = getCookie('token');
    if (token) {
      const decodedToken: JwtPayload = jwtDecode<JwtPayload>(token);
      return decodedToken.user_id;
    }
    return null;
  };

  const loggedInUserId = getLoggedInUserId();
  const isAuthor = loggedInUserId !== null && post.author.id === parseInt(loggedInUserId, 10);

  return (
    <>
      <div className="flex items-center my-4 lg:mt-8">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <div className="flex w-full">
              <svg
                  className="mr-2 w-10 h-10 text-zinc-400"
                  viewBox="2.2 2 19.5 19.5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              <div className="flex flex-col text-sm">
                <div className="flex my-auto">
                  <span className="font-medium text-black-500 mr-2">
                    {post.author.nickname}
                  </span>
                  <span className="text-gray-500 mr-1"> · {formattedDate} · </span>
                  <div className="flex flex-row items-center">
                    <FontAwesomeIcon icon={faEye} className="text-gray-500 mr-1" />
                    <span className="text-gray-500">{post.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-2xl p-4 mb-4">
        <div className="flex flex-row justify-between w-full">
          <div className="text-xl font-semibold mb-2 w-[60%] overflow-auto whitespace-normal break-words">{post.title}</div>
          {isAuthor && (
            <div className="flex flex-row mb-2">
              <button
                className="text-sm bg-blue-100 text-blue-700 my-auto rounded-xl px-2.5 py-1 mr-2 hover:text-black hover:bg-blue-200"
                onClick={() => showNewPostModal(post)}
              >
                수정
              </button>
              <button
                className="text-sm bg-red-100 text-red-700 my-auto rounded-xl px-2.5 py-1 hover:text-black hover:bg-red-200"
                onClick={() => showDeletePostModal(post)}
              >
                삭제
              </button>
            </div>
          )}
        </div>

        <div className="justify-between items-center mb-4 overflow-auto whitespace-normal break-words">
          {post.content}
        </div>
        <EmotionButtons postId={post.id} />
      </div>
    </>
  );
};

export default PostHeader;
