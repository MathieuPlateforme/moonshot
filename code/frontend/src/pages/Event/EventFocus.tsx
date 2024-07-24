import React, { useEffect } from "react";
import { IonContent } from "@ionic/react";
import SingleEventCard from "./components/SingleEventCard";
import { getEvents, delEvent } from "../../libs/api/event";
import { BackArrowIcon } from "../../icons/BackArrowIcon";
import { postEventParticipant, delEventParticipant } from "../../libs/api/event";
import { useAuth } from "../../providers/AuthProvider";

const EventFocus: React.FC<{ event_id: string | null; previousView: any }> = ({ event_id, previousView }) => {
  const [event, setEvent] = React.useState<any>(null);
  const [selectedEventDate, setSelectedEventDate] = React.useState<any>(null);
  const [eventParticipants, setEventParticipants] = React.useState<any>(null);
  const { getId } = useAuth();
  const [subscribedToAll, setSubscribedToAll] = React.useState(false);
  const [eventIsMine, setEventIsMine] = React.useState(false);

  const loadEvent = async () => {
    const eventRequest = getEvents({ id: event_id, participants: "" });
    eventRequest.then((response) => {
      setEvent(response.data[0]);
      setEventParticipants(response.data["participants"]);
      if (selectedEventDate === null) {
        setSelectedEventDate(response.data[0].subEvents[0]);
      } else {
        setSelectedEventDate(response.data[0].subEvents.find((eventDate: any) => eventDate.id === selectedEventDate.id));
      }
      if (response.data[0].user_id == getId()) {
        setEventIsMine(true);
      }
    });
  };

  const handleSubscribe = async (target: string) => {
    if (target == "single") {
      if (selectedEventDate.is_subscribed) {
        delEventParticipant(selectedEventDate.participation_id).then((response) => {
          if (response.status === 200) {
            loadEvent();
            setSubscribedToAll(false);
          }
        });
      } else {
        const eventParticipant = {
          event_date_id: selectedEventDate.id,
        };
        postEventParticipant(eventParticipant).then((response) => {
          if (response.status === 201) {
            loadEvent();
          }
        });
      }
    } else if (target == "all") {
      if (subscribedToAll) {
        for (const eventDate of event.subEvents) {
          delEventParticipant(eventDate.participation_id).then((response) => {
            if (response.status === 200) {
              // loadEvent();
            }
          });
        }
        setSubscribedToAll(false);
        loadEvent();
      } else {
        for (const eventDate of event.subEvents) {
          if (!eventDate.is_subscribed) {
            const eventParticipant = {
              event_date_id: eventDate.id,
            };
            postEventParticipant(eventParticipant).then((response) => {
              if (response.status === 201) {
                // loadEvent();
              }
            });
          }
        }
        loadEvent();
      }
    } else return;
  };

  const handleDelete = async () => {
    alert("Are you sure you want to delete this event?");
    delEvent(event.id).then((response) => {
      if (response.status === 200) {
        previousView(false);
      }
    });
  };

  useEffect(() => {
    if (event_id == null) return;
    loadEvent();
  }, [event_id]);

    useEffect(() => {
    if(event === null) return;
    let count = 0;
    for(const eventDate of event.subEvents){
      for(const participation of eventParticipants){
        if(participation.event_date_id == eventDate.id && participation.user_id == getId()){
          eventDate.participation_id = participation.id;
          if(eventDate.is_subscribed == true){
            count++;
          }
        }
      }
    }
    if(count == event.subEvents.length) setSubscribedToAll(true);
  }, [event]);

  return (
    <IonContent fullscreen>
      <a
        onClick={() => {
          previousView(false);
        }}
        style={{ position: "absolute", top: "10px", left: "10px" }}
      >
        <BackArrowIcon color="green" />
      </a>
      {event && (
        <SingleEventCard
          event={event}
          selectedEventDate={selectedEventDate}
          setSelectedEventDate={setSelectedEventDate}
          eventParticipants={eventParticipants}
          subscribedToAll={subscribedToAll}
          handleSubscribe={handleSubscribe}
          handleDelete={handleDelete}
          eventIsMine={eventIsMine}
        />
      )}
    </IonContent>
  );
};

export default EventFocus;
