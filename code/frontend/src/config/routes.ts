import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import EventFeed from "../pages/Event";
import NewEvent from "../pages/Event/newEvent";
import PublicationList from "../pages/Social/feed";

import { ROUTES_PATH, ACCESSES } from "./constant";

export const routes = [
  {
    path: ROUTES_PATH.HOME,
    component: Home,
  },
  {
    path: ROUTES_PATH.REGISTER,
    component: Register,
  },
  {
    path: ROUTES_PATH.LOGIN,
    component: Login,
  },
  {
    path: ROUTES_PATH.PROFILE,
    component: Profile,
    accesses: [ACCESSES.USER]
  },
  {
    path: ROUTES_PATH.EVENTS,
    component: EventFeed,
  },
  {
    path: ROUTES_PATH.NEW_EVENT,
    component: NewEvent,
  },
  {
    path: ROUTES_PATH.FEED,
    component: PublicationList,
  },
]