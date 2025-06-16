// Firebase configuration and initialization
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_JjQMlec-Z2_oOiDxUSl_hQwaT8dRuk8",
  authDomain: "grabbit-website.firebaseapp.com",
  projectId: "grabbit-website",
  storageBucket: "grabbit-website.firebasestorage.app",
  messagingSenderId: "103481957508",
  appId: "1:103481957508:web:bd59646007f79f349236d1",
  measurementId: "G-JFN3D1QQXM"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environment)
let analytics: Analytics | undefined;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firestore
const db: Firestore = getFirestore(app);

export { app, analytics, db };
