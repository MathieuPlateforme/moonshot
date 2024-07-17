import { HomeIcon } from "../icons/HomeIcon";
import { FeedIcon } from "../icons/FeedIcon";
import { EventIcon } from "../icons/EventIcon";
import { LoginIcon } from "../icons/LoginIcon";
import { LogoutIcon } from "../icons/LogoutIcon";

export const ROUTES_PATH = {
  HOME: '/',
  PROFILE: '/profile/:id',
  REGISTER: '/register',
  LOGIN: '/login',
  FEED: '/feed',
  EVENTS: '/events',
  NEW_EVENT: '/event/new',
};

export const ACCESSES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export const GUEST_MENU = [
  {
    title: 'Home',
    icon: HomeIcon,
    link: ROUTES_PATH.HOME,
  },
  {
    title: 'Login',
    icon: LoginIcon,
    link: ROUTES_PATH.LOGIN,
  },
  {
    title: 'Register',
    link: ROUTES_PATH.REGISTER,
  },
]

export const USER_MENU = [
  {
    title: 'Feed',
    icon: FeedIcon,
    link: ROUTES_PATH.HOME,
  },
  {
    title: 'Events',
    icon: EventIcon,
    link: ROUTES_PATH.EVENTS,
  },
  {
    title: 'Profile',
    link: ROUTES_PATH.PROFILE,
  },
  {
    title: 'Logout',
    icon: LogoutIcon,
    action: 'logout',
  },
]