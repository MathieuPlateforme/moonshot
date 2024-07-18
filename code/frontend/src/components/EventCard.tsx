import React from 'react';

interface EventCardProps {
  event: {
    title: string;
    description: string;
    location: string;
    media: {
      id: number;
      url: string;
      file: string;
    }
    // media: Array<{
    //   id: number;
    //   url: string;
    // }>;
    type: string;
  }
  onButtonClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onButtonClick }) => {
  // const imagePath = "../../../backend/media-service/assets/event_medias/";
  const imagePath = "/var/www/html/spotty/code/backend/media-service/assets/event_medias/";
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 max-w-md">
      {/* <img className="w-full" src={imagePath + event.media.url} alt="Event" /> */}
      <img className="w-full" src={`data:image/jpeg;base64,${event.media.file}`} alt="Event" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 mt-0 text-black">{event.title}</h2>
        <p className="text-purple-600 mb-1">{event.location}</p>
        <div className="flex justify-between">
          <p className="text-purple-600 self-end">{event.description}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onButtonClick}
          >
            {/* {buttonText} */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;