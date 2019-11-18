import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyBGisBLPRTfDM4xGwZVWPoP7tKIU6xoT24",
  authDomain: "bit-care-7eca1.firebaseapp.com",
  databaseURL: "https://bit-care-7eca1.firebaseio.com",
  projectId: "bit-care-7eca1",
  storageBucket: "bit-care-7eca1.appspot.com",
  messagingSenderId: "481107817362",
  appId: "1:481107817362:web:3c08b8f8f6db3b4c48874b",
  measurementId: "G-MYYDCTJYE1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
