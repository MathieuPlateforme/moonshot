import React, { useEffect } from "react";
import { IonButton, IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";
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
  // handleSubscribe: () => void;
  authorId: string;
  comments: any[];
}

const SinglePublicationCard: React.FC<SinglePublicationCardProps> = ({
  publication,
  // handleSubscribe,
  authorId,
  comments,
}) => {

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
