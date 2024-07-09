import Home from "../pages/Home";
import Profile from "../pages/Profile";

import { ROUTES_PATH, ACCESSES } from "./constant";

export const routes = [
  {
    path: ROUTES_PATH.HOME,
    component: Home,
  },
  {
    path: ROUTES_PATH.PROFILE,
    component: Profile,
    accesses: [ACCESSES.USER]
  }
]