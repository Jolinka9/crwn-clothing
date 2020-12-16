import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';




const config = {
    apiKey: "AIzaSyBVXzsmhyiKxCx9NqDIDq51UpWl4Vhvbuw",
    authDomain: "crwn-db-ea3e8.firebaseapp.com",
    databaseURL: "https://crwn-db-ea3e8.firebaseio.com",
    projectId: "crwn-db-ea3e8",
    storageBucket: "crwn-db-ea3e8.appspot.com",
    messagingSenderId: "848895026247",
    appId: "1:848895026247:web:d847e99cc5c8b57b277d62",
    measurementId: "G-EL3CQSQW0X"
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if(!userAuth) return;

      // Gets a DocumentReference instance that refers to the document at the specified path.Parameter is documentpath
      // and returns doc reference
      const userRef = firestore.doc(`users/${userAuth.uid}`);
      // get() reads the document
      const snapShot = await userRef.get();

      if(!snapShot.exists)
      {
          const {displayName, email} = userAuth;
          const createdAt = new Date();
           
          try {
              await userRef.set({
                  displayName,
                  email,
                  createdAt,
                  ...additionalData
              });
          } catch(error){
              console.log('error creating user', error.message);

          }
      }
      return userRef;
  };


 

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;


