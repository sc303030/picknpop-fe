'use client';

import { useEffect } from 'react';
import {usePathname, useRouter} from 'next/navigation';
import PostCard from './components/PostCard';
import { usePostContext } from './contexts/PostContext';
import { useLayoutContext } from './contexts/LayoutContext';

export default function Page() {
  const { posts, setPosts } = usePostContext();
  const { setHiddenRows } = useLayoutContext();
  const router = useRouter();
  const pathname = usePathname();

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

  useEffect(() => {
    if (pathname.startsWith('/posts')) {
      setHiddenRows(true);
    }
  }, [pathname, setHiddenRows]);

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
