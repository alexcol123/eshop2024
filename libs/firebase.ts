// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwMyYClyQiUq3n_A7UsZvHNcLKvEZ0kZk",
  authDomain: "e-shop-vid-75a06.firebaseapp.com",
  projectId: "e-shop-vid-75a06",
  storageBucket: "e-shop-vid-75a06.appspot.com",
  messagingSenderId: "824885852312",
  appId: "1:824885852312:web:05555f504d5f135df178ed"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp