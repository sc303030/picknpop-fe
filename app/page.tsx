'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PostCard from './components/PostCard';
import Sidebar from './components/Sidebar';
import TeamSidebar from './components/TeamSidebar';

interface Post {
  id: number;
  team: string;
  date: string;
  user: string;
  content: string;
  likes: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_POST_API_URL}/posts/`); // API 엔드포인트에 맞게 수정
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (postId: number) => {
    router.push(`/posts/${postId}`);
  };

  return (
    <div className="flex w-full">
      <div className="w-1/5">
        <TeamSidebar />
      </div>
      <div className="w-3/5 px-4">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            className="cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg"
          >
            <PostCard
              team={post.team}
              date={post.date}
              user={post.user}
              content={post.content}
              likes={post.likes}
            />
          </div>
        ))}
      </div>
      <div className="w-1/5">
        <Sidebar />
      </div>
    </div>
  );
}
