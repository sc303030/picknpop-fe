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
          <div className="flex items-center my-4 lg:mt-8">
              <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between">
                      <div className="flex w-full">
                                                  {post.author.avatar ? (<div
                            style={{backgroundImage: `url(${avatarUrl})`}}
                            className="w-10 h-10 rounded-full bg-center mr-2 border-slate-400 border bg-contain bg-no-repeat"
                        ></div>) : (<svg className="mr-2 w-10 h-10 text-zinc-400" viewBox="2.2 2 19.5 19.5"
                                         fill="currentColor"
                                         aria-hidden="true">
                                                      <path
                                                          fillRule="evenodd"
                                                          d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                                          clipRule="evenodd"
                                                      />
                                                  </svg>)}
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
