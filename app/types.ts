// types.ts

export interface Post {
  id: number;
  team: string;
  date: string;
  content: string;
  likes: string;
  author: User;
}

export interface PostDetailProps {
  postId: number;
  onClose: () => void;
}


export interface Comment {
  id: number;
  author: string;
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
  onNewPost: (post: Post) => void;
}

export interface PostCardProps {
    team: string,
    date: string,
    user: string,
    content: string,
    likes: string
}

export interface User {
  username: string;
  nickname: string;
  avatar?: string | null;
}