import React from 'react';
import {CommentsSectionProps} from '@/app/types';
import CommentBox from './CommentBox';



const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, onAddComment }) => {
  return (
    <div className="rounded-2xl mb-4">
      <CommentBox onSubmit={onAddComment} />
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white shadow p-4 rounded-2xl mb-2 flex flex-col">
            <div className="flex items-center mb-1.5">
                <a>
                    <div></div>
                </a>
                <div>

                </div>
              {comment.author.nickname} {new Date(comment.created_at).toLocaleString()}
            </div>
            <div>{comment.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
