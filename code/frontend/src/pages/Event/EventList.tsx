import React, { useEffect, useRef, useState } from "react";
import { IonContent, IonModal } from "@ionic/react";
import EventCard from "./components/EventCard";
import { getEvents } from "../../libs/api/event";
import EventFocus from "./EventFocus";
import { OverlayEventDetail } from "@ionic/core/components";

const EventList: React.FC = () => {
  const [allEvents, setAllEvents] = React.useState([]);
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (allEvents.length === 0) {
      const eventsRequest = getEvents();
      eventsRequest.then((response) => {
        setAllEvents(response.data);
      });
    }
  }, [allEvents]);

  return (
    <IonContent fullscreen>
        {allEvents?.map((event, index) => (
          <EventCard
            key={index}
            event={event}
            onButtonClick={() => {
              setSelectedEvent(event.id);
              setIsOpen(true);
            }}
          />
        ))}
      <IonModal isOpen={isOpen}>
        <EventFocus event_id={selectedEvent} previousView={setIsOpen} />
        </IonModal>
    </IonContent>
  );
};

export default EventList;
