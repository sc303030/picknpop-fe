'use client';
import { useEffect, useState } from 'react';
import apiCall from "@/app/utils/api";
import {PostDetailProps, Post, Comment} from "@/app/types";


const PostDetail: React.FC<PostDetailProps> = ({ postId, onClose }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');

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

    const fetchComments = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_POST_API_URL}/comments/posts/${postId}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setComments(data);
        } else {
          console.error('Comments API did not return an array');
        }
      } catch (error) {
        console.error('Failed to fetch comments', error);
      }
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    try {
      const response = await apiCall(`${process.env.NEXT_PUBLIC_POST_API_URL}/comments/posts/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newComment }),
      });
      if (response.ok) {
        const newCommentData = await response.json();
        setComments([newCommentData, ...comments]);
        setNewComment('');
      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Failed to post comment', error);
    }
  };

  if (!post) return <div>Loading...</div>;
  const avatarUrl = `${process.env.NEXT_PUBLIC_USER_API_URL}/${post.author.avatar}`;
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-4 mb-4">
        <img
            src={avatarUrl}
            alt={`${post.author.nickname}'s avatar`}
            className="w-8 h-8 rounded-full"
        />
        <div className="text-sm text-gray-500">
          <span>{post.author.nickname}</span> • <span>{post.date}</span>
        </div>
      </div>
      <div className="text-xl font-semibold mb-2">{post.content}</div>
      <div className="flex justify-between items-center mb-4">
        <button className="text-gray-500 hover:text-gray-700">
          ❤️ {post.likes}
        </button>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-bold mb-2">What do you think?</h3>
        <div className="flex space-x-2 mb-4">
          <button className="bg-gray-200 p-2 rounded-lg">👍 Upvote</button>
          <button className="bg-gray-200 p-2 rounded-lg">😂 Funny</button>
          <button className="bg-gray-200 p-2 rounded-lg">😍 Love</button>
          <button className="bg-gray-200 p-2 rounded-lg">😮 Surprised</button>
          <button className="bg-gray-200 p-2 rounded-lg">😡 Angry</button>
          <button className="bg-gray-200 p-2 rounded-lg">😢 Sad</button>
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment} className="bg-blue-500 text-white p-2 rounded-lg ml-2">
            Submit
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Comments</h3>
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded-lg mb-2">
            <div className="text-sm text-gray-500 mb-1">{comment.author} • {new Date(comment.created_at).toLocaleString()}</div>
            <div>{comment.message}</div>
          </div>
        ))}
      </div>
      <button onClick={onClose} className="text-blue-500 mt-4">Back to list</button>
    </div>
  );
};

export default PostDetail;
