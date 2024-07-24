import React from "react";

interface PublicationCardProps {
  publication: {
    id: number;
    content: string;
    status: string;
    createdAt: string;
    authorId: number;
    authorName: string | null; //! need user service / provider
    eventId: number | null;
    views: number;
    nbComments: number;
    media: {
      id: number;
      url: string;
      file: string;
    } | null;
  };
  onButtonClick: () => void;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication, onButtonClick }) => {

  if (publication.status === "published") { // ! probably best to do it at the request
    if (publication.eventId === null) {
      return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 max-w-md mt-5" onClick={onButtonClick}>
          <img className="w-full" src={`data:image/jpeg;base64,${publication.media.file}`} alt="Event" />
          <div className="p-4">
            <p className="text-purple-600 mb-1">{publication.createdAt}</p>
            <h2 className="text-xl font-bold mb-2 mt-0 text-black">{publication.content}</h2>
            <p className="text-purple-600 self-end">Écrit par {publication.authorId}</p>
            <p className="text-green-600">{publication.views} vues</p>
            <p className="text-green-600">{publication.nbComments} commentaires</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 max-w-md mt-5" onClick={onButtonClick}>
          {/* <img className="w-full" src={`data:image/jpeg;base64,${publication.media.file}`} alt="Publication" /> */}
          <div className="p-4">
            <p className="text-purple-600 mb-1">{publication.createdAt}</p>
            <h2 className="text-xl font-bold mb-2 mt-0 text-black">{publication.content}</h2>
            <p className="text-purple-600 self-end">Écrit par {publication.authorId}</p>
            <p className="text-green-600">{publication.views} vues</p>
            <p className="text-green-600">{publication.nbComments} commentaires</p>
          </div>
        </div>
      );
    }
  }
};

export default PublicationCard;
