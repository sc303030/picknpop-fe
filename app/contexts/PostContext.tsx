'use client';
import React, { createContext, useState, ReactNode, useContext, useCallback } from 'react';
import { Post } from '../types';

interface PostContextType {
  posts: Post[];
  addPost: (post: Post) => void;
  setPosts: (posts: Post[]) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPostsState] = useState<Post[]>([]);

  const addPost = useCallback((post: Post) => {
    setPostsState((prevPosts) => [post, ...prevPosts]);
  }, []);

  const setPosts = useCallback((posts: Post[]) => {
    setPostsState(posts);
  }, []);

  return (
    <PostContext.Provider value={{ posts, addPost, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};
