'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PostCard from './components/PostCard';
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
      {posts.map((post, index) => (
        <div key={`${post.id}-${index}`} onClick={() => handlePostClick(post.id)}>
          <PostCard
            date={post.created_at}
            user={post.author}
            title={post.title}
            content={post.content}
            likes={post.likes}
          />
        </div>
      ))}
    </>
  );
}
