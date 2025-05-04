import { createContext, useContext, useState, ReactNode } from "react";
import { fetchData } from "../utils/fetchData";
import { getErrorMessage } from "../utils/getErrorMessage";
import { FETCH_CONFIG } from "../config/fetchConfig";


interface FullUser {
  userId: string;
  username: string;
  password: string;
  favFood: string;
};

type PublicUser = Omit<FullUser, "password">;
type LoginFields = Pick<FullUser, "username" | "password">;
type RegisterFields = Omit <FullUser, "userId">;

interface AuthContextType {
  publicUser: PublicUser | null;
  isLoggedIn: boolean | null;
  login: (credentials: LoginFields) => Promise<void | string>;
  register: (data: RegisterFields) => Promise<string>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [publicUser, setPublicUser] = useState<PublicUser | null>(null);
  const { ENDPOINTS, FETCH_OPTIONS } = FETCH_CONFIG;

  const login = async (credentials: LoginFields) => {
    try {
      const fetchedPublicUser: PublicUser = await fetchData(ENDPOINTS.LOGIN, credentials, FETCH_OPTIONS);
      setPublicUser(fetchedPublicUser);
      setIsLoggedIn(true);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error("Login failed: ", errorMessage);
      return errorMessage;
    };
  };

  const register = async (data: RegisterFields) => {
    try {
      const registerSuccessMsg: string = await fetchData(ENDPOINTS.REGISTER, data, FETCH_OPTIONS);
      return registerSuccessMsg;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error("Register failed: ", errorMessage);
      return errorMessage;
    };
  };

  const logout = () => {
    setIsLoggedIn(null);
    setPublicUser(null);
  };

  return (
  <AuthContext.Provider value={{publicUser, isLoggedIn, login, register, logout}}> 
    {children}
  </AuthContext.Provider>)
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  };
  return context;
};

export { AuthProvider, useAuth };
export type { FullUser, PublicUser, LoginFields, RegisterFields };