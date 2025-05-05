import { createContext, useContext, useState, ReactNode } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, firestore } from "./firebase";
import { getErrorMessage } from "../utils/getErrorMessage";


interface FullUser {
  userId: string;
  name: string;
  email: string;
  password: string;
  favFood: string;
};

type UserProfile =  Omit<FullUser, "password">;
type PublicUser = Omit<FullUser, "password" | "favFood">;
type LoginFields = Pick<FullUser, "email" | "password">;
type SignupFields = Omit <FullUser, "userId">;

interface AuthContextType {
  publicUser: PublicUser | null;
  isLoggedIn: boolean | null;
  login: (credentials: LoginFields) => Promise<void | string>;
  signup: (data: SignupFields) => Promise<string>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [publicUser, setPublicUser] = useState<PublicUser | null>(null);

  const login = async ({ email, password }: LoginFields) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const publicUser = await getPublicUser(userCredential);
      setPublicUser(publicUser);
      setIsLoggedIn(true);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error("Login failed: ", errorMessage);
      return errorMessage;
    };
  };

  const signup = async ({ name, email, password, favFood }: SignupFields) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      const userProfile: UserProfile = {
        userId,
        name,
        email,
        favFood,
      };
      await setDoc(doc(firestore, "users", userId), userProfile);
      return "Signup successful!";
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
  <AuthContext.Provider value={{publicUser, isLoggedIn, login, signup, logout}}> 
    {children}
  </AuthContext.Provider>)
};

const getPublicUser = async (userCredential: UserCredential): Promise<PublicUser> => {
  const uid = userCredential.user.uid;
  const docRef = doc(firestore, "users", uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("User profile not found.")
  }
    const data = docSnap.data();
    return {
      userId: uid,
      name: data.name,
      email: data.email,
    };
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  };
  return context;
};


export { AuthProvider, useAuth };
export type { FullUser, PublicUser, LoginFields, SignupFields };