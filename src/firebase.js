

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyCRIaDxlQNIRHDGtjkc7_ARiJPg6XNKhK8",
    authDomain: "country-impression.firebaseapp.com",
    databaseURL: "https://country-impression-default-rtdb.firebaseio.com",
    projectId: "country-impression",
    storageBucket: "country-impression.appspot.com",
    messagingSenderId: "1024977098050",
    appId: "1:1024977098050:web:dcda8f65c56db186a964db",
    measurementId: "G-5P3P554LTM"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;

