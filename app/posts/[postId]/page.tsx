'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PostDetail from '../../components/PostDetail';
import TeamSidebar from '../../components/TeamSidebar';
import Sidebar from '../../components/Sidebar';
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
    <div className="flex w-full">
      <div className="hidden md:w-1/5 md:block">
        <TeamSidebar />
      </div>
      <div className="w-full md:w-3/5 py-4">
        <PostDetail postId={post.id} onClose={handleClosePostDetail} />
      </div>
      <div className="hidden md:w-1/5 md:block">
        <Sidebar />
      </div>
    </div>
  );
}
