import React from 'react';

interface EventCardProps {
  imageUrl: string;
  title: string;
  date: string;
  location: string;
  buttonText: string;
  onButtonClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ imageUrl, title, date, location, buttonText, onButtonClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 max-w-md">
      <img className="w-full" src={imageUrl} alt="Event" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 mt-0 text-black">{title}</h2>
        <p className="text-purple-600 mb-1">{date}</p>
        <div className="flex justify-between">
          <p className="text-purple-600 self-end">{location}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;