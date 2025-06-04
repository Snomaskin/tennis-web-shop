import { createContext, useContext, useState, ReactNode } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, signOut, User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../config/firebase";
import { getErrorMessage } from "../utils/getErrorMessage";


interface FullUser {
  userId: string;
  name: string;
  email: string;
  password: string;
  favFood: string;
};

type UserProfile =  Omit<FullUser, "password">;
type LoginFields = Pick<FullUser, "email" | "password">;
type SignupFields = Omit <FullUser, "userId">;

interface AuthContextType {
  currentUser: UserProfile | null;
  isLoggedIn: boolean | null;
  isAdmin: boolean;
  login: (credentials: LoginFields) => Promise<void | string>;
  signup: (data: SignupFields) => Promise<string>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const login = async ({ email, password }: LoginFields) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const publicUser = await getPublicUser(userCredential);
      checkAdmin(userCredential.user);
      setCurrentUser(publicUser);
      setIsLoggedIn(true);
      return "Login successful!"
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error("Login failed: ", errorMessage);
      return errorMessage;
    };
  };

  const checkAdmin = async (user: User) => {
    const token = await user.getIdTokenResult();
    const isAdmin = !!token.claims.admin;
    setIsAdmin(isAdmin);
  };

  const signup = async ({ name, email, password, favFood }: SignupFields) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      const userProfile = {
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

  const logout = async () => {
    await signOut(auth);
    setIsLoggedIn(null);
    setCurrentUser(null);
    setIsAdmin(false);
  };

  return (
  <AuthContext.Provider value={{
    currentUser, 
    isLoggedIn, 
    isAdmin,
    login, 
    signup, 
    logout
  }}> 
    {children}
  </AuthContext.Provider>)
};

const getPublicUser = async (userCredential: UserCredential): Promise<UserProfile> => {
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
      favFood: data.favFood,
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
export type { UserProfile, LoginFields, SignupFields };