import React, { useState, useEffect } from 'react';
import { Team, NewPostModalProps } from '../types';
import apiCall from '../utils/api';
import ModalLayout from './ModalLayout';
import { usePostContext } from '../contexts/PostContext';

const NewPostModal: React.FC<NewPostModalProps> = ({ show, onClose, onNewPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const { posts, setPosts } = usePostContext();

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

  const handlePost = async () => {
    try {
      const response = await apiCall(`${process.env.NEXT_PUBLIC_POST_API_URL}/posts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          team_id: selectedTeam,
        }),
      });

      if (response.ok) {
        const newPost = await response.json();
        setPosts([newPost, ...posts]);
        onNewPost(newPost);
        setTitle('');
        setContent('');
        setSelectedTeam('');
        onClose();
      } else {
        throw new Error('Something went wrong while posting data');
      }
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <ModalLayout show={show} onClose={onClose}>
      <div className="relative bg-white shadow-md flex flex-col w-full h-full md:rounded-3xl md:h-[580px] md:w-[700px]">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 text-2xl md:right-[-2.5rem] md:top-0 md:text-white md:h-10 md:w-10 md:text-4xl">X</button>
        <div className="text-xl text-center px-7 pt-7 pb-3.5 flex flex-col">
          <strong>게시글 작성</strong>
          <span className="text-sm text-gray-500">다양한 생각을 공유해주세요!</span>
        </div>
        <div className="px-4">
          <div>
            <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 p-2 focus:outline-none"
            />
          </div>
          <div>
            <textarea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full mb-4 p-2 focus:outline-none"
            rows={5}
        ></textarea>
          </div>
        </div>
        <div className="flex flex-col px-8 pb-3.5">
          <strong className="pb-5">응원팀</strong>
          <div className="flex flex-wrap gap-4 text-sm justify-start">
              {teams.map((team) => (
                  <div key={team.id} className="min-w-28 h-fit border border-black text-center p-2 rounded-2xl cursor-pointer">
                    {team.name}
                  </div>
              ))}
          </div>
        </div>
        <div className="flex flex-row justify-end space-y-1 p-4 border-t border-gray-200">
          <button
            onClick={handlePost}
            className="bg-orange-500 text-white p-2 rounded-xl hover:bg-orange-300"
        >
          작성하기
        </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default NewPostModal;
