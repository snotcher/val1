// Firebase config placeholder. Add your values to .env.local and do NOT commit secrets.
// Example .env.local entries:
// REACT_APP_FIREBASE_API_KEY=your_api_key
// REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
// REACT_APP_FIREBASE_PROJECT_ID=your_project_id
// REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
// REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
// REACT_APP_FIREBASE_APP_ID=your_app_id

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

let app;
export function initFirebase() {
  if (!app) app = initializeApp(firebaseConfig);
  return app;
}

export const auth = () => {
  initFirebase();
  return getAuth(app);
};

export const db = () => {
  initFirebase();
  return getFirestore(app);
};

export const storage = () => {
  initFirebase();
  return getStorage(app);
};
