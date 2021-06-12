import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDAHFwQl3H9plMgBeof2TnTB-fUga3JeFk",
    authDomain: "whatsapp-clone-36226.firebaseapp.com",
    projectId: "whatsapp-clone-36226",
    storageBucket: "whatsapp-clone-36226.appspot.com",
    messagingSenderId: "227424635124",
    appId: "1:227424635124:web:c3b072331850171068f6a1",
    measurementId: "G-Y2NH9HGR2L"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider, storage };
  export default db;