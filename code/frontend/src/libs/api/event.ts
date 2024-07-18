import { get, post, put, del } from "../utils";
const { VITE_REST_API } = import.meta.env;

export const getEventTypes = async () => {
  return await get({ url: `${VITE_REST_API}:8001/event/types`, options: {} });
};

export const getEvents = async (params: Object | null = null) => {
  return await get({ url: `${VITE_REST_API}:8001/events`, options: { params } });
};

export const postEvent = async (event: Object) => {
  return await post({ url: `${VITE_REST_API}:8001/event/new`, data: { event }, options: {} });
};

export const postEventDate = async (eventDate: Object) => {
  return await post({ url: `${VITE_REST_API}:8001/eventDate/new`, data: { eventDate }, options: {} });
};
