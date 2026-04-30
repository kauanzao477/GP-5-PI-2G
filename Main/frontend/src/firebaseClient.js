import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwmKlESVeuE4M6UI424lie85hC0i-pvUA",
  authDomain: "meusitejapi2026.firebaseapp.com",
  projectId: "meusitejapi2026",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);