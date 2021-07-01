import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'

//here is where i want to call the seed file only once

// import { seedDatabase } from '../seed';

const config = {apiKey: "AIzaSyASCjKuJeL0BARtvoinBKBS48_BzyP1170",
authDomain: "instagram-84709.firebaseapp.com",
projectId: "instagram-84709",
storageBucket: "instagram-84709.appspot.com",
messagingSenderId: "759654843135",
appId: "1:759654843135:web:d9c1197b8c37357f9302ca"
}

const firebase = Firebase.initializeApp(config);
const  { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
// const timestamp = firebase.firestore.FieldValue.serverTimestamp;
// const timestamp = firebase.firestore.serverTimestamp;


export { firebase, FieldValue,projectStorage, projectFirestore };