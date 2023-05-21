import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import { getStorage } from "firebase/storage";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBOoB_LVaizIh0zxnIUe19SeuXLnBIyKqI",
  authDomain: "eventify-bb7a2.firebaseapp.com",
  projectId: "eventify-bb7a2",
  storageBucket: "eventify-bb7a2.appspot.com",
  messagingSenderId: "19632448757",
  appId: "1:19632448757:web:a19e9b3450db36508ad1bc",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();
const db = firebase.firestore();
export const storage = getStorage(app);

export { auth, db };
export { firebase };
