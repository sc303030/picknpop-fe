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
          const avatarUrl = `${process.env.NEXT_PUBLIC_USER_API_URL}/media/${comment.author.avatar}`;
          const relativeDate = formatRelativeDate(comment.created_at);

          return (
            <div key={comment.id} className="bg-white shadow p-4 rounded-2xl mb-2 flex flex-col">
              <div className="flex items-center mb-1.5">
                <a href="" className="mr-3 w-8 h-8">
                  {comment.author.avatar ? (<div
                            style={{backgroundImage: `url(${avatarUrl})`}}
                            className="w-8 h-8 rounded-full bg-center border-slate-400 border bg-contain bg-no-repeat"
                        ></div>) : (<FontAwesomeIcon icon={faCircleUser} style={{color: "#cececf",fontSize : "2rem", marginRight: "0.5rem"}}/> )}
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
