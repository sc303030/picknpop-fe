'use client';

import { useEffect, useState } from 'react';
import {useRouter, useParams, usePathname} from 'next/navigation';
import PostCard from '../../../components/PostCard';
import { Post } from '@/app/types';
import {useLayoutContext} from "@/app/contexts/LayoutContext";

export default function PostsByTeam() {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();
  const { setHiddenRows } = useLayoutContext();
  const { teamId } = useParams();
  const pathname = usePathname();

  const [page, setPage] = useState(1);
  const postsPerPage = 10;
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_POST_API_URL}/teams/${teamId}/posts/?skip=${(page - 1) * postsPerPage}&limit=${postsPerPage}`);
        const data = await response.json();
        setPosts(data.posts);
        setTotalPosts(data.total_count);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };

    if (teamId) {
      fetchPosts();
    }
  }, [teamId, page]);

  useEffect(() => {
    if (pathname.startsWith('/posts')) {
      setHiddenRows(true);
    }
  }, [pathname, setHiddenRows]);

  const handlePostClick = (postId: number) => {
    router.push(`/posts/${postId}`);
  };

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // 10개씩 끊어서 페이지네이션 표시
  const pageGroupSize = 10;
  const currentGroup = Math.ceil(page / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(currentGroup * pageGroupSize, totalPages);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handlePageClick = (pageNum: number) => {
    setPage(pageNum);
  };

  const handleNextGroup = () => {
    if (endPage < totalPages) {
      setPage(endPage + 1);
    }
  };

  const handlePrevGroup = () => {
    if (startPage > 1) {
      setPage(startPage - 1);
    }
  };

  return (
    <>
      {/* 게시물 리스트 */}
      {posts.map((post, index) => (
        <div key={`${post.id}-${index}`} onClick={() => handlePostClick(post.id)}>
          <PostCard
            date={post.created_at}
            user={post.author}
            title={post.title}
            content={post.content}
            comment_count={post.comment_count}
            emotion_count={post.emotion_count}
          />
        </div>
      ))}

      <div className="flex items-center justify-center border-t border-gray-200 px-4 py-3 sm:px-6">
        <div className="flex flex-1 items-center justify-center">
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              {/* 이전 페이지 그룹 */}
              <button
                onClick={handlePrevGroup}
                disabled={startPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous Group</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>

              {/* 페이지 번호 */}
              {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                <button
                  key={startPage + i}
                  onClick={() => handlePageClick(startPage + i)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    page === startPage + i
                      ? 'z-10 bg-orange-600 text-white'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {startPage + i}
                </button>
              ))}

              {/* 다음 페이지 그룹 */}
              <button
                onClick={handleNextGroup}
                disabled={endPage === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next Group</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
