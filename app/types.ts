// types.ts

export interface Post {
  id: number;
  team: string;
  created_at: string;
  title: string,
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
  author: User;
  message: string;
  created_at: string;
}

export interface Team {
  id: number;
  name: string;
  emblem: string;
}

export interface TeamDropdownProps {
  teams: Team[];
  handleTeamClick: (teamId: number) => void;
}
export interface NewPostModalProps {
  show: boolean;
  onClose: () => void;
  onNewPost: (post: Post) => void;
}

export interface PostCardProps {
    date: string,
    user: User,
    title: string,
    content: string,
    likes: string
}

export interface User {
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