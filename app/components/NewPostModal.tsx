import React, { useState, useEffect } from 'react';
import { Team, NewPostModalProps, Post } from '../types';
import apiCall from '../utils/api';
import ModalLayout from './ModalLayout';
import { usePostContext } from '../contexts/PostContext';

const NewPostModal: React.FC<NewPostModalProps & { post?: Post | null; isEdit?: boolean }> = ({
  show,
  onClose,
  onNewPost,
  post,
  isEdit = false,
}) => {
  // 게시글 수정 시 기존 내용 초기화
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const { posts, setPosts } = usePostContext();
  const [error, setError] = useState<string | null>(null);

  // 모달이 열릴 때 post 데이터로 제목과 내용을 초기화
  useEffect(() => {
    if (isEdit && post) {
      setTitle(post.title);
      setContent(post.content);
      const selectedTeamIds = post.teams.map((team) => team.id);
      setSelectedTeams(selectedTeamIds);
    }
  }, [post, isEdit]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_POST_API_URL}/teams/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTeams(data);
        } else {
          throw new Error('Failed to fetch teams');
        }
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const handleCheckboxChange = (teamId: number) => {
    setSelectedTeams((prevSelectedTeams) =>
      prevSelectedTeams.includes(teamId)
        ? prevSelectedTeams.filter((id) => id !== teamId)
        : [...prevSelectedTeams, teamId]
    );
  };

  const handlePost = async () => {
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 모두 입력하세요.');
      return;
    }

    setError(null);

    try {
      const apiUrl = isEdit
        ? `${process.env.NEXT_PUBLIC_POST_API_URL}/posts/${post?.id}/`
        : `${process.env.NEXT_PUBLIC_POST_API_URL}/posts/`;

      const method = isEdit ? 'PUT' : 'POST';

      const response = await apiCall(apiUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          team_ids: selectedTeams,
        }),
      });

      if (response.ok) {
        const updatedPost = await response.json();

        if (isEdit) {
          const updatedPosts = posts.map((p) => (p.id === post?.id ? updatedPost : p));
          setPosts(updatedPosts);
        } else {
          setPosts([updatedPost, ...posts]);
        }

        onNewPost(updatedPost);
        setTitle('');
        setContent('');
        setSelectedTeams([]);
        onClose();
        if (isEdit){
          window.location.reload();
        }
      } else {
        throw new Error('게시글을 저장하는 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('게시글 저장 실패:', error);
    }
  };

  return (
    <ModalLayout show={show} onClose={onClose}>
      <div className="relative bg-white shadow-md flex flex-col w-full h-full md:rounded-3xl md:h-auto md:w-[700px]">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 text-2xl hidden md:right-[-2.5rem] md:top-0 md:text-white md:h-10 md:w-10 md:text-4xl md:block">X</button>
        <div className="text-xl text-center px-7 pt-7 pb-3.5 flex flex-col">
          <strong>{isEdit ? '게시글 수정' : '게시글 작성'}</strong>
          <span className="text-sm text-gray-500">다양한 생각을 공유해주세요!</span>
        </div>
        <div className="px-4">
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 p-2 focus:outline-none text-2xl"
          />
          <textarea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full mb-4 p-2 focus:outline-none"
            rows={5}
          ></textarea>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="flex flex-col px-8 pb-3.5">
          <strong className="pb-5">응원팀</strong>
          <div className="flex flex-wrap gap-4 text-sm justify-start">
            {teams.map((team) => (
              <div
                key={team.id}
                className={`min-w-28 h-fit border border-black text-center p-2 rounded-2xl cursor-pointer ${
                  selectedTeams.includes(team.id) ? 'bg-orange-500 text-white' : ''
                }`}
                onClick={() => handleCheckboxChange(team.id)}
              >
                <input
                  type="checkbox"
                  value={team.id}
                  checked={selectedTeams.includes(team.id)}
                  onChange={() => handleCheckboxChange(team.id)}
                  className="hidden"
                />
                {team.name}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-end p-4 border-t border-gray-200">
          <button onClick={onClose} className="bg-white text-orange-500 mr-2 p-2 rounded-xl border border-orange-500 hover:bg-white md:hidden">
            뒤로가기
          </button>
          <button onClick={handlePost} className="bg-orange-500 text-white p-2 rounded-xl hover:bg-orange-300">
            {isEdit ? '수정하기' : '작성하기'}
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default NewPostModal;
