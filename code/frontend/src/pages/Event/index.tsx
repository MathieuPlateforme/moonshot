import React, { useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from "@ionic/react";
import { useHistory } from "react-router";
import EventList from "./EventList";
import UserEvents from "./UserEvents";
import CommunityEvents from "./CommunityEvents";

const EventFeed: React.FC = () => {
  const [view, setView] = React.useState("list");

  return (
    <IonPage>
      <IonHeader>
          <IonToolbar>
            <IonButton fill={view === "list" ? "outline" : "clear"} onClick={() => setView("list")}>
              For me
            </IonButton>
            <IonButton fill={view === "user_events" ? "outline" : "clear"} onClick={() => setView("user_events")}>
              My Events
            </IonButton>
            <IonButton fill={view === "group_events" ? "outline" : "clear"} onClick={() => setView("group_events")}>
              My community
            </IonButton>
          </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {view === "list" && <EventList />}
        {view === "user_events" && <UserEvents />}
        {view === "group_events" && <CommunityEvents />}
      </IonContent>
    </IonPage>
  );
};

export default EventFeed;
