import { HomeIcon } from "../icons/HomeIcon";
import { LoginIcon } from "../icons/LoginIcon";
import { LogoutIcon } from "../icons/LogoutIcon";

export const ROUTES_PATH = {
  HOME: '/',
  PROFILE: '/profile/:id',
  REGISTER: '/register',
  LOGIN: '/login',
  NEW_EVENT: '/event/new',
};

export const ACCESSES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export const GUEST_MENU = [
  {
    title: 'Accueil',
    icon: HomeIcon,
    link: ROUTES_PATH.HOME,
  },
  {
    title: 'Connexion',
    icon: LoginIcon,
    link: ROUTES_PATH.LOGIN,
  },
  {
    title: 'Inscription',
    link: ROUTES_PATH.REGISTER,
  },
]

export const USER_MENU = [
  {
    title: 'Accueil',
    icon: HomeIcon,
    link: ROUTES_PATH.HOME,
  },
  {
    title: 'Profil',
    link: ROUTES_PATH.PROFILE,
  },
  {
    title: 'Déconnexion',
    icon: LogoutIcon,
    link: ROUTES_PATH.LOGIN,
  },
]