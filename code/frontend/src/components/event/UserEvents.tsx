import React, { useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import EventCard from '../../components/EventCard';
import { getEvents } from "../../libs/api/event";
import { useHistory } from "react-router";
import { ROUTES_PATH } from "../../config/constant";

const UserEvents: React.FC = () => {

  const [userEvents, setUserEvents] = React.useState([]);
  const { push } = useHistory();

  useEffect(() => {
    if (userEvents.length === 0) {
      const eventsRequest = getEvents({ user_id: 10 });
      eventsRequest.then((response) => {
        setUserEvents(response.data)});
    }
  }, [userEvents]);

  return (
      <IonContent fullscreen>
        {userEvents?.map((event, index) => (
          <EventCard key={index} event={event} onButtonClick={() => {
            push(ROUTES_PATH.EVENT_DETAIL.replace(':id', event.id))
          }}/>
        ))}
      </IonContent>
  );
};

export default UserEvents;
