import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import useLocalStorage from '../hooks/useLocalStorage';
import { post } from '../libs/utils';

interface AuthContextType {
  hasAccess: (accesses: string[]) => boolean;
  getRole: () => string;
  getId: () => string;
  login: (email: string, password: string) => void;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType>({
  hasAccess: () => false,
  getRole: () => '',
  getId: () => '',
  login: () => null,
  logout: () => null,
  token: null,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken, removeToken] = useLocalStorage('token');
  const { VITE_REST_API } = import.meta.env;

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

  const getId = () => {
    let decodedToken = {} as { id: string };
    if(token)
      decodedToken = jwtDecode(token as string) as { id: string };
    return decodedToken.id;
  }

  const login = async (email: string, password: string) => {
    const loginRequest = await post({url: `${VITE_REST_API}:8000/tempLogin`, data: {email, password}, options: {}});
    console.log('allo??')
    console.log(email, password)
    // const loginRequest = await post({url: `https://localhost:8000/tempLogin`, data: {email, password}, options: {}});
    if(loginRequest.status === 200){
      (setToken as (value: any) => void)(loginRequest.data);;
    }
  };

  const logout = () => {
    removeToken();
  }

  return (
    <AuthContext.Provider
      value={{
        hasAccess,
        getRole,
        getId,
        login,
        logout,
        token,
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
    getId,
    login,
    logout,
    token,
  } = useContext(AuthContext);
  return {
    hasAccess,
    getRole,
    getId,
    login,
    logout,
    token,
  };
};

export default AuthProvider;
