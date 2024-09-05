'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PopularPost } from '@/app/types';

const Sidebar: React.FC = () => {
  const [popularPosts, setPopularPosts] = useState<PopularPost[]>([]);
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

  const handlePostClick = (postId: number) => {
    router.push(`/posts/${postId}`);
  };

  return (
    <div className="mt-8 sticky top-[100px] flex flex-col">
      <div className="mb-3.5 leading-4 flex justify-between items-center">
        <div className="text-sm font-medium">🔥 실시간 인기글</div>
      </div>
      <div className="flex flex-col overflow-hidden p-1 rounded-2xl h-auto bg-white">
        {popularPosts.map((post, index) => (
          <a
            key={post.post_id}
            onClick={() => handlePostClick(post.post_id)}
            className="rounded-xl bg-transparent py-1.5 px-2 items-center justify-between cursor-pointer transition-all duration-100 ease-out hover:bg-gray-50"
          >
            <div className="w-full flex flex-row">
              <div className="mr-2 text-gray-500 pt-0.5">{index + 1}</div>
              <div className="flex flex-col">
                <div className="text-base font-medium mr-1.5 truncate">{post.title}</div>
                <div className="text-sm text-gray-400 truncate">{post.content}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
