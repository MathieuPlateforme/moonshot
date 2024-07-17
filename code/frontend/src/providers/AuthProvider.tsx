import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import useLocalStorage from '../hooks/useLocalStorage';

interface AuthContextType {
  hasAccess: (accesses: string[]) => boolean;
  getRole: () => string;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  hasAccess: () => false,
  getRole: () => '',
  logout: () => null,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken, removeToken] = useLocalStorage('token');

  const hasAccess = (accesses: string[] = []) => {
    if (accesses.length === 0)
      return true;
    let decodedToken = {} as { role: string };
    if(token)
      decodedToken = jwtDecode(token as string) as { role: string };
    return accesses.some((access) => decodedToken.role === access);
  }

  const getRole = () => {
    let decodedToken = {} as { role: string };
    if(token)
      decodedToken = jwtDecode(token as string) as { role: string };
    return decodedToken.role;
  }

  const logout = () => {
    removeToken();
  }

  return (
    <AuthContext.Provider
      value={{
        hasAccess,
        getRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const {
    hasAccess,
    getRole,
    logout,
  } = useContext(AuthContext);
  return {
    hasAccess,
    getRole,
    logout,
  };
};

export default AuthProvider;
