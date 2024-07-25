import { get, post, put, del } from "../utils";
const { VITE_REST_API } = import.meta.env;

/***** PUBLICATION *****/

export const getPublications = async (params: Object | null = null) => {
  return await get({ url: `${VITE_REST_API}:8003/publication/list`, options: { params } });
};

// export const getPublicationsAutoComplete = async (params: Object | null = null) => {
//   return await get({ url: `${VITE_REST_API}:8003/publications/autocomplete`, options: { params } });
// };

export const postPublication = async (publication: Object) => {
  return await post({ url: `${VITE_REST_API}:8003/publication/new`, data: { publication }, options: {} });
};

export const updatePublication = async (publication: Object) => {
  return await put({ url: `${VITE_REST_API}:8003/publication/update`, data: { publication }, options: {} });
};

export const getPublication = async (publication: Object) => {
    return await get({ url: `${VITE_REST_API}:8003/publication/${publication.id}`, options: { params: { id: publication.id } } });
};

export const delPublication = async (publication_id: string) => {
  // return await del({ url: `${VITE_REST_API}:8003/publication/delete`, options: { params: { id: publication_id } } });
};

/***** COMMENT *****/

export const getComments = async (params: Object | null = null) => {
  return await get({ url: `${VITE_REST_API}:8003/comment/list`, options: { params } });
}

export const getPublicationComments = async (req: Object) => {
  const url = `${VITE_REST_API}:8003/publication/${req.publication_id}/comments`;
  return await get({ url });
}

export const postComment = async (req: Object) => {
  console.log("POSTCOMMENT", req);
  return await post({ url: `${VITE_REST_API}:8003/comment/new`, data: req , options: {} });
}

/***** SOCIAL *****/

// export const get

/***** TAG *****/
