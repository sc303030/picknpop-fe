'use client';

import { useEffect, useState } from 'react';
import {useRouter, useParams, usePathname} from 'next/navigation';
import PostCard from '../../../components/PostCard';
import { Post } from '@/app/types';
import {useLayoutContext} from "@/app/contexts/LayoutContext";

export default function PostsByTeam() {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();
  const { setHiddenRows } = useLayoutContext();
  const { teamId } = useParams();
  const pathname = usePathname();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_POST_API_URL}/teams/${teamId}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };

    if (teamId) {
      fetchPosts();
    }
  }, [teamId]);

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
    </>
  );
}
