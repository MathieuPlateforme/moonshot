import React, { useEffect } from "react";
import { IonContent } from '@ionic/react';
import EventCard from './components/EventCard';
import { getEvents } from "../../libs/api/event";
import { useHistory } from "react-router";
import { useAuth } from "../../providers/AuthProvider";
import { get } from "../../libs/utils";

const UserEvents: React.FC = () => {
  const { getId } = useAuth();
  const [userEvents, setUserEvents] = React.useState([]);
  const [noEvents, setNoEvents] = React.useState(false);
  const { push } = useHistory();

  useEffect(() => {
    if (userEvents.length === 0 && !noEvents) {
      const eventsRequest = getEvents({ user_id: getId() });
      eventsRequest.then((response) => {
        setUserEvents(response.data)});
        setNoEvents(true);
    }
  }, [userEvents]);

  return (
      <IonContent fullscreen>
        {userEvents?.map((event, index) => (
          <EventCard key={index} event={event} onButtonClick={() => {
            // push(ROUTES_PATH.EVENT_DETAIL.replace(':id', event.id))
          }}/>
        ))}
      </IonContent>
  );
};

export default UserEvents;
