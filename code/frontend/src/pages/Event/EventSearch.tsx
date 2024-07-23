import React, { useEffect } from "react";
import { IonContent, IonInput, IonCard, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonModal } from "@ionic/react";
import { BackArrowIcon } from "../../icons/BackArrowIcon";
import { getEventsAutoComplete } from "../../libs/api/event";
import EventFocus from "./EventFocus";

const EventSearch: React.FC<{ previousView: any }> = ({ previousView }) => {
  const [typeOptions, setTypeOptions] = React.useState([]);
  const [search, setSearch] = React.useState<any>("");
  const [allEvents, setAllEvents] = React.useState<any[]>([]);
  const [offset, setOffset] = React.useState(0);
  const [scrollDown, setScrollDown] = React.useState(0);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const loadEvents = async () => {
    await getEventsAutoComplete({
      title: search,
      limit: 20,
    }).then((response) => {
      setAllEvents(response.data);
    });
  };

  const loadMoreEvents = async () => {
    await getEventsAutoComplete({
      title: search,
      limit: 20,
      offset: offset,
    }).then((response) => {
      setAllEvents(allEvents.concat(response.data));
    });
  };

  const handleScroll = (e: any) => {
    if (e.scrollTop > scrollDown) {
      setOffset(offset + 10);
      setScrollDown(scrollDown + 4000);
      loadMoreEvents();
    }
  };

  useEffect(() => {
    if (search === "") {
      return;
    }
    loadEvents();
  }, [search]);

  return (
    <IonContent
      fullscreen
      scrollEvents={true}
      onIonScroll={(e) => {
        handleScroll(e.detail);
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
          height: "10%",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <a
          onClick={() => {
            previousView(false);
          }}
        >
          <BackArrowIcon color="black" />
        </a>
        <IonInput
          fill="solid"
          placeholder="Search for events"
          value={search}
          // onIonChange={(e) => setSearch(e.detail.value!)}
          onKeyUp={(e) => setSearch(e.currentTarget.value)}
        ></IonInput>
      </div>
      {allEvents?.map((event, index) => (
        <IonCard
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: "90%",
            height: "auto",
            paddingLeft: "10px",
          }}
          onClick={() => {
            setSelectedEvent(event.id);
            setIsOpen(true);
          }}
        >
          <img className="w-full" src={`data:image/jpeg;base64,${event.media.file}`} alt="Event" style={{ width: "60px", height: "60px" }} />
          <IonCardHeader>
            <IonCardSubtitle>{event.subEvents[0].address}</IonCardSubtitle>
            <IonCardTitle style={{ fontSize: "1.2em" }}>{event.title}</IonCardTitle>
            <IonCardSubtitle>{event.subEvents[0].start_date}</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
      ))}
      <IonModal isOpen={isOpen}>
        <EventFocus event_id={selectedEvent} previousView={setIsOpen} />
      </IonModal>
    </IonContent>
  );
};

export default EventSearch;
