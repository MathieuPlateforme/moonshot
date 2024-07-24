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
  
  return (
    <div className="rounded-lg shadow-xl overflow-hidden max-w-md p-2 m-2 pt-8 mt-4">
      <img className="rounded-2xl" src={`data:image/jpeg;base64,${event.media.file}`} alt="Event" />
      <div className="p-4">
        {event.subEvents.length == 1 ? (
          <p className="mb-1 font-be-vietnam text-14 font-regular italic text-textBlueCard">{event.subEvents[0].start_date}</p>
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
        <h2 className="font-be-vietnam font-bold text-18 mb-2 mt-0 text-black">{event.title}</h2>
      </div>
      <div className="pb-2">
        <IonButton className="w-full rounded-lg"
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
        <p className="font-be-vietnam text-16 font-regular text-textBlueCard self-end">{selectedEventDate.address}</p>
        <p className="font-be-vietnam text-14 font-regular text-green">{event.total_participants} participants</p>
      </div>
      <div className="p-4 border-t-4">
        <h2 className="font-be-vietnam font-bold text-18 mb-2 mt-0 text-black">Description</h2>
        <p className="font-be-vietnam text-16 font-regular p-2 self-end">{event.description}</p>
      </div>
    </div>
  );
};

export default SingleEventCard;
