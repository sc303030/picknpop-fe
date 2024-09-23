'use client';
import { useEffect, useState } from 'react';
import apiCall from "@/app/utils/api";
import {PostDetailProps, Post, Comment, JwtPayload} from "@/app/types";
import PostHeader from './PostHeader';
import CommentsSection from './CommentsSection';
import {getCookie} from "@/app/utils/cookies";
import {jwtDecode} from "jwt-decode";

const PostDetail: React.FC<PostDetailProps> = ({ postId, onClose }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null); // Track the logged-in user ID

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

    const fetchCurrentUser = (): string | null => {
      const token = getCookie('token');
      if (token) {
        const decodedToken: JwtPayload = jwtDecode<JwtPayload>(token);
        setCurrentUserId(Number(decodedToken.user_id));
      }
      return null;
    };

    fetchPost();
    fetchComments();
    fetchCurrentUser();
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

  const handleDeleteComment = async (commentId: number) => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await apiCall(`${process.env.NEXT_PUBLIC_POST_API_URL}/comments/${commentId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setComments(comments.filter(comment => comment.id !== commentId));
      } else {
        console.error('Failed to delete comment');
      }
    } catch (error) {
      console.error('Failed to delete comment', error);
    }
  };

  if (!post) return null;

  return (
    <>
      <PostHeader post={post} />
      <CommentsSection
        comments={comments}
        onAddComment={handleAddComment}
        onDeleteComment={handleDeleteComment}
        currentUserId={currentUserId}
      />
    </>
  );
};

export default PostDetail;
