// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.2.5/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.5/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

firebase.initializeApp({
  apiKey: "AIzaSyBpWkEKjBzILrhN_tzh428hELtVSttTPmg",
  authDomain: "imbee-test-leo.firebaseapp.com",
  projectId: "imbee-test-leo",
  storageBucket: "imbee-test-leo.appspot.com",
  messagingSenderId: "492554629847",
  appId: "1:492554629847:web:562b30ddc8258a123ff692",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
