import { firestore } from "../../../config/firebase";
import { collection, query, orderBy, startAt, endAt, getDocs, getDoc, doc, deleteDoc } from "firebase/firestore";


const usersRef = collection(firestore, "users");

function getUsersRef(id: string) {
  return doc(firestore, "users", id);
};

async function listUsers() {
  const snapshot = await getDocs(usersRef);
  return snapshot.docs.map(doc => ({
    uid: doc.id,
    ...doc.data()
  }));
};

async function findUser(identifier: string) {
  const snapshot = await getDoc(getUsersRef(identifier));

  return {id: snapshot.id, ...snapshot.data()};
};

async function findUsers(identifier: string) {
  const q = query(
    usersRef, 
    orderBy("name"), 
    startAt(identifier), 
    endAt(identifier + "uf8ff"));
  const snapshot = await getDocs(q);

  return  snapshot.docs.map(doc => ({
    uid: doc.id,
    ...doc.data()
  }));
};

async function deleteUser(identifier: string) {
  try {
    await deleteDoc(getUsersRef(identifier));
    return "User deleted successfully!"
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error;
  };
};

export { listUsers, findUser, findUsers, deleteUser }