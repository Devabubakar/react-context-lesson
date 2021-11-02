import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA4UgZTn1jRuVY4BzgQSs8_88Vc3JjrXRg',

  authDomain: 'react-ecommerce-9b741.firebaseapp.com',

  projectId: 'react-ecommerce-9b741',

  storageBucket: 'react-ecommerce-9b741.appspot.com',

  messagingSenderId: '509180673961',

  appId: '1:509180673961:web:158e248eae907d6c8c0eb8',

  measurementId: 'G-LKWEK27NR6',
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
