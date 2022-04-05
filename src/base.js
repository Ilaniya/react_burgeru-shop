import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAYSs0keBZnl8SicZMVM0-jjw8f7V8svYg",
  authDomain: "very-hot-burgers-4ee30.firebaseapp.com",
  databaseURL:
    "https://very-hot-burgers-4ee30-default-rtdb.europe-west1.firebasedatabase.app",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
