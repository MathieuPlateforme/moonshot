import React, { useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import { post, get } from "../../libs/utils";

const NewEvent: React.FC = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [type, setType] = React.useState("");
  const [typeOptions, setTypeOptions] = React.useState([]);
  const [recurrent, setRecurrent] = React.useState("");
  const [image, setImage] = React.useState("");

  useEffect(() => {
    if (typeOptions.length === 0) {
      get({ url: "https://localhost:8001/event/types", options: {} }).then((response) => {
        setTypeOptions(response.data);
      });
    }
  }, [typeOptions]);

  const handleNewEvent = async () => {
    const newEventRequest = await post({ url: "https://localhost:8001/event/new", data: { title, content, type, recurrent, image }, options: {} });
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonInput placeholder="Title" value={title} onIonChange={(e) => setTitle(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonInput placeholder="Description" value={content} onIonChange={(e) => setContent(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonSelect label="Recurrence" labelPlacement="floating"
              value={recurrent}
              onIonChange={(e) => setRecurrent(e.detail.value)}
            >
              <IonSelectOption value="0">Unique</IonSelectOption>
              <IonSelectOption value="1">Recurrent</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonSelect label="Event type" labelPlacement="floating"
              value={type}
              onIonChange={(e) => setType(e.detail.value)}
            >
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
      </IonContent>
    </IonPage>
  );
};

export default NewEvent;
