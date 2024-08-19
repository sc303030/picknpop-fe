'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PostCard from './components/PostCard';
import Sidebar from './components/Sidebar';
import TeamSidebar from './components/TeamSidebar';
import { usePostContext } from './contexts/PostContext';

export default function Page() {
  const { posts, setPosts } = usePostContext();
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_POST_API_URL}/posts/`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };

    fetchPosts();
  }, [setPosts]);

  const handlePostClick = (postId: number) => {
    router.push(`/posts/${postId}`);
  };

  return (
    <>
      <div className="hidden lg:block lg:w-[190px] 1160:w-[224px] relative">
        <TeamSidebar />
      </div>
      <div className="min-w-[660px] py-4 relative">
        {posts.map((post, index) => (
          <div
            key={`${post.id}-${index}`}
            onClick={() => handlePostClick(post.id)}
          >
            <PostCard
              date={post.created_at}
              user={post.author}
              title={post.title}
              content={post.content}
              likes={post.likes}
            />
          </div>
        ))}
      </div>
      <div className="hidden lg:min-w-[250px] lg:block">
        <Sidebar />
      </div>
    </>
  );
}
