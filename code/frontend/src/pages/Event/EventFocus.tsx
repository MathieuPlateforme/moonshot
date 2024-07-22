import React, { useEffect } from "react";
import { IonContent } from "@ionic/react";
import SingleEventCard from "./components/SingleEventCard";
import { getEvents } from "../../libs/api/event";
import { BackArrowIcon } from "../../icons/BackArrowIcon";
import { postEventParticipant, delEventParticipant } from "../../libs/api/event";
import { useAuth } from "../../providers/AuthProvider";

const EventFocus: React.FC<{ event_id: string; previousView: any }> = ({ event_id, previousView }) => {
  const [event, setEvent] = React.useState<any>(null);
  const [selectedEventDate, setSelectedEventDate] = React.useState<any>(null);
  const [eventParticipants, setEventParticipants] = React.useState<any>(null);
  const { getId } = useAuth();
  const userId = getId();
  const [subscribed, setSubscribed] = React.useState(false);
  const [subscribedId, setSubscribedId] = React.useState("");

  const loadEvent = async () => {
    const eventRequest = getEvents({ id: event_id, participants: "" });
    eventRequest.then((response) => {
      setEvent(response.data[0]);
      setEventParticipants(response.data["participants"]);
      setSelectedEventDate(response.data[0].subEvents[0]);      
    });
  };

  const handleSubscribe = () => {
    if (!subscribed) {
      const eventParticipant = {
        event_date_id: event.subEvents[0].id,
      };
      postEventParticipant(eventParticipant).then((response) => {
        if (response.status === 201) {
          loadEvent();
        }
      });
    } else {
      delEventParticipant(subscribedId).then((response) => {
        if (response.status === 200) {
          setSubscribed(false);
          loadEvent();
        }
      });
    }
  };

  useEffect(() => {
    if (event_id == null) return;
    loadEvent();
  }, [event_id]);

  useEffect(() => {
    if (eventParticipants === null) return;
    for (const participation of eventParticipants) {
      if (participation.user_id == userId) {
        setSubscribed(true);
        setSubscribedId(participation.id);
        return;
      }
    }
  }, [eventParticipants]);

  return (
    <IonContent fullscreen>
      <a
        onClick={() => {
          previousView(false);
        }}
        style={{ position: "absolute", top: "10px", left: "10px" }}
      >
        <BackArrowIcon />
      </a>
      {event && (
        <SingleEventCard
          event={event}
          selectedEventDate={selectedEventDate}
          setSelectedEventDate={setSelectedEventDate}
          eventParticipants={eventParticipants}
          subscribed={subscribed}
          handleSubscribe={handleSubscribe}
          userId={userId}
        />
      )}
    </IonContent>
  );
};

export default EventFocus;
