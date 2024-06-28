'use client';
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  team: string;
  date: string;
  user: string;
  content: string;
  likes: string;
}

interface PostDetailProps {
  postId: number;
  onClose: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ postId, onClose }) => {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
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
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold">
          {post.team}
        </div>
        <div className="text-sm text-gray-500">
          <span>{post.user}</span> • <span>{post.date}</span>
        </div>
      </div>
      <div className="text-xl font-semibold mb-2">{post.content}</div>
      <div className="flex justify-between items-center mb-4">
        <button className="text-gray-500 hover:text-gray-700">
          ❤️ {post.likes}
        </button>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-2">What do you think?</h3>
        <div className="flex space-x-2 mb-4">
          <button className="bg-gray-200 p-2 rounded-lg">👍 Upvote</button>
          <button className="bg-gray-200 p-2 rounded-lg">😂 Funny</button>
          <button className="bg-gray-200 p-2 rounded-lg">😍 Love</button>
          <button className="bg-gray-200 p-2 rounded-lg">😮 Surprised</button>
          <button className="bg-gray-200 p-2 rounded-lg">😡 Angry</button>
          <button className="bg-gray-200 p-2 rounded-lg">😢 Sad</button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
      <button onClick={onClose} className="text-blue-500 mt-4">Back to list</button>
    </div>
  );
};

export default PostDetail;
