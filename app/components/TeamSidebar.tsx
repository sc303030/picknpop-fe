'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Team } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretRight} from '@fortawesome/free-solid-svg-icons';

const TeamSidebar: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_POST_API_URL}/teams/`);
        const data = await response.json();
        setTeams(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch teams');
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return null;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleTeamClick = (teamId: number) => {
    router.push(`/teams/${teamId}/posts`);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-1 mt-8 bg-white rounded-2xl">
      <div
        className="flex gap-1 items-center cursor-pointer my-2 pl-2"
        onClick={toggleDropdown}
      >
        <FontAwesomeIcon
          icon={faCaretRight}
          className={`w-6 h-6 transition-all duration-100 ease-out ${isOpen ? 'rotate-90' : ''}`}
          style={{ color: '#c4c4c4' }}
        />
        <div className="text-sm font-medium pl-2">팀</div>
      </div>
      {isOpen && (
        <ul className="text-sm origin-top">
          {teams.map((team) => {
            const emblemUrl = `${process.env.NEXT_PUBLIC_USER_API_URL}/${team.emblem}`;

            return (
              <li
                key={team.id}
                className="transition-all duration-100 ease-out bg-transparent flex items-center py-1.5 px-2 rounded-xl hover:bg-gray-100 cursor-pointer"
              >
                <div className="w-8 h-8 mr-2 bg-gray-100 rounded-lg drop-shadow-md">
                  <img
                    src={emblemUrl}
                    alt={team.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <a
                  onClick={() => handleTeamClick(team.id)}
                  className="hover:text-gray-800 cursor-pointer text-xs"
                >
                  {team.name}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TeamSidebar;
