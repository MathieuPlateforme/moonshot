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
  subscribedToAll: boolean;
  eventIsMine: boolean;
  handleSubscribe: (target: string) => void;
  handleDelete: () => void;
}

const SingleEventCard: React.FC<SingleEventCardProps> = ({
  event,
  selectedEventDate,
  setSelectedEventDate,
  eventParticipants,
  subscribedToAll,
  handleSubscribe,
  handleDelete,
  eventIsMine,
}) => {
  return (
    <div className="rounded-lg shadow-xl overflow-hidden max-w-md p-2 m-2 pt-8 mt-4">
      <img className="rounded-2xl" src={`data:image/jpeg;base64,${event.media.file}`} alt="Event" />
      <div className="p-4">
        {event.subEvents.length == 1 ? (
          <p className="mb-1 font-be-vietnam text-14 font-regular italic text-textBlueCard">{event.subEvents[0].start_date}</p>
        ) : (
          <IonList style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <IonItem style={{ width: "50%" }}>
              <IonSelect
                label="Dates"
                labelPlacement="floating"
                value={selectedEventDate?.id}
                onIonChange={(e) => {
                  setSelectedEventDate(event.subEvents.find((eventDate: any) => eventDate.id === e.detail.value));
                }}
              >
                {event.subEvents.map((eventDate: any) => (
                  <IonSelectOption key={eventDate?.id} value={eventDate?.id}>
                    {eventDate?.start_date}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonButton
              fill={selectedEventDate?.is_subscribed ? "outline" : "solid"}
              color="success"
              style={{ width: "40%" }}
              // size="default"
              onClick={() => {
                handleSubscribe("single");
              }}
            >
              {!selectedEventDate?.is_subscribed && <FlowerIcon />}
              {selectedEventDate?.is_subscribed && <CheckMarkIcon />}
              {selectedEventDate?.is_subscribed ? "Subscribed" : "Join"}
            </IonButton>
          </IonList>
        )}
        <h2 className="font-be-vietnam font-bold text-18 mb-2 mt-0 text-black">{event.title}</h2>
      </div>
      <div className="p-4">
        <p className="text-grey-600 self-end">{selectedEventDate?.address}</p>
        <p className="text-green-600">{selectedEventDate?.participants} participants</p>
      </div>
      {!eventIsMine && (
        <div className="p-4">
          <IonButton
            fill={subscribedToAll ? "outline" : "solid"}
            color="success"
            // expand="full"
            onClick={() => {
              handleSubscribe("all");
            }}
          >
            {!subscribedToAll && <FlowerIcon />}
            {subscribedToAll && <CheckMarkIcon />}
            {subscribedToAll && event.subEvents.length === 1 && "Subscribed"}
            {!subscribedToAll && event.subEvents.length === 1 && "Join"}
            {!subscribedToAll && event.subEvents.length > 1 && "Join all dates"}
            {subscribedToAll && event.subEvents.length > 1 && "Subscribed to all dates"}
          </IonButton>
        </div>
      )}
      <div className="p-4 border-t-4">
        <h2 className="text-xl font-bold mb-2 mt-0 text-black">Description</h2>
        <p className="text-purple-600 self-end">{event?.description}</p>
      </div>
      {eventIsMine && (
        <div className="p-4 border-t-4">
          <IonButton
            expand="full"
            color="danger"
            onClick={() => {
              handleDelete();
            }}
          >
            Delete
          </IonButton>
        </div>
      )}
    </div>
  );
};

export default SingleEventCard;
