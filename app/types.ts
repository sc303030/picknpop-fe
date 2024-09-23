// types.ts

import React from "react";


interface PostBase {
  title: string,
  content: string;
}
export interface Post extends  PostBase{
  id: number;
  teams: { id: number }[];
  created_at: string;
  likes: string;
  author: User;
  views: number;
  comment_count: number | 0;
  emotion_count: number | 0;
}

export interface PostDetailProps {
  postId: number;
  onClose: () => void;
}


export interface Comment {
  id: number;
  author: User;
  message: string;
  created_at: string;
}

export interface Team {
  id: number;
  name: string;
  emblem: string;
}

export interface NewPostModalProps {
  show: boolean;
  onClose: () => void;
  onNewPost: (updatedPost: any) => void;
  post?: Post | null;
  isEdit: boolean;
}

export interface PostCardProps {
    date: string,
    user: User,
    title: string,
    content: string,
    comment_count: number;
    emotion_count: number;
}

export interface User {
  id: number
  nickname: string;
  avatar: string;
}

export interface PostHeaderProps {
  post: Post;
}

export interface CommentBoxProps {
  onSubmit: (comment: string) => void;
}

export interface CommentsSectionProps {
  comments: Comment[];
  onAddComment: (comment: string) => void;
  onDeleteComment: (comment: number) => void;
  currentUserId: number | null;
}

export interface ModalLayoutProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface LoginModalProps {
  show: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  openSignupModal: () => void;
}

export interface ModalContextProps {
  showSignupModal: () => void;
  showLoginModal: () => void;
  showNewPostModal: (post?: Post) => void;
  showDeletePostModal: (post?: Post) => void;
  closeModals: () => void;
}

export interface PopularPost extends  PostBase{
  post_id:number;
  recent_views: number;
}

export interface Emoji {
  id: number;
  label: string;
  count: number;
  voted: boolean;
}

export interface DeletePostModalProps {
  show: boolean;
  onClose: () => void;
  post?: Post | null;
}

export interface JwtPayload {
  user_id: string;
  exp: number;
}
