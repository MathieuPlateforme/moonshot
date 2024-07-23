import React from "react";

interface PublicationCardProps {
  publication: {
    id: number;
    content: string;
    status: string;
    created_at: string;
    author_id: number;
    author: string | null;
    event_id: number | null;
    views: number;
    // media: {
    //   id: number;
    //   url: string;
    //   file: string;
    // };
  };
  onButtonClick: () => void;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication, onButtonClick }) => {

  if (publication.status === "published") {
    if (publication.event_id === null) {
      return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 max-w-md mt-5" onClick={onButtonClick}>
          {/* <img className="w-full" src={`data:image/jpeg;base64,${publication.media.file}`} alt="Publication" /> */}
          <div className="p-4">
            <p className="text-purple-600 mb-1">{publication.created_at}</p>
            <h2 className="text-xl font-bold mb-2 mt-0 text-black">{publication.content}</h2>
            <p className="text-purple-600 self-end">published by {publication.author_id}</p>
            <p className="text-green-600">{publication.views} vues</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 max-w-md mt-5" onClick={onButtonClick}>
          {/* <img className="w-full" src={`data:image/jpeg;base64,${publication.media.file}`} alt="Publication" /> */}
          <div className="p-4">
            <p className="text-purple-600 mb-1">{publication.created_at}</p>
            <h2 className="text-xl font-bold mb-2 mt-0 text-black">{publication.content}</h2>
            <p className="text-purple-600 self-end">published by {publication.author_id}</p>
            <p className="text-green-600">{publication.views} vues</p>
          </div>
        </div>
      );
    }
  }
};

export default PublicationCard;
