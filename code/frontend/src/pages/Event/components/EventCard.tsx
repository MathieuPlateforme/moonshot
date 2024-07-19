import React from "react";

interface EventCardProps {
  event: {
    title: string;
    description: string;
    created_at: string;
    date: string;
    media: {
      id: number;
      url: string;
      file: string;
    };
    type: string;
    id: number;
    recurrent: boolean;
    subEvents: any[];
    total_participants: number;
  };
  onButtonClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onButtonClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 max-w-md mt-5" onClick={onButtonClick}>
      <img className="w-full" src={`data:image/jpeg;base64,${event.media.file}`} alt="Event" />
      <div className="p-4">
        <p className="text-purple-600 mb-1">{event.subEvents[0].start_date}</p>
        <h2 className="text-xl font-bold mb-2 mt-0 text-black">{event.title}</h2>
        <p className="text-purple-600 self-end">{event.description}</p>
        <p className="text-grey-600 self-end">{event.subEvents[0].address}</p>
        <p className="text-green-600">{event.total_participants} participants</p>
      </div>
    </div>
  );
};

export default EventCard;
