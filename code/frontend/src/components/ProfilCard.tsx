import React from 'react';

interface ProfileCardProps {
  avatarUrl: string;
  name: string;
  description: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ avatarUrl, name, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200 max-w-sm">
      <div className="flex items-center">
        <img className="w-16 h-16 rounded-full mr-4" src={avatarUrl} alt="User Avatar" />
        <div>
          <h3 className="text-lg font-semibold text-black mt-0 mb-0">{name}</h3>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;