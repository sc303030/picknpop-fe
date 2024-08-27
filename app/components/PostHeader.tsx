import React from 'react';
import { PostHeaderProps } from '@/app/types';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import EmotionButtons from "@/app/components/EmotionButtons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser, faEye, faEyeDropperEmpty, faEyeLowVision, faEyeSlash} from "@fortawesome/free-solid-svg-icons";



const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const avatarUrl = `${process.env.NEXT_PUBLIC_USER_API_URL}/media/${post.author.avatar}`;
  const formattedDate = format(parseISO(post.created_at), 'yyyy년 M월 d일 HH:mm:ss', { locale: ko });

  return (
      <>
          <div className="flex items-center my-4">
              <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between">
                      <div className="flex w-full">
                                                  {post.author.avatar ? (<div
                            style={{backgroundImage: `url(${avatarUrl})`}}
                            className="w-10 h-10 rounded-full bg-center mr-2 border-slate-400 border bg-contain bg-no-repeat"
                        ></div>) : (<FontAwesomeIcon icon={faCircleUser} style={{color: "#cececf",fontSize : "2.5rem", marginRight: "0.5rem"}}/> )}
                          <div className="flex flex-col text-sm">
                              <div className="flex items-center my-auto">
                                  <span
                                      className="text-lg font-medium text-black-500 mr-2">{post.author.nickname}</span>
                                  <span className="text-gray-500 mr-1"> · {formattedDate} · </span>
                                  <FontAwesomeIcon icon={faEye} className="text-gray-500 mr-1"/>
                                  <span className="text-gray-500">{post.views}</span>
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
