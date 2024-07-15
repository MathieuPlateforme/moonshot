import React from 'react';
import { LikeIcon } from '../icons/LikeIcon';
import { CommentIcon } from '../icons/CommentIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { MoreIcon } from '../icons/MoreIcon';

interface FeedCardProps {
  username: string;
  timestamp: string;
  description: string;
  imageUrl?: string;
  avatarUrl: string;
}

const FeedCard: React.FC<FeedCardProps> = ({ username, timestamp, description, imageUrl, avatarUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
      <div className="flex items-center mb-4">
        <img className="sm:w-24 sm:h-24 w-12 h-12 rounded-full mr-4" src={avatarUrl} alt="User Avatar" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-black mt-0">{username}</h3>
          <p className="text-gray-500 text-sm">{timestamp}</p>
        </div>
        <div className="text-gray-500">
          <MoreIcon />
        </div>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      {imageUrl && (
        <img className="w-full rounded-lg mb-4" src={imageUrl} alt="Content" />
      )}
      <div className="flex justify-end text-gray-500">
        <button className="flex items-center ml-4">
          <LikeIcon />
        </button>
        <button className="flex items-center ml-4">
          <CommentIcon />
        </button>
        <button className="flex items-center ml-4">
          <ShareIcon />
        </button>
      </div>
    </div>
  );
};

export default FeedCard;