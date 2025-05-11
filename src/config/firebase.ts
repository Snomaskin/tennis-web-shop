import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";


const firebaseConfig = {
  projectId: "tennis-web-shop",
  apiKey: "fake-api-key",
  authDomain: "tennis-web-shop.firebaseapp.com"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
if (location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
};

const firestore = getFirestore(app);
if (location.hostname === "localhost") {
  connectFirestoreEmulator(firestore, "localhost", 8080);
}

export { auth, firestore };