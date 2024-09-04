"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Team } from "../types";

const TeamSidebar: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_POST_API_URL}/teams/`,
        );
        const data = await response.json();
        setTeams(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch teams");
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

  return (
    <div className="mt-8 sticky top-[100px]">
      <div className="flex gap-1 items-center my-2 lg:hidden">
        <div className="text-sm font-medium">🏀 팀</div>
      </div>
      <div className="text-sm origin-top bg-white rounded-2xl lg:bg-transparent">
        <div className="flex flex-row w-full box-border p-1 overflow-x-auto lg:flex-col">
          <div className="flex flex-row box-border lg:flex-col">
            {teams.map((team) => {
              const emblemUrl = `${process.env.NEXT_PUBLIC_USER_API_URL}/${team.emblem}`;

              return (
                <div
                  key={team.id}
                  className="transition-all duration-100 ease-out bg-transparent flex items-center p-2 rounded-xl cursor-pointer mr-2 hover:bg-gray-100 lg:mr-0 lg:hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTeamClick(team.id);
                  }}
                >
                  <div
                    className="w-8 h-8 mr-0 bg-gray-100 rounded-lg drop-shadow-md lg:mr-2 bg-contain bg-no-repeat bg-center"
                    style={{
                      backgroundImage: `url(${emblemUrl})`,
                    }}
                  ></div>
                  <div className="hover:text-gray-800 cursor-pointer hidden lg:block">
                    {team.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSidebar;
