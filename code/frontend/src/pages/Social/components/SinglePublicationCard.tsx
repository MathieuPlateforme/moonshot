import React, { useState, useEffect, useRef } from "react";
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import { FlowerIcon } from "../../../icons/FlowerIcon";
import { CheckMarkIcon } from "../../../icons/CheckMarkIcon";

interface SinglePublicationCardProps {
  publication: {
    id: number;
    content: string;
    createdAt: string;
    // media: {
    //   id: number;
    //   url: string;
    //   file: string;
    // } | null;
    views: number;
    comments: any[];
    authorId: number;
  };
  sendComment: (comment: string) => void;
  authorId: string;
  comments: any[];
}

const SinglePublicationCard: React.FC<SinglePublicationCardProps> = ({
  publication,
  sendComment,
  authorId,
  comments,
}) => {
  const inputRef = useRef<HTMLIonInputElement>(null);

  useEffect(() => {
  }, [publication]);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 max-w-md">
      {/* <img className="w-full" src={`data:image/jpeg;base64,${publication?.media?.file}`} alt="Publication" /> */}
      <p className="p-4 m-5">Écrit par {publication?.authorId} le {publication?.createdAt}</p>
      <div className="p-4">
        {publication?.content}

        {/* <h2 className="text-xl font-bold mb-2 mt-0 text-black">{publication?.title}</h2> */}
      </div>
      <div className="p-4"> 
        <h2>Comments</h2>

        <IonInput ref={inputRef} placeholder="Comment" label="Add a comment" />

        <IonButton
          expand="full"
          color="primary"
          onClick={() => {
            if (inputRef.current) {
              const comment = inputRef.current.value as string;
              sendComment(comment);
            }
          }}
        >
          Send
        </IonButton>

        <IonList>
          {comments?.map((comment, index) => (
            <IonItem key={index}>
              {comment.content}
            </IonItem>
          ))}
        </IonList>
        {/* <IonButton
          expand="full"
          color="primary"
          onClick={() => {
            // handleSubscribe();
          }}
        >

        </IonButton> */}
      </div>

    </div>
  );
};

export default SinglePublicationCard;
