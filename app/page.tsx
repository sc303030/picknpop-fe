'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import PostCard from './components/PostCard';
import { usePostContext } from './contexts/PostContext';
import { useLayoutContext } from './contexts/LayoutContext';

export default function Page() {
  const { posts, setPosts } = usePostContext();
  const { setHiddenRows } = useLayoutContext();
  const router = useRouter();
  const pathname = usePathname();

  const [page, setPage] = useState(1);  // 현재 페이지 번호
  const postsPerPage = 10;  // 페이지당 보여줄 게시물 수
  const [totalPosts, setTotalPosts] = useState(0);  // 전체 게시물 수

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_POST_API_URL}/posts?skip=${(page - 1) * postsPerPage}&limit=${postsPerPage}`
        );
        const data = await response.json();
        setPosts(data.posts);
        setTotalPosts(data.total_count);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };

    fetchPosts();
  }, [page, page]);

  useEffect(() => {
    if (pathname.startsWith('/posts')) {
      setHiddenRows(true);
    }
  }, [pathname, setHiddenRows]);

  const handlePostClick = (postId: number) => {
    router.push(`/posts/${postId}`);
  };

  const totalPages = Math.ceil(totalPosts / postsPerPage);  // 전체 페이지 수 계산

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
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>

              {/* 페이지 번호 */}
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageClick(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    page === i + 1
                      ? 'z-10 bg-orange-600 text-white'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
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
