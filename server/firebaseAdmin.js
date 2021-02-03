import admin from "firebase-admin";
var serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default adminApp;
