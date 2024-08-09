import React from 'react';
import { PostHeaderProps } from '@/app/types';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import EmotionButtons from "@/app/components/EmotionButtons";



const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const avatarUrl = `${process.env.NEXT_PUBLIC_USER_API_URL}${post.author.avatar}`;
  const formattedDate = format(parseISO(post.created_at), 'yyyy년 M월 d일 HH:mm:ss', { locale: ko });

  return (
      <>
          <div className="flex items-center space-x-4 mb-4">
              <img src={avatarUrl} alt={`${post.author.nickname}'s avatar`} className="w-8 h-8 rounded-full"/>
              <div className="text-sm text-gray-500">
                  <span>{post.author.nickname} {formattedDate}</span>
              </div>
          </div>
          <div className="bg-white shadow rounded-2xl p-4 mb-4">
              <div className="text-xl font-semibold mb-2">{post.title}</div>
              <div className="flex justify-between items-center mb-4">
                  {post.content}
              </div>
              <EmotionButtons />
          </div>
      </>
  );
};

export default PostHeader;
