import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonModal } from "@ionic/react";
import Header from "../../components/Header";
import EventList from "./EventList";
import UserEvents from "./UserEvents";
import CommunityEvents from "./CommunityEvents";
import { CalendarIcon2 } from "../../icons/CalendarIcon2";
import { LoopIcon } from "../../icons/LoopIcon";
import { PlusIcon } from "../../icons/PlusIcon";
import NewEvent from "./newEvent";
import EventSearch from "./EventSearch";
import EventCalendar from "./EventCalendar";

const EventFeed: React.FC = () => {
  const [view, setView] = useState("list");
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [newEventIsOpen, setNewEventIsOpen] = useState(false);
  const [footerIsVisible, setFooterIsVisible] = useState(true);
  const [headerIsVisible, setHeaderIsVisible] = useState(true);

  return (
    <IonPage>
      <IonHeader>
        <div
          style={{
            display: headerIsVisible ? "flex" : "none",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <h2>Events</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <button onClick={()=>setCalendarIsOpen(true)}>
              <CalendarIcon2 />
            </button>
            <button onClick={()=>setSearchIsOpen(true)}>
              <LoopIcon />
            </button>
            <button onClick={()=>setNewEventIsOpen(true)}>
              <PlusIcon />
            </button>
          </div>
        </div>
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
        {view === "list" && <EventList footerIsVisible={setFooterIsVisible} headerIsVisible={setHeaderIsVisible}/>}
        {view === "user_events" && <UserEvents footerIsVisible={setFooterIsVisible} headerIsVisible={setHeaderIsVisible}/>}
        {view === "group_events" && <CommunityEvents />}
      </IonContent>
      <IonModal isOpen={calendarIsOpen}>
        <EventCalendar previousView={setCalendarIsOpen}/>
      </IonModal>
      <IonModal isOpen={searchIsOpen}>
        <EventSearch previousView={setSearchIsOpen}/>
      </IonModal>
      <IonModal isOpen={newEventIsOpen}>
        <NewEvent previousView={setNewEventIsOpen}/>
      </IonModal>
      <Header isVisible={footerIsVisible} />
    </IonPage>
  );
};

export default EventFeed;
