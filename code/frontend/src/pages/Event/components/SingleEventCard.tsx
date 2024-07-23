import React, { useEffect } from "react";
import { IonButton, IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import { FlowerIcon } from "../../../icons/FlowerIcon";
import { CheckMarkIcon } from "../../../icons/CheckMarkIcon";

interface SingleEventCardProps {
  event: {
    title: string;
    description: string;
    created_at: string;
    participants: string[];
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
  eventParticipants: any;
  selectedEventDate: any;
  setSelectedEventDate: any;
  subscribed: boolean;
  handleSubscribe: () => void;
  userId: string;
}

const SingleEventCard: React.FC<SingleEventCardProps> = ({
  event,
  selectedEventDate,
  setSelectedEventDate,
  eventParticipants,
  subscribed,
  handleSubscribe,
  userId,
}) => {
  useEffect(() => {
    console.log("tteteetet", selectedEventDate.start_date);
  }, [selectedEventDate]);
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 max-w-md">
      <img className="w-full" src={`data:image/jpeg;base64,${event.media.file}`} alt="Event" />
      <div className="p-4">
        {event.subEvents.length == 1 ? (
          <p className="text-purple-600 mb-1">{event.subEvents[0].start_date}</p>
        ) : (
          <IonList>
            <IonItem>
              <IonSelect
                label="Dates"
                labelPlacement="floating"
                value={selectedEventDate.start_date}
                onIonChange={(e) => {
                  setSelectedEventDate(event.subEvents[e.detail.value - 1]);              
                }}
              >
                {event.subEvents.map((eventDate: any) => (
                  <IonSelectOption key={eventDate.id} value={eventDate.id}>
                    {eventDate.start_date}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonList>
        )}
        <h2 className="text-xl font-bold mb-2 mt-0 text-black">{event.title}</h2>
      </div>
      <div className="p-4">
        <IonButton
          expand="full"
          color="primary"
          onClick={() => {
            handleSubscribe();
          }}
        >
          {!subscribed && <FlowerIcon />}
          {subscribed && <CheckMarkIcon />}
          <p>{subscribed ? "Subscribed" : "Join"}</p>
        </IonButton>
      </div>
      <div className="p-4">
        <p className="text-grey-600 self-end">{selectedEventDate.address}</p>
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
