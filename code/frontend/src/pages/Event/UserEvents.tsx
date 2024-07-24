import React, { useEffect } from "react";
import { IonContent, IonModal } from "@ionic/react";
import EventCard from "./components/EventCard";
import { getEvents } from "../../libs/api/event";
import { useAuth } from "../../providers/AuthProvider";
import EventFocus from "./EventFocus";

const UserEvents: React.FC<{ footerIsVisible: any; headerIsVisible: any }> = ({ footerIsVisible, headerIsVisible }) => {
  const { getId } = useAuth();
  const [userEvents, setUserEvents] = React.useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [noEvents, setNoEvents] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const [scrollDown, setScrollDown] = React.useState(0);

  const loadUserEvents = async () => {
    const eventsRequest = getEvents({ user_id: getId() });
    eventsRequest.then((response) => {
      setUserEvents(userEvents.concat(response.data));
      setOffset(offset + 10);
      setScrollDown(scrollDown + 4000);
    });
    setNoEvents(true);
  };

  const handleScroll = (e: any) => {
    if (e.scrollTop > scrollDown) {
      loadUserEvents();
    }
    if (e.currentY > e.startY) {
      footerIsVisible(false);
    }
    if (e.currentY < e.startY) {
      footerIsVisible(true);
    }
  };

  useEffect(() => {
    if (userEvents.length === 0 && !noEvents) {
      loadUserEvents();
    }
  }, [userEvents]);

  return (
    <IonContent fullscreen
      scrollEvents={true}
      onIonScroll={(e) => {
        handleScroll(e.detail);
      }}
    >
      {userEvents?.map((event, index) => (
        <EventCard
          key={index}
          event={event}
          onButtonClick={() => {
            setSelectedEvent(event.id);
            setIsOpen(true);
          }}
        />
      ))}
      {userEvents.length === 0 && <p>You have not created any event yet</p>}
      <IonModal isOpen={isOpen}>
        <EventFocus event_id={selectedEvent} previousView={setIsOpen}/>
      </IonModal>
    </IonContent>
  );
};

export default UserEvents;
