import React, { useEffect } from "react";
import { IonContent } from "@ionic/react";
import SinglePublicationCard from "./components/SinglePublicationCard";
import { getPublication , getPublicationComments, postComment} from "../../libs/api/social";
import { BackArrowIcon } from "../../icons/BackArrowIcon";
import { useAuth } from "../../providers/AuthProvider";
import { post } from "@/libs/utils";

const PublicationFocus: React.FC<{ publication_id: string | null; previousView: any }> = ({ publication_id, previousView }) => {
  const [publication, setPublication] = React.useState<any>(null);
  const [comments, setComments] = React.useState<any>([]);
  const [commentContent, setCommentContent] = React.useState("");
  const [selectedPublicationDate, setSelectedPublicationDate] = React.useState<any>(null);
  const [publicationParticipants, setPublicationParticipants] = React.useState<any>(null);
  const { getId } = useAuth();
  const userId = getId();
  const [subscribed, setSubscribed] = React.useState(false);
  const [subscribedId, setSubscribedId] = React.useState("");

  const sendComment = async (comment: string) => {
    console.log("newcom", comment);
    try {
      const response = await postComment({ content: comment, authorId: 80, publication: publication, publication_id: publication_id });
      console.log("API response", response); 
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  const loadPublication = async () => {
    try {
      // console.log("LOADING PUBLICATION");
      const publicationResponse = await getPublication({ id: publication_id });
      // console.log("LOADING COMMENTS");
      const publicationCommentsResponse = await getPublicationComments({ publication_id: publication_id });
      // console.log("SETTING PUBLICATION");
      // console.log("PUBLICATION", publicationResponse);
      // console.log("COMMENTS", publicationCommentsResponse);
      setPublication(publicationResponse.data);
      // console.log("SETTING COMMENTS");
      setComments(publicationCommentsResponse.data);
      // console.log("COMMENTS", comments);
    } catch (error) {
      console.error(error);
    }
    // publicationRequest.then((response) => {
    //   setPublication(response.data[0]);
    //   // setPublicationParticipants(response.data["participants"]);
    //   // setSelectedPublicationDate(response.data[0].subPublications[0]);      
    // });
  };

  useEffect(() => {
    if (publication_id == null) return;
    loadPublication();
  }, [publication_id]);

  // useEffect(() => {
  //   if (publicationParticipants === null) return;
  //   for (const participation of publicationParticipants) {
  //     if (participation.user_id == userId) {
  //       setSubscribed(true);
  //       setSubscribedId(participation.id);
  //       return;
  //     }
  //   }
  // }, [publicationParticipants]);

  return (
    <IonContent fullscreen>
      <a
        onClick={() => {
          previousView(false);
        }}
        style={{ position: "absolute", top: "10px", left: "10px" }}
      >
        <BackArrowIcon color="grey" />
      </a>
      {publication && (
        <SinglePublicationCard
          publication={publication}
          sendComment={sendComment}
          authorId={userId}
          // userId={userId}
          comments={comments}
        />
      )}
    </IonContent>
  );
};

export default PublicationFocus;
