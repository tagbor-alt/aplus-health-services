const firebaseConfig = {
  apiKey: "AIzaSyBCRRjvP-Bm_HKv6bE1kQCQFtqmnvJlCkA",
  authDomain: "aplus-health-services.firebaseapp.com",
  databaseURL: "https://aplus-health-services-default-rtdb.firebaseio.com",
  projectId: "aplus-health-services",
  storageBucket: "aplus-health-services.firebasestorage.app",
  messagingSenderId: "35633016272",
  appId: "1:35633016272:web:4adc16b76f53c11f645dd5",
  measurementId: "G-7GZFPY7NC0"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();