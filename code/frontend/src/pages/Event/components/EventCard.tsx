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
    <div className="p-4">
      <div className="rounded-lg shadow-green overflow-hidden max-w-md mt-5" onClick={onButtonClick}>
        <img className="p-2 rounded-2xl" src={`data:image/jpeg;base64,${event?.media.file}`} alt="Event" />
        <div className="p-4">
          <p className="card-date mb-1">{event?.subEvents[0]?.start_date}</p>
          <h2 className="card-title mb-2 mt-0 text-black">{event?.title}</h2>
          <p className="card-description p-2 self-end">{event?.description}</p>
          <p className="card-adress self-end">{event?.subEvents[0]?.address}</p>
          <p className="font-be-vietnam text-14 font-regular text-green">{event?.total_participants} participants</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;