import React from 'react';
import { PostCardProps } from "@/app/types";
import {formatRelativeDate} from "@/app/utils/formatRelativeDate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faComments, faFaceSmile, faMessage} from '@fortawesome/free-regular-svg-icons';
const PostCard: React.FC<PostCardProps> = ({
    date,
    user,
    title,
    content,
    comment_count,
    emotion_count
}) => {
    const avatarUrl = `${process.env.NEXT_PUBLIC_USER_API_URL}/media/${user.avatar}`;
    const relativeDate = formatRelativeDate(date);
    return (
        <div className="mb-4 mt-8">
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between">
                    <div className="flex w-full">
                        {user.avatar ? (<div
                            style={{
                                backgroundImage: `url(${avatarUrl})`,
                            }}
                            className="w-10 h-10 rounded-full bg-center mr-2 border-slate-400 border bg-contain bg-no-repeat"
                        ></div>) : (<svg className="mr-2 w-10 h-10 text-zinc-400" viewBox="2.2 2 19.5 19.5" fill="currentColor"
                                         aria-hidden="true">
                            <path
                                fillRule="evenodd"
                                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}

                    <div className="flex flex-col text-sm">
                        <div className="flex items-center">
                            <span className="text-black-500 font-semibold mr-0.5">{user.nickname}</span>
                            <span className="text-gray-800">님이 포스트를 올렸습니다.</span>
                        </div>
                        <div className="text-xs">
                            <span className="text-gray-500">{relativeDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            className="cursor-pointer transition-transform duration-200 rounded-2xl bg-white mt-2.5 flex p-5 w-[97%] ml-auto border-gray-400 border hover:bg-zinc-50 hover:shadow-lg hover:-translate-y-[2px]">
            <div className="flex flex-row w-full">
                <div className="flex flex-col mr-7 overflow-auto">
                    <div className="block mb-1">
                        <h2 className="text-2xl font-semibold">{title}</h2>
                    </div>
                    <div className="text-gray-700 pl-0.5">
                        <p>{content}</p>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div className="gap-2.5 text-gray-600 font-medium flex flex-row items-center bg-gray-200 rounded-2xl h-14 w-16 mx-auto my-auto justify-center">
                        <div>
                            <div className="mx-auto"><FontAwesomeIcon icon={faFaceSmile}/></div>
                            <div className="text-center text-xs">{emotion_count}</div>
                        </div>
                        <div>
                            <div className="mx-auto"><FontAwesomeIcon icon={faComments}/></div>
                            <div className="text-center text-xs">{comment_count}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default PostCard;
