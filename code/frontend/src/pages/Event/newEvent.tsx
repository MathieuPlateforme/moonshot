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
import { getEventTypes, postEvent, postEventDate } from "../../libs/api/event";
import { BackArrowIcon } from "../../icons/BackArrowIcon";

const NewEvent: React.FC<{ previousView: any }> = ({ previousView }) => {
  const [typeOptions, setTypeOptions] = React.useState([]);
  const [eventId, setEventId] = React.useState("");
  const [event, setEvent] = React.useState({
    title: "",
    description: "",
    type: "",
    recurrent: "",
    media: "",
  });
  // const [media, setMedia] = React.useState<Blob | null>(new Blob());
  const [eventDate, setEventDate] = React.useState({
    event_id: "",
    start_date: "",
    end_date: "",
    address: "",
  });

  useEffect(() => {
    if (typeOptions.length === 0) {
      const eventTypesRequest = getEventTypes();
      eventTypesRequest.then((response) => {
        setTypeOptions(response.data)
      });
    }
  }, [typeOptions]);

  const handleMediaSelect = async (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setEvent({ ...event, media: reader.result as string });
    };
  };

  const handleNewEvent = async () => {
    const newEventRequest = await postEvent(event);
    if (newEventRequest.status === 201) {
      setEventId(newEventRequest.data.id);
      setEventDate({ ...eventDate, event_id: newEventRequest.data.id });
    }
  };

  const handleNewEventDate = async () => {
    const newEventDateRequest = await postEventDate(eventDate);
    if (newEventDateRequest.status === 201) {
      setEventDate({
        event_id: eventId,
        start_date: "",
        end_date: "",
        address: "",
      });
      previousView(false);
    }
  };
  return (
    <IonContent fullscreen className="">
      <a className="top-0 left-0 p-4"
        onClick={() => {
          previousView(false);
        }}
      >
        <BackArrowIcon color="green" />
      </a>
      {eventId === "" && (
        <IonList className="rounded-xl p-2 shadow-blue-card m-2">
          <IonItem className="h-14">
            <IonInput className="" placeholder="Title" value={event.title} onIonChange={(e) => setEvent({ ...event, title: e.detail.value! })}></IonInput>
          </IonItem>
          <IonItem className="">
            <IonInput
            className=""
              placeholder="Description"
              value={event.description}
              onIonChange={(e) => setEvent({ ...event, description: e.detail.value! })}
            ></IonInput>
          </IonItem>
          <IonItem className="">
            <IonSelect
            className="h-14"
              label="Recurrence"
              labelPlacement="floating"
              value={event.recurrent}
              onIonChange={(e) => setEvent({ ...event, recurrent: e.detail.value! })}
            >
              <IonSelectOption key="1" value="0">
                Unique
              </IonSelectOption>
              <IonSelectOption key="2" value="1">
                Recurrent
              </IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem className="">
            <IonSelect className="" label="Event type" labelPlacement="floating" value={event.type} onIonChange={(e) => setEvent({ ...event, type: e.detail.value! })}>
              {typeOptions.map((typeOption: any) => (
                <IonSelectOption key={typeOption.id} value={typeOption.id}>
                  {typeOption.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem className="">
            <label className="" htmlFor="file">Media</label>
            <input
            className=""
              type="file"
              id="file"
              name="file"
              onChange={(e) =>
                // setEvent({ ...event, media: e.target.files![0] })}
                // setMedia(e.target.files![0])
                handleMediaSelect(e.target.files![0])
              }
            />
          </IonItem>
          <IonButton
          color="success"
            className="flex justify-center w-full p-2"
            onClick={() => {
              handleNewEvent();
            }}
          >
            Publish
          </IonButton>
        </IonList>
      )}
      {eventId !== "" && (
        <IonList className="p-2">
          <h2 className="text-center card-title">Event created! Now let's add some dates!</h2>
          <IonDatetimeButton className="py-4" datetime="startDate"></IonDatetimeButton>
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
          <IonItem className="pt-12">
            <IonInput
            className="card-adress"
              placeholder="address"
              value={eventDate.address}
              onIonChange={(e) => setEventDate({ ...eventDate, address: e.detail.value! })}
            ></IonInput>
          </IonItem>
          <IonButton
          color="success"
          className="flex justify-center w-full pt-12 p-2"
            onClick={() => {
              handleNewEventDate();
            }}
          >
            Add
          </IonButton>
        </IonList>
      )}
    </IonContent>
    // </IonPage>
  );
};

export default NewEvent;
