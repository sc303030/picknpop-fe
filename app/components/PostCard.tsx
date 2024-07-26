import {PostCardProps} from "@/app/types";


const PostCard: React.FC<PostCardProps> = ({
                                               date,
                                               user,
                                               content,
                                               likes
                                           }) => {
    return (
        <div className="bg-white shadow rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-4 mb-4">
                <img
                    src={user.avatar}
                    alt={`${user.nickname}'s avatar`}
                    className="w-8 h-8 rounded-full"
                />
                <div className="text-sm text-gray-500">
                    <span>{user.nickname}</span> • <span>{date}</span>
                </div>
            </div>
            <div className="text-lg font-semibold mb-2">{content}</div>
            <div className="flex justify-between items-center">
                <button className="text-gray-500 hover:text-gray-700">
                    ❤️ {likes}
                </button>
            </div>
        </div>
    );
};

export default PostCard;
