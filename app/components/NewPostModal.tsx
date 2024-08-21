import React, { useState, useEffect } from 'react';
import {Team, NewPostModalProps } from '../types';
import apiCall from '../utils/api';


const NewPostModal: React.FC<NewPostModalProps> = ({ show, onClose, onNewPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>('');

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
          team_id: selectedTeam
        }),
      });

      if (response.ok) {
        const newPost = await response.json();
        onNewPost(newPost);
        setTitle('');  // 제목 초기화
        setContent('');  // 내용 초기화
        setSelectedTeam('');  // 팀 선택 초기화
        onClose();
      } else {
        throw new Error('Something went wrong while posting data');
      }
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="h-screen fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white p-8 rounded shadow-md w-full max-w-3xl z-10">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">X</button>
        <h2 className="text-2xl font-bold mb-4">새 포스트 작성</h2>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          rows={10}
        ></textarea>
        <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
        >
          <option value="team">팀을 선택하세요</option>
          {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
          ))}
        </select>
        <button
            onClick={handlePost}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          기록하기
        </button>
      </div>
    </div>
  );
};

export default NewPostModal;
