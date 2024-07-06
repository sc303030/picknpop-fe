// types.ts

export interface Post {
  id: number;
  team: string;
  date: string;
  user: string;
  content: string;
  likes: string;
}

interface Comment {
  id: number;
  author: string;
  message: string;
  created_at: string;
}
