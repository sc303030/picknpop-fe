'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PostDetail from '../../components/PostDetail';
import {Post} from "@/app/types";

export default function PostPage({ params }: { params: { postId: string } }) {
  const router = useRouter();
  const { postId } = params;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_POST_API_URL}/posts/${postId}`);
          const data = await response.json();
          setPost(data);
        } catch (error) {
          console.error('Failed to fetch post', error);
        }
      };

      fetchPost();
    }
  }, [postId]);

  const handleClosePostDetail = () => {
    router.push('/');
  };

  if (!post) {
    return ;
  }

  return (
    <>
      <PostDetail postId={post.id} onClose={handleClosePostDetail} />
    </>
  );
}
