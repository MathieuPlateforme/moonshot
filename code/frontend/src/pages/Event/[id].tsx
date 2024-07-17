import React, { useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import EventCard from "../../components/EventCard";
import { getEvents } from "../../libs/api/event";
// import { useHistory, useLocation } from "react-router";
// import { ROUTES_PATH } from "../../config/constant";

const EventDetail: React.FC = () => {
  const [event, setEvent] = React.useState<any>(null);

  useEffect(() => {
    if (event === null) {
      const url = window.location.href;
      const id = url.split("/").pop();
      console.log("id", id);

      const eventRequest = getEvents({ id: id });
      eventRequest.then((response) => {
        console.log("response", response);
        
        setEvent(response.data[0]);
      });
    }
  }, [event]);

  useEffect(() => {
    console.log("event", event);
    
  }, [event]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hervé</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {event && (

        <EventCard
          // key={index}
          event={event}
          onButtonClick={() =>
            // push(ROUTES_PATH.EVENT_DETAIL.replace(':id', event.id))
            {}
          }
        />
        )}
      </IonContent>
    </IonPage>
  );
};

export default EventDetail;
