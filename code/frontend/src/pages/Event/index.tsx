import React, { useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from "@ionic/react";
import { useHistory } from "react-router";
import EventList from "../../components/event/EventList";
import UserEvents from "../../components/event/UserEvents";

const EventFeed: React.FC = () => {
  const [view, setView] = React.useState("list");

  // useEffect(() => {
  //   if (allEvents.length === 0) {
  //     const eventsRequest = getEvents();
  //     eventsRequest.then((response) => {
  //       setAllEvents(response.data)});
  //   }
  // }, [view]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton onClick={() => setView("list")}>List</IonButton>
          <IonButton onClick={() => setView("user_events")}>My Events</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {view === "list" && <EventList />}
        {view === "user_events" && <UserEvents />}
      </IonContent>
    </IonPage>
  );
};

export default EventFeed;
