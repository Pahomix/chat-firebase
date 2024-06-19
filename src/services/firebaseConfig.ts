import "firebase/auth";
import "firebase/firestore";
import {getAuth, initializeAuth, getReactNativePersistence} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
	apiKey: 'AIzaSyDuRe8uUkTMBurvxtmqQy91UCXaOtYi0wo',
	authDomain: 'chat-app-e5dc8.firebaseapp.com',
	projectId: 'chat-app-e5dc8',
	storageBucket: 'chat-app-e5dc8.appspot.com',
	messagingSenderId: '373159711800',
	appId: '1:373159711800:web:1e9a7f220e451e861bc2cd',
	measurementId: 'G-F50EGGLP1X'
};

const app = initializeApp(firebaseConfig)
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(),
})
const db = getFirestore(app)

export { auth, db }