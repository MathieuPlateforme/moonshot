import React, { useEffect, useRef, useState } from "react";
import { IonContent, IonModal, IonButton } from "@ionic/react";
import EventCard from "./components/EventCard";
import { getEvents } from "../../libs/api/event";
import EventFocus from "./EventFocus";

const EventList: React.FC = () => {
  const [allEvents, setAllEvents] = React.useState([]);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [offset, setOffset] = React.useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollDown, setScrollDown] = useState(0);

  const loadEvents = async () => {
    await getEvents({
      limit: 10,
      offset: offset,
    }).then((response) => {
      setAllEvents(allEvents.concat(response.data));
      setOffset(offset + 10);
      setScrollDown(scrollDown + 4000);
    });
  };

  useEffect(() => {
    if (allEvents.length === 0) loadEvents();
  }, [allEvents]);

  return (
    <IonContent style={{
      height: "90%",
    }}
    scrollEvents={true}
    onIonScroll={(e) => {     
      // console.log(e);
      console.log(e.detail.currentY);
      console.log(e.detail.scrollTop);
      // // console.log("typeofscroll", typeof(e.detail.scrollTop));     
      if(e.detail.scrollTop > scrollDown) {
        console.log("scrolling down");       
        loadEvents();
      }
      // if(e.detail.currentY > scrollDown) {
      //   console.log("scrolling down");       
      //   loadEvents();
      // }


      // if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) { 
      //   console.log("doc", document.body.offsetHeight);
      //   console.log("total", window.innerHeight + window.scrollY);
      //   console.log("scrll", window.scrollY);
      //   console.log("scrolling down");       
      // }
    }}
    >
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
      <IonButton onClick={loadEvents}>Load More</IonButton>
    </IonContent>
  );
};

export default EventList;
