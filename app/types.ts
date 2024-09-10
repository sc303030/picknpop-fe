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
    likes: string
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
}

export interface ModalContextProps {
  showSignupModal: () => void;
  showLoginModal: () => void;
  showNewPostModal: (post: Post) => void;
  showDeletePostModal: (post: Post) => void;
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
  post?: Post;
}
