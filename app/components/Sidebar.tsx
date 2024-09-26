'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PopularPost } from '@/app/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown, faAnglesUp } from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC = () => {
  const [popularPosts, setPopularPosts] = useState<PopularPost[]>([]);
  const [expanded, setExpanded] = useState(false); // 슬라이드 상태 관리
  const [currentTime, setCurrentTime] = useState(''); // 현재 시간 상태 관리
  const router = useRouter();

  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_POST_API_URL}/posts/popular`);
        const data = await response.json();
        setPopularPosts(data);
      } catch (error) {
        console.error('Failed to fetch popular posts:', error);
      }
    };

    fetchPopularPosts();
  }, []);

  // 현재 시간 갱신을 위한 useEffect
  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setCurrentTime(formattedTime);
    };

    updateCurrentTime(); // 처음 마운트 될 때 시간 설정
    const intervalId = setInterval(updateCurrentTime, 60000); // 1분마다 갱신

    return () => clearInterval(intervalId); // 언마운트 시 인터벌 제거
  }, []);

  const handlePostClick = (postId: number) => {
    router.push(`/posts/${postId}`);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="mt-8 sticky top-[100px] flex flex-col">
      <div className="mb-3.5 leading-4 flex items-center">
        <div className="text-sm font-medium">🔥 실시간 인기글</div>
        <div className="text-xs text-gray-500 ml-2">{currentTime} 기준</div>
      </div>
      <div
        className={`flex flex-col overflow-hidden p-1 rounded-2xl bg-white relative transition-[max-height] ease-in-out ${
          expanded ? 'duration-500 max-h-[500px]' : 'duration-300 max-h-[80px]'
        } lg:max-h-none lg:h-auto`}
      >
        {popularPosts.slice(0, 5).map((post, index) => (
          <a
            key={post.post_id}
            onClick={() => handlePostClick(post.post_id)}
            className={`rounded-xl bg-transparent py-1.5 px-2 items-center justify-between cursor-pointer transition-all duration-100 ease-out hover:bg-gray-50 ${
              !expanded && index === 1 ? 'backdrop-blur-sm' : ''
            }`}
          >
            <div className="w-full flex flex-row">
              <div className="mr-2 text-gray-500 pt-0.5">{index + 1}</div>
              <div className="flex flex-col overflow-auto">
                <div className="text-base font-medium mr-1.5 truncate">{post.title}</div>
                <div className="text-sm text-gray-400 truncate">{post.content}</div>
              </div>
            </div>
          </a>
        ))}
        <button
          onClick={toggleExpanded}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-gray-500 w-full focus:outline-none z-10 lg:hidden"
        >
          <FontAwesomeIcon
            icon={expanded ? faAnglesUp : faAnglesDown}
            className="transition-all duration-300 animate-bounce"
          />
        </button>
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white via-white/10 to-transparent pointer-events-none backdrop-blur-sm lg:hidden"></div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
