import React, { useEffect, useState } from 'react';
import { Team } from '../types';

const TeamSidebar: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">팀</h2>
      <ul className="space-y-2">
        {teams.map((team,index) => (
            <li key={team.id} className="flex items-center space-x-2">
              <img src={team.emblem} alt={team.name} style={{width: '30px', height: '30px'}}/>
              <a href="#" className="text-gray-600 hover:text-gray-800">{team.name}</a>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamSidebar;
