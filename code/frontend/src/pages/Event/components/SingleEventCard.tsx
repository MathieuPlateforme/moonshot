import React from "react";
import { IonButton } from "@ionic/react";
import { FlowerIcon } from "../../../icons/FlowerIcon";
import { CheckMarkIcon } from "../../../icons/CheckMarkIcon";

interface SingleEventCardProps {
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
  handleSubscribe: () => void;
}

const SingleEventCard: React.FC<SingleEventCardProps> = ({ event, handleSubscribe }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 max-w-md">
      <img className="w-full" src={`data:image/jpeg;base64,${event.media.file}`} alt="Event" />
      <div className="p-4">
        <p className="text-purple-600 mb-1">{event.subEvents[0].start_date}</p>
        <h2 className="text-xl font-bold mb-2 mt-0 text-black">{event.title}</h2>
      </div>
      <div className="p-4">
        <IonButton expand="full" color="primary"
        onClick={() => {
            handleSubscribe();
        }}
        >  
            <FlowerIcon />
          <p>Join</p>
        </IonButton>
      </div>
      <div className="p-4">
        <p className="text-grey-600 self-end">{event.subEvents[0].address}</p>
        <p className="text-green-600">{event.total_participants} participants</p>
      </div>
      <div className="p-4 border-t-4">
        <h2 className="text-xl font-bold mb-2 mt-0 text-black">Description</h2>
        <p className="text-purple-600 self-end">{event.description}</p>
      </div>
    </div>
  );
};

export default SingleEventCard;
