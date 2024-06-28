'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Post {
  team: string;
  date: string;
  user: string;
  content: string;
  likes: string;
}

export default function PostDetail() {
  const { postId } = useParams();
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

  if (!post) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold">{post.team}</h1>
      <p className="text-gray-500">{post.date}</p>
      <p className="text-gray-700">{post.user}</p>
      <p className="text-lg my-4">{post.content}</p>
      <p className="text-red-500">❤️ {post.likes}</p>
    </div>
  );
}
