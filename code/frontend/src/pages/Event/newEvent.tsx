import React, { useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
} from "@ionic/react";
import { post, get } from "../../libs/utils";

const NewEvent: React.FC = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [type, setType] = React.useState("");
  const [typeOptions, setTypeOptions] = React.useState([]);
  const [recurrent, setRecurrent] = React.useState("");
  const [image, setImage] = React.useState("");
  const [eventId, setEventId] = React.useState("");
  const [eventDate, setEventDate] = React.useState({
    event_id: "",
    start_date: "",
    end_date: "",
    address: "",
  });

  useEffect(() => {
    if (typeOptions.length === 0) {
      get({ url: "https://localhost:8001/event/types", options: {} }).then((response) => {
        setTypeOptions(response.data);
      });
    }
  }, [typeOptions]);

  const handleNewEvent = async () => {
    const newEventRequest = await post({ url: "https://localhost:8001/event/new", data: { title, content, type, recurrent, image }, options: {} });
    if (newEventRequest.status === 201) {
      setEventId(newEventRequest.data.id);
      setEventDate({ ...eventDate, event_id: newEventRequest.data.id});
    }
  };

  const handleNewEventDate = async () => {
    const newEventDateRequest = await post({ url: "https://localhost:8001/eventDate/new", data: { eventDate }, options: {} });
    if (newEventDateRequest.status === 201) {
      setEventDate({
        event_id: eventId,
        start_date: "",
        end_date: "",
        address: "",
      });
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle> {eventId === "" ? "New Event" : "Event created! Now let's add date(s) to it"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {eventId === "" && (
          <IonList>
            <IonItem>
              <IonInput placeholder="Title" value={title} onIonChange={(e) => setTitle(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonInput placeholder="Description" value={content} onIonChange={(e) => setContent(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonSelect label="Recurrence" labelPlacement="floating" value={recurrent} onIonChange={(e) => setRecurrent(e.detail.value)}>
                <IonSelectOption value="0">Unique</IonSelectOption>
                <IonSelectOption value="1">Recurrent</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonSelect label="Event type" labelPlacement="floating" value={type} onIonChange={(e) => setType(e.detail.value)}>
                {typeOptions.map((typeOption: any) => (
                  <IonSelectOption value={typeOption.id}>{typeOption.name}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonInput placeholder="image" value={image} onIonChange={(e) => setImage(e.detail.value!)}></IonInput>
            </IonItem>
            <IonButton
              onClick={() => {
                handleNewEvent();
              }}
            >
              Publish
            </IonButton>
          </IonList>
        )}
        {eventId !== "" && (
          <IonList>
            <IonDatetimeButton datetime="startDate"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime id="startDate" onIonChange={(e) => setEventDate({ ...eventDate, start_date: e.detail.value!.toString() })}>
                <span slot="title">Start date</span>
              </IonDatetime>
            </IonModal>
            <IonDatetimeButton datetime="endDate"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime id="endDate" onIonChange={(e) => setEventDate({ ...eventDate, end_date: e.detail.value!.toString() })}>
                <span slot="title">End date</span>
              </IonDatetime>
            </IonModal>
            <IonItem>
              <IonInput
                placeholder="address"
                value={eventDate.address}
                onIonChange={(e) => setEventDate({ ...eventDate, address: e.detail.value! })}
              ></IonInput>
            </IonItem>
            <IonButton
              onClick={() => {
                handleNewEventDate();
              }}
            >
              Add
            </IonButton>
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default NewEvent;
