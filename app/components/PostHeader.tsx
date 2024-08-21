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
          <div className="flex items-center my-4">
              <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between">
                      <div className="flex w-full">
                          <div
                              style={{backgroundImage: `url(${avatarUrl})`}}
                              className="w-10 h-10 rounded-full bg-cover bg-center mr-3"
                          ></div>
                          <div className="flex flex-col text-sm">
                              <div className="flex items-center my-auto">
                                  <span className="text-lg font-medium text-black-500 mr-2">{post.author.nickname}</span>
                                  <span className="text-gray-500"> · {formattedDate}</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="bg-white shadow rounded-2xl p-4 mb-4">
              <div className="text-xl font-semibold mb-2">{post.title}</div>
              <div className="flex justify-between items-center mb-4">
                  {post.content}
              </div>
              <EmotionButtons postId={post.id}/>
          </div>
      </>
  );
};

export default PostHeader;
