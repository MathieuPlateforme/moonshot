import { HomeIcon } from "../icons/HomeIcon";
import { FeedIcon } from "../icons/FeedIcon";
import { EventIcon } from "../icons/EventIcon";
import { ChatIcon } from "../icons/ChatIcon";
import { LoopIcon } from "../icons/LoopIcon";
import { NotifIcon } from "../icons/NotifIcon";
import { CalendarIcon } from "../icons/CalendarIcon";
import { ProfileIcon } from "../icons/ProfileIcon";
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
    icon: ProfileIcon,
    link: ROUTES_PATH.REGISTER,
  },
]

export const USER_MENU = [
  {
    title: 'Feed',
    icon: FeedIcon,
    link: ROUTES_PATH.FEED,
  },
  {
    title: 'Events',
    icon: EventIcon,
    link: ROUTES_PATH.EVENTS,
  },
  // {
  //   title: 'Calendar',
  //   icon: CalendarIcon,
  //   // link: ROUTES_PATH.EVENTS,
  // },
  {
    title: 'Search',
    icon: LoopIcon,
    // link: ROUTES_PATH.EVENTS,
  },
  {
    title: 'Notifications',
    icon: NotifIcon,
    // link: ROUTES_PATH.EVENTS,
  },
  {
    title: 'Chat',
    icon: ChatIcon,
    // link: ROUTES_PATH.EVENTS,
  },
  // {
  //   title: 'Profile',
  //   icon: ProfileIcon,
  //   link: ROUTES_PATH.PROFILE,
  // },
  {
    title: 'Logout',
    icon: LogoutIcon,
    action: 'logout',
  },
]