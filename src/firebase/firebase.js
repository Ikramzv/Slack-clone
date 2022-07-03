import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
import { getAuth , GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAwlFiL7P9uZcbVNM8_E9bdj2gMWgwAuT0",
  authDomain: "slack-clone-e509c.firebaseapp.com",
  projectId: "slack-clone-e509c",
  storageBucket: "slack-clone-e509c.appspot.com",
  messagingSenderId: "464213354422",
  appId: "1:464213354422:web:1898cfb3889704ddcbc317"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)
const auth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account'
})

export { storage , auth , provider }
export default db