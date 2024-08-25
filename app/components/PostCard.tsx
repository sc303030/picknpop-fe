import React from 'react';
import { PostCardProps } from "@/app/types";
import {formatRelativeDate} from "@/app/utils/formatRelativeDate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons";
const PostCard: React.FC<PostCardProps> = ({
    date,
    user,
    title,
    content,
    likes
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
                        ></div>) : (<FontAwesomeIcon icon={faCircleUser} style={{color: "#cececf",fontSize : "2.5rem", marginRight: "0.5rem"}}/> )}

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
                className="cursor-pointer transition-transform duration-200 rounded-2xl bg-white mt-2.5 flex p-4  w-[97%] ml-auto border-gray-400 border hover:bg-zinc-50 hover:shadow-lg hover:-translate-y-[2px]">
                <div>
                    <div>
                        <div className="block mb-2">
                            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                        </div>
                        <div className="text-gray-700">
                            <p>{content}</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div data-ms-content="members" className="flex items-center text-gray-500">
                        <span className="text-block">❤️</span>
                        <span className="ml-2">{likes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
