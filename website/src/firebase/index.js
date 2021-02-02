import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = JSON.parse(process.env.VUE_APP_FIREBASE_CONFIG);
const firebaseApp = firebase?.apps[0]
  ? firebase.apps[0]
  : firebase.initializeApp(firebaseConfig);

export default firebaseApp;
