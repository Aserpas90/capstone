import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyANhO4a1tuujaI3xliHNvKJhy5ciyZy4tg",
    authDomain: "signing-with-d48e2.firebaseapp.com",
    projectId: "signing-with-d48e2",
    storageBucket: "signing-with-d48e2.appspot.com",
    messagingSenderId: "245302357443",
    appId: "1:245302357443:web:23091ab879ac8c8522a176"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function LoginWithGoogle() {
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log(result)
  }).catch((error) => {
    console.log(error)
  });
};

export async function LogoutWithGoogle() {   
        try {
          await auth.signOut();
          console.log('User signed out');
        } catch (error) {
          console.error('Error signing out:', error.message);
        }
};