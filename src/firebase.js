// Firebase core
import { initializeApp } from "firebase/app";

// Firebase modules
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "firebase/auth";

import Cookies from "js-cookie";
import { getDatabase, ref, set, serverTimestamp } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore"; // ✅ Firestore setup

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDCxd1wyv-aunumbJOEf1ufnPL_PqO1L-4",
  authDomain: "ar-fitness-cc8f4.firebaseapp.com",
  databaseURL: "https://ar-fitness-cc8f4-default-rtdb.firebaseio.com",
  projectId: "ar-fitness-cc8f4",
  storageBucket: "ar-fitness-cc8f4.appspot.com", // ✅ FIXED typo in domain
  messagingSenderId: "462031079702",
  appId: "1:462031079702:web:f14fe8b5bcd42ac613e837",
  measurementId: "G-50ZGB9MQXK",
};

// Initialize app and modules
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);            // ✅ Realtime DB
export const storage = getStorage(app);
export const firestore = getFirestore(app);     // ✅ Firestore

// ✅ Sign-In with Google & Save to Realtime DB + optional Firestore
export const signInWithGoogle = async () => {
  try {
    const googleProvider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, googleProvider);

    const uid = res.user.uid;
    const name = res.user.displayName;
    const email = res.user.email;
    const photo = res.user.photoURL;

    // Store tokens/client session
    Cookies.set("uat", res.user.accessToken);
    Cookies.set("userID", uid);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("photo", photo);

    // ✅ Realtime DB write
    await set(ref(db, `user/${uid}`), {
      userID: uid,
      name: name,
      email: email,
      photo: photo,
      timeStamp: serverTimestamp(),
    });

    // ✅ Optional: also store in Firestore (comment this out if unused)
    await setDoc(doc(firestore, "users", uid), {
      userID: uid,
      name: name,
      email: email,
      photo: photo,
      createdAt: new Date(),
    });

  } catch (err) {
    console.error("Sign-in failed:", err);
    alert(err.message);
  }
};

// ✅ Logout
export const logout = () => {
  signOut(auth);
  localStorage.clear();
  Cookies.remove("userID");
  Cookies.remove("uat");
};
