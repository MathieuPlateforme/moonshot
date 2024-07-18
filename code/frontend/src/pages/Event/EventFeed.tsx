import React, { useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import EventCard from '../../components/EventCard';
import { getEvents } from "../../libs/api/event";
import { useHistory } from "react-router";
import { ROUTES_PATH } from "../../config/constant";

const EventFeed: React.FC = () => {

  const [allEvents, setAllEvents] = React.useState([]);
  const { push } = useHistory();

  useEffect(() => {
    if (allEvents.length === 0) {
      const eventsRequest = getEvents();
      eventsRequest.then((response) => {
        setAllEvents(response.data)});
    }
  }, [allEvents]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hervé</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {allEvents?.map((event, index) => (
          <EventCard key={index} event={event} onButtonClick={() => {
            push(ROUTES_PATH.EVENT_DETAIL.replace(':id', event.id))
          }}/>
        ))}
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Salut</IonTitle>
          </IonToolbar>
        </IonHeader> */}
      </IonContent>
    </IonPage>
  );
};

export default EventFeed;
