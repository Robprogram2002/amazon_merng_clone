import firebase from "firebase";
import "firebase/storage";
import "firebase/firestore";
// import { firestore } from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyB69RBrKmLBEvJ-ktSPIvraA56mD2wb_hA",
  authDomain: "clonemerng.firebaseapp.com",
  databaseURL: "https://clonemerng.firebaseio.com",
  projectId: "clonemerng",
  storageBucket: "clonemerng.appspot.com",
  messagingSenderId: "667226546816",
  appId: "1:667226546816:web:d4d7886a450aab1e477c65",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
