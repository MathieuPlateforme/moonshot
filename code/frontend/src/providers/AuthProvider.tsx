import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import useLocalStorage from '../hooks/useLocalStorage';

interface AuthContextType {
  hasAccess: (accesses: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  hasAccess: () => false,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken, removeToken] = useLocalStorage('token');

  const hasAccess = (accesses: string[] = []) => {
    if (accesses.length === 0)
      return true;
    let decodedToken = {} as { role: string };
    if(token)
      decodedToken = jwtDecode(token as string) as { role: string };
    console.log(decodedToken);
    return accesses.some((access) => decodedToken.role === access);
  }

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
