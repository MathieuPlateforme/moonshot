import React, { useEffect } from "react";
import { IonButton, IonItem, IonList, IonSelect, IonSelectOption, IonModal } from "@ionic/react";
import { APIProvider, Map, AdvancedMarker, MapCameraChangedEvent, Pin } from "@vis.gl/react-google-maps";
import { FlowerIcon } from "../../../icons/FlowerIcon";
import { CheckMarkIcon } from "../../../icons/CheckMarkIcon";
import { BackArrowIcon } from "../../../icons/BackArrowIcon";

const { GOOGLE_API_KEY } = import.meta.env;

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
  const [eventLocation, setEventLocation] = React.useState<any>(null);
  const [eventMapMarker, setEventMapMarker] = React.useState<any>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${selectedEventDate?.address}&key=AIzaSyBrrm9uoLtDWOyPg0SC7bvo7KEtZLnC-ak`)
      .then((response) => response.json())
      .then((data) => {
        setEventLocation(data.results[0].geometry.location);
        setEventMapMarker({
          key: "Event",
          location: data.results[0].geometry.location,
        });
      });
  }, [selectedEventDate]);

  return (
    <div className="rounded-lg shadow-xl overflow-hidden max-w-md p-2 m-2 pt-8 mt-4">
      <img className="rounded-2xl" src={`data:image/jpeg;base64,${event.media.file}`} alt="Event" />
      <div className="p-4">
        {event.subEvents.length == 1 ? (
          <p className="mb-1 card-date">{event.subEvents[0].start_date}</p>
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
        <h2 className="card-title mb-2 mt-0">{event.title}</h2>
      </div>
      <div className="p-4">
        <p
          className="card-adress"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          {selectedEventDate?.address}
        </p>
        <p className="font-be-vietnam text-14 font-regular text-green">{selectedEventDate?.participants} participants</p>
      </div>
      {!eventIsMine && (
        <div className="p-4 flex justify-center">
          <IonButton
            fill={subscribedToAll ? "outline" : "solid"}
            color="success"
            style={{ width: "80%" }}
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
      <IonModal isOpen={isOpen}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width:"100vw", height:"100vh" }}>
          <button onClick={() => setIsOpen(false)} style={{}}>
            <BackArrowIcon color="#75DA6D" />
          </button>
          <APIProvider apiKey="AIzaSyBrrm9uoLtDWOyPg0SC7bvo7KEtZLnC-ak">
            <Map
              style={{ width: "90vw", height: "95vh" }}
              // defaultCenter={{lat: 22.54992, lng: 0}}
              defaultCenter={eventLocation}
              defaultZoom={15}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
            >
              {/* <AdvancedMarker key={eventMapMarker?.key} position={eventMapMarker?.location}>
              <Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} />
            </AdvancedMarker> */}
            </Map>
          </APIProvider>
        </div>
      </IonModal>
    </div>
  );
};

export default SingleEventCard;
