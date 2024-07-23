import { get, post, put, del } from "../utils";
const { VITE_REST_API } = import.meta.env;

export const getEventTypes = async () => {
  return await get({ url: `${VITE_REST_API}:8083/event/types`, options: {} });
};

export const getEvents = async (params: Object | null = null) => {
  return await get({ url: `${VITE_REST_API}:8083/events`, options: { params } });
};

export const postEvent = async (event: Object) => {
  return await post({ url: `${VITE_REST_API}:8083/event/new`, data: { event }, options: {} });
};

export const putEvent = async (event: Object) => {
  return await put({ url: `${VITE_REST_API}:8083/event/update`, data: { event }, options: {} });
};

export const delEvent = async (event_id: string) => {
  return await del({ url: `${VITE_REST_API}:8083/event/delete`, options: { params: { id: event_id } } });
};

export const postEventDate = async (eventDate: Object) => {
  return await post({ url: `${VITE_REST_API}:8083/eventDate/new`, data: { eventDate }, options: {} });
};

export const putEventDate = async (eventDate: Object) => {
  return await put({ url: `${VITE_REST_API}:8083/eventDate/update`, data: { eventDate }, options: {} });
};


