import React from "react";
import { LeafIcon } from "../../../icons/LeafIcon";
import { EyeIcon } from "../../../icons/EyeIcon";
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
    author: {
      id: number;
      email: string;
      firstname: string;
      lastname: string;
      media: {
        id: number;
        url: string;
        file: string;
      };
    };
    media: {
      id: number;
      url: string;
      file: string;
    } | null;
  };
  onButtonClick: () => void;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication, onButtonClick }) => {
  if (publication.status === "published") {
    // ! probably best to do it at the request
    if (publication.eventId === null) {
      return (
        <div
          className="bg-white rounded-lg shadow-md overflow-hidden max-w-md mt-5 p-4 mb-5"
          onClick={onButtonClick}
          style={{ boxShadow: "0 2px 4px -1px rgba(10, 217, 68, 0.1), 0 2px 4px -1px rgba(10, 217, 68, 0.06)" }}
        >
          <div className="flex items-center">
            <img src={`data:image/jpeg;base64,${publication.author.media.file}`} alt="Author" className="w-12 h-12 rounded-full" />
            <div className="ml-4">
              <p className="text-purple-600 mb-1">
                {publication.author.firstname} {publication.author.lastname}
              </p>
              <p className="text-gray-600">{publication.createdAt}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-black">{publication.content}</p>
            {publication.media && <img className="w-full mt-4" src={`data:image/jpeg;base64,${publication.media.file}`} alt="Publication" />}
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex items-center">
              <EyeIcon />
              <p className="text-green-600">{publication.views}</p>
            </div>
            <div className="flex items-center">
              <LeafIcon />
              <p className="text-green-600">{publication.nbComments}</p>
            </div>
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
