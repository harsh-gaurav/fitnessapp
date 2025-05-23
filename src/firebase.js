import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "firebase/auth";
import Cookies from "js-cookie";
import { getDatabase, ref, set, serverTimestamp } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDCxd1wyv-aunumbJOEf1ufnPL_PqO1L-4",
  authDomain: "ar-fitness-cc8f4.firebaseapp.com",
  databaseURL: "https://ar-fitness-cc8f4-default-rtdb.firebaseio.com",
  projectId: "ar-fitness-cc8f4",
  storageBucket: "ar-fitness-cc8f4.firebasestorage.app",
  messagingSenderId: "462031079702",
  appId: "1:462031079702:web:f14fe8b5bcd42ac613e837",
  measurementId: "G-50ZGB9MQXK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

export const signInWithGoogle = async () => {
  try {
    const googleProvider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, googleProvider);

    const accessToken = res.user.accessToken;
    Cookies.set("uat", accessToken);
    const uid = res.user.uid.toString();
    Cookies.set("userID", uid);

    const name = res.user.displayName;
    const email = res.user.email;
    const photo = res.user.photoURL;

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("photo", photo);

    const userRef = ref(db, `user/${uid}`);
    await set(userRef, {
      userID: uid,
      timeStamp: serverTimestamp(),
      name: res.user.displayName,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const logout = () => {
  signOut(auth);
  localStorage.clear();

  Cookies.remove("userID");
  Cookies.remove("uat");
};
