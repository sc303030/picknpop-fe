import React from 'react';
import { PostCardProps } from "@/app/types";
import {format, parseISO} from 'date-fns';
import { ko } from 'date-fns/locale';
const PostCard: React.FC<PostCardProps> = ({
    date,
    user,
    title,
    content,
    likes
}) => {
    const avatarUrl = `${process.env.NEXT_PUBLIC_USER_API_URL}${user.avatar}`;
    const formattedDate = format(parseISO(date), 'yyyy년 M월 d일 HH:mm:ss', { locale: ko });

    return (
        <div className="mb-4 mt-8">
            <div className="text-sm flex">
                <div
                    style={{ backgroundImage: `url(${avatarUrl})` }}
                    className="w-8 h-8 rounded-full bg-cover bg-center"
                ></div>
                <div className="text-sm font-medium">
                    <div className="flex items-center text-black-500">
                        <span>{user.nickname}</span>
                        <span>님이 포스트를 올렸습니다.</span>
                    </div>
                    <div className="text-xs">
                        <span className="upload_date text-gray-500">{formattedDate}</span>
                    </div>
                </div>
            </div>
            <div className="cursor-pointer transition-transform duration-200 rounded-[18px] bg-white mt-2.5 flex p-4 hover:bg-zinc-50 hover:shadow-lg hover:-translate-y-[2px] lg:rounded-[20px]">
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
