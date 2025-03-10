// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDq6GvSJZ3Vqk8UOUFcI-_JEkYA0nUr4QI",
  authDomain: "tictactoe-online-a9725.firebaseapp.com",
  databaseURL: "https://tictactoe-online-a9725-default-rtdb.firebaseio.com",
  projectId: "tictactoe-online-a9725",
  storageBucket: "tictactoe-online-a9725.firebasestorage.app",
  messagingSenderId: "519413068103",
  appId: "1:519413068103:web:e7c91e778b917838b29c62",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };