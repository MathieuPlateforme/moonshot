import React, { useEffect, useState } from "react";
import { IonContent, IonModal } from "@ionic/react";
import PublicationCard from "./components/PublicationCard";
import { getPublications } from "../../libs/api/social";
import PublicationFocus from "./PublicationFocus";
import Header from "../../components/Header";

const PublicationList: React.FC = () => {
  const [allPublications, setAllPublications] = React.useState<any[]>([]);
  const [selectedPublication, setSelectedPublication] = React.useState(null);
  const [offset, setOffset] = React.useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollDown, setScrollDown] = useState(0);
  const [headerIsVisible, setHeaderIsVisible] = useState(true);

  const loadPublications = async () => {
    await getPublications({
      limit: 10,
      offset: offset,
    }).then((response: any) => {
      setAllPublications(allPublications.concat(response.data));
      setOffset(offset + 10);
      setScrollDown(scrollDown + 4000);
    });
  };

  const handleScroll = (e: any) => {
    if (e.scrollTop > scrollDown) {
      loadPublications();
    }
    if (e.currentY > e.startY) {
      setHeaderIsVisible(false);
    }
    if (e.currentY < e.startY) {
      setHeaderIsVisible(true);
    }
  };

  useEffect(() => {
    if (allPublications.length === 0) loadPublications();
  }, [allPublications]);

  return (
    <IonContent
      scrollEvents={true}
      onIonScroll={(e) => {
        handleScroll(e.detail);
      }}
    >
      {allPublications?.map((publication, index) => (
        <PublicationCard
          key={index}
          publication={publication}
          onButtonClick={() => {
            setSelectedPublication(publication.id);
            setIsOpen(true);
          }}
        />
      ))}
      <IonModal isOpen={isOpen}>
        <PublicationFocus publication_id={selectedPublication} previousView={setIsOpen} />
      </IonModal>
      <Header isVisible={headerIsVisible} />
    </IonContent>
  );
};

export default PublicationList;
