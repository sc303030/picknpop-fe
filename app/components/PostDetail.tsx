'use client';
import { useEffect, useState } from 'react';
import apiCall from "@/app/utils/api";
import { PostDetailProps, Post, Comment } from "@/app/types";
import PostHeader from './PostHeader';
import CommentsSection from './CommentsSection';

const PostDetail: React.FC<PostDetailProps> = ({ postId, onClose }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

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

  const handleAddComment = async (comment: string) => {
    try {
      const response = await apiCall(`${process.env.NEXT_PUBLIC_POST_API_URL}/comments/posts/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post_id: postId, message: comment }),
      });
      if (response.ok) {
        const newCommentData = await response.json();
        setComments([newCommentData, ...comments]);
      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      alert("로그인이 필요합니다.");
    }
  };

  if (!post) return null;

  return (
    <>
      <PostHeader post={post} />
      <CommentsSection comments={comments} onAddComment={handleAddComment} />
    </>
  );
};

export default PostDetail;
