import React, { useState, useEffect } from 'react';
import apiCall from "@/app/utils/api";
import {getCookie} from "@/app/utils/token";
import {Emoji} from "@/app/types";


const EmotionButtons: React.FC<{ postId: number }> = ({ postId }) => {
  const [emojiStates, setEmojiStates] = useState<Emoji[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 로그인 상태 확인
    const token = getCookie('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    const fetchEmojis = async () => {
      try {
        const emotionTypesResponse = await fetch(`${process.env.NEXT_PUBLIC_POST_API_URL}/emotions/types`);
        const emotionTypesData = await emotionTypesResponse.json();

        const countsResponse = await fetch(`${process.env.NEXT_PUBLIC_POST_API_URL}/emotions/posts/${postId}/counts`);
        const countsData = await countsResponse.json();

        const userStatusResponse = isAuthenticated
          ? await apiCall(`${process.env.NEXT_PUBLIC_POST_API_URL}/emotions/posts/${postId}/user_emotions`)
          : null;

        const userStatusData = userStatusResponse ? await userStatusResponse.json() : [];

        const initialEmojis: Emoji[] = emotionTypesData.map((emotion: { name: string; id: number }) => {
          const countData = countsData.find((count: { emotion_type_id: number }) => count.emotion_type_id === emotion.id);
          const userStatus = userStatusData.find((status: { emotion_type_id: number }) => status.emotion_type_id === emotion.id);

          return {
            id: emotion.id,
            label: getEmojiLabel(emotion.name),
            count: countData ? countData.count : 0,
            voted: userStatus ? userStatus.voted : false,
          };
        });

        setEmojiStates(initialEmojis);
      } catch (error) {
        console.error('Error fetching emotions:', error);
      }
    };

    fetchEmojis();
  }, [postId, isAuthenticated]);

  const handleVote = async (id: number) => {
    if (!isAuthenticated) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const token = getCookie('token');
      const response = await apiCall(`${process.env.NEXT_PUBLIC_POST_API_URL}/emotions/posts/${postId}/toggle_emotion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emotion_type_id: id }),
      });

      const data = await response.json();

      setEmojiStates(prevState =>
        prevState.map(emoji =>
          emoji.id === id
            ? {
                ...emoji,
                voted: data.action === 'added',
                count: data.action === 'added' ? emoji.count + 1 : emoji.count - 1,
              }
            : emoji
        )
      );
    } catch (error) {
      console.error('Error toggling emotion:', error);
    }
  };

  const getEmojiLabel = (name: string): string => {
    switch (name) {
      case 'like':
        return '👍';
      case 'funny':
        return '😂';
      case 'love':
        return '😍';
      case 'surprised':
        return '😮';
      case 'angry':
        return '😡';
      case 'sad':
        return '😢';
      default:
        return '❓';
    }
  };

  return (
    <div className="flex space-x-2">
      {emojiStates.map((emoji) => (
        <div
          key={emoji.id}
          className={`h-7 inline-flex items-center justify-center rounded-full cursor-pointer ${
            emoji.voted ? 'border border-blue-500 bg-blue-100 font-semibold' : 'border-gray-300 bg-gray-100'
          } ${emoji.count === 0 ? 'w-7' : 'px-2'}`}
          onClick={() => handleVote(emoji.id)}
        >
          <span className="text-sm flex items-center justify-center">{emoji.label}</span>
          {emoji.count > 0 && (
            <span className={`${emoji.voted ? 'text-blue-600' : 'text-black'} ml-2 text-sm`}>{emoji.count}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default EmotionButtons;
