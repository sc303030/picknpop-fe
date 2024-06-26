'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PostDetail from '../../components/PostDetail';
import TeamSidebar from '../../components/TeamSidebar';
import Sidebar from '../../components/Sidebar';

interface Post {
  id: number;
  team: string;
  date: string;
  user: string;
  content: string;
  likes: string;
}

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
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full">
      <div className="w-1/5">
        <TeamSidebar />
      </div>
      <div className="w-3/5 px-4">
        <PostDetail postId={post.id} onClose={handleClosePostDetail} />
      </div>
      <div className="w-1/5">
        <Sidebar />
      </div>
    </div>
  );
}
