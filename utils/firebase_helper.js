import { initializeApp } from "firebase/app";

export const getFirebaseConfig = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAwSRlBcrIBLoFq32ibJpqVsUg5b5nb_6s",

    authDomain: "whatsapp-clone-9849e.firebaseapp.com",

    projectId: "whatsapp-clone-9849e",

    storageBucket: "whatsapp-clone-9849e.appspot.com",

    messagingSenderId: "625516256531",

    appId: "1:625516256531:web:607b848e3b06ba43a34ee6",

    measurementId: "G-J185RF1CSF",
  };

  // Initialize Firebase

  return initializeApp(firebaseConfig);
};
