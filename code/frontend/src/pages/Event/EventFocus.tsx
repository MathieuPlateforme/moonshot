import React, { useEffect } from "react";
import { IonContent } from "@ionic/react";
import SingleEventCard from "./components/SingleEventCard";
import { getEvents } from "../../libs/api/event";
import { BackArrowIcon } from "../../icons/BackArrowIcon";

const EventFocus: React.FC<{ event_id: string; previousView: (value: string) => void }> = ({ event_id, previousView }) => {
  const [event, setEvent] = React.useState<any>(null);

  useEffect(() => {
    if (event === null) {
      const eventRequest = getEvents({ id: event_id });
      eventRequest.then((response) => {
        setEvent(response.data[0]);
      });
    }
  }, [event]);

  const handleSubscribe = () => {
    console.log("Subscribed");
  };

  useEffect(() => {
    console.log("event", event);
  }, [event]);

  return (
    <IonContent fullscreen>
      <a
        onClick={() => {
          previousView("list");
        }}
        style={{ position: "absolute", top: "10px", left: "10px" }}
      >
        <BackArrowIcon />
      </a>
      {event && <SingleEventCard event={event} handleSubscribe={handleSubscribe} />}
    </IonContent>
  );
};

export default EventFocus;
