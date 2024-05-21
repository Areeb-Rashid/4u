import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCbNlZI-n3ZO6bEybmKx7lMlyi-lWXGxPs",
  authDomain: "you-154d7.firebaseapp.com",
  projectId: "you-154d7",
  storageBucket: "you-154d7.appspot.com",
  messagingSenderId: "441920354494",
  appId: "1:441920354494:web:40e218010f06cee1d706ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
