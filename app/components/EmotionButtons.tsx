import React, { useState } from 'react';

interface Emoji {
  id: string;
  label: string;
  count: number;
  voted: boolean;
}

const emojis: Emoji[] = [
  { id: 'like', label: '👍', count: 0, voted: false },
  { id: 'funny', label: '😂', count: 0, voted: false },
  { id: 'love', label: '😍', count: 0, voted: false },
  { id: 'surprised', label: '😮', count: 0, voted: false },
  { id: 'angry', label: '😡', count: 0, voted: false },
  { id: 'sad', label: '😢', count: 2, voted: false },
];

const EmotionButtons: React.FC = () => {
  const [emojiStates, setEmojiStates] = useState(emojis);

  const handleVote = (id: string) => {
    setEmojiStates(prevState =>
      prevState.map(emoji =>
        emoji.id === id
          ? { ...emoji, voted: !emoji.voted, count: emoji.voted ? emoji.count - 1 : emoji.count + 1 }
          : emoji
      )
    );
  };

  return (
    <div className="flex space-x-2">
      {emojiStates.map((emoji) => (
        <div
          key={emoji.id}
          className={`h-7 relative inline-flex items-center justify-center pl-1 pr-1 rounded-full cursor-pointer ${emoji.voted ? 'border pr-2 border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'} ${emoji.count === 0 ? 'w-7' : ''}`}
          onClick={() => handleVote(emoji.id)}
        >
          <span className="text-sm flex items-center justify-center">{emoji.label}</span>
          {emoji.count > 0 && (
            <span className="ml-2 text-blue-600 font-semibold text-sm">{emoji.count}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default EmotionButtons;
