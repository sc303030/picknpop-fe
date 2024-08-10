import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Team } from '../types';

const TeamSidebar: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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
    return <div></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleTeamClick = (teamId: number) => {
    router.push(`/teams/${teamId}/posts`);
  };
  return (
    <div className="p-1 mt-8 bg-white rounded-lg">
      <h2 className="text-sm font-semibold mb-4">팀</h2>
      <ul className="text-sm">
        {teams.map((team) => {
          const emblemUrl = `${process.env.NEXT_PUBLIC_USER_API_URL}/${team.emblem}`;

          return (
              <li key={team.id} className="flex items-center space-x-2">
                <div className="w-8 h-8">
                  <img src={emblemUrl} alt={team.name} className="w-full h-full object-contain"/>
                </div>
                <a
                    onClick={() => handleTeamClick(team.id)}
                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  {team.name}
                </a>
              </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TeamSidebar;
