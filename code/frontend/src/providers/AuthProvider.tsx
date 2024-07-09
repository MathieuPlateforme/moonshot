import { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface AuthContextType {
  hasAccess: (accesses: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  hasAccess: () => false,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [profile, setProfile, removeProfile] = useLocalStorage('profile');

  const hasAccess = (accesses: string[] = []) =>
    accesses.some((access) => profile === access);

  return (
    <AuthContext.Provider
      value={{
        hasAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const {
    hasAccess,
  } = useContext(AuthContext);
  return {
    hasAccess,
  };
};

export default AuthProvider;
