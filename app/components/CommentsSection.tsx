import React from 'react';
import {CommentsSectionProps} from '@/app/types';
import CommentBox from './CommentBox';
import {formatRelativeDate} from "@/app/utils/formatRelativeDate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons";



const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, onAddComment }) => {
  return (
    <div className="rounded-2xl mb-4">
      <CommentBox onSubmit={onAddComment} />
      <div>
        {comments.map((comment) => {
          const relativeDate = formatRelativeDate(comment.created_at);

          return (
            <div key={comment.id} className="bg-white shadow p-4 rounded-2xl mb-2 flex flex-col">
              <div className="flex items-center mb-1.5">
                <a href="" className="mr-3 w-8 h-8">
                  <svg className="w-8 h-8 text-zinc-400" viewBox="0 0 22 22" fill="currentColor"
                           aria-hidden="true">
                          <path
                              fillRule="evenodd"
                              d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                              clipRule="evenodd"
                          />
                      </svg>
                </a>
                  <div className="fiex flex-col">
                      <div className="flex items-center my-auto">
                          <span className="font-semibold mr-2">{comment.author.nickname}</span>
                          <span className="text-sm text-gray-500"> · {relativeDate}</span>
                      </div>
                  </div>
              </div>
                <div className="flex flex-col justify-start pl-10">
                    <div>{comment.message}</div>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentsSection;
