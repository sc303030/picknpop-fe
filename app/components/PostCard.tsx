import React from 'react';
import styles from './PostCard.module.css';
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
    const avatarUrl = `${process.env.NEXT_PUBLIC_USER_API_URL}/${user.avatar}`;
    const formattedDate = format(parseISO(date), 'yyyy년 M월 d일 HH:mm:ss', { locale: ko });

    return (
        <div className="p-4 mb-4">
            <div className={styles['profile-detail-wrapper']}>
                <div
                    style={{ backgroundImage: `url(${avatarUrl})` }}
                    className="profile-image-wrapper w-8 h-8 rounded-full bg-cover bg-center"
                ></div>
                <div className="profile-name-wrapper text-sm">
                    <div className="flex items-center  text-black-500">
                        <span className="profile_name">{user.nickname}</span>
                        <strong className="bold-text ml-2">님이 포스트를 올렸습니다.</strong>
                    </div>
                    <div className="post-postion-div">
                        <span className="upload_date text-gray-500">{formattedDate}</span>
                    </div>
                </div>
            </div>
            <div className="cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg border border-gray-400 rounded-2xl bg-white mt-2.5 flex p-4 shadow">
                <div>
                    <div>
                        <div className="post-detail-link-div block mb-2">
                            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                        </div>
                        <div className="w-richtext text-gray-700">
                            <p>{content}</p>
                        </div>
                    </div>
                </div>
                <div className="reaction-group-div flex justify-between items-center mt-4">
                    <div data-ms-content="members" className="reaction-wrapper-member flex items-center text-gray-500">
                        <span className="text-block">❤️</span>
                        <span className="reaction-count ml-2">{likes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
