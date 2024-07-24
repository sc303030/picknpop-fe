import {PostCardProps} from "@/app/types";


const PostCard: React.FC<PostCardProps> = ({
                                               team,
                                               date,
                                               user,
                                               content,
                                               likes
                                           }) => {
    return (
        <div className="bg-white shadow rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-4 mb-4">
                <div
                    className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                    {team}
                </div>
                <div className="text-sm text-gray-500">
                    <span>{user}</span> • <span>{date}</span>
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
