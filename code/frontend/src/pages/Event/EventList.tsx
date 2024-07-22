import React, { useEffect } from "react";
import { IonContent } from "@ionic/react";
import EventCard from "./components/EventCard";
import { getEvents } from "../../libs/api/event";
import EventFocus from "./EventFocus";

const EventList: React.FC<{ showMenu: (value: boolean) => void }> = ({ showMenu }) => {
  const [allEvents, setAllEvents] = React.useState([]);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [view, setView] = React.useState("list");

  useEffect(() => {
    if (allEvents.length === 0) {
      const eventsRequest = getEvents();
      eventsRequest.then((response) => {
        setAllEvents(response.data);
      });
    }
  }, [allEvents]);

  useEffect(() => {
    if(view === "list") showMenu(true);
  }, [view]);

  return (
    <IonContent fullscreen>
      {view === "list" && allEvents?.map((event, index) => (
        <EventCard
          key={index}
          event={event}
          onButtonClick={() => {
            setView("focus");
            setSelectedEvent(event.id);
            showMenu(false);
          }}
        />
      ))}
      {view === "focus" && selectedEvent !== null && <EventFocus event_id={selectedEvent} previousView={setView}/>}
    </IonContent>
  );
};

export default EventList;
