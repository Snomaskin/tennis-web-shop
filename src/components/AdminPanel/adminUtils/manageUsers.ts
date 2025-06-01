import { firestore } from "../../../config/firebase";
import {
  collection, doc, getDoc, getDocs, deleteDoc, query, startAt, endAt, orderBy, QueryDocumentSnapshot, DocumentData, FirestoreDataConverter
} from "firebase/firestore";
import { UserProfile } from "../../../auth/AuthContext";


const userFirestoreConverter: FirestoreDataConverter<UserProfile> = {
  toFirestore(user: UserProfile): DocumentData {
    return {
      name: user.name,
      email: user.email,
      favFood: user.favFood
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): UserProfile {
    const data = snapshot.data();
    return {
      userId: snapshot.id,
      name: data.name,
      email: data.email,
      favFood: data.favFood
    };
  }
};

const usersRef = collection(firestore, "users").withConverter(userFirestoreConverter);

function getUsersRef(id: string) {
  return doc(firestore, "users", id).withConverter(userFirestoreConverter);
};

async function listUsers(): Promise<UserProfile[]> {
  try {
    const snapshot = await getDocs(usersRef);
    return snapshot.docs.map(doc => doc.data());

  } catch (error){
    console.error("Error fetching users: ", error);
    throw error
  }
};

async function findUser(identifier: string) {
  const snapshot = await getDoc(getUsersRef(identifier));
  if (!snapshot.exists()) return [];
  return [snapshot.data()];
};

async function findUsers(identifier: string): Promise<UserProfile[]> {
  const q = query(
    usersRef, 
    orderBy("name"), 
    startAt(identifier), 
    endAt(identifier + "uf8ff"));
  const snapshot = await getDocs(q);
  return  snapshot.docs.map(doc => doc.data());
};

async function deleteUser(identifier: string): Promise<string> {
  try {
    await deleteDoc(getUsersRef(identifier));
    return "User deleted successfully!"
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error;
  };
};

export { listUsers, findUser, findUsers, deleteUser }