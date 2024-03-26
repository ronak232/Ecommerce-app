import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import { createContext, useContext } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyB5TFzHslTZ7-Rk5Rg6ZCWHVE7w6fuAo7Q",
  authDomain: "e-comm-app-6b0df.firebaseapp.com",
  projectId: "e-comm-app-6b0df",
  storageBucket: "e-comm-app-6b0df.appspot.com",
  messagingSenderId: "723357921913",
  appId: "1:723357921913:web:1b6ac090fc18593e94daa8",
  databaseURL: "https://e-comm-app-6b0df-default-rtdb.firebaseio.com/",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDatabase = getDatabase(firebaseApp);

const FirebaseContext = createContext(null);

// using this custom hook used for calling the context data anywhere in our application.
export const useFirebaseAuth = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  // create new user with credentials for signup in database whenever new user singup...
  const signUpUser = async (email, passowrd, confirmPssd, username) => {
    return await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      passowrd,
      confirmPssd,
      username
    ).then((val) => {
      alert("Successfully!", val);
    });
  };

  // storing new user in database...
  const putUserData = (key, data) => {
    set(ref(firebaseDatabase, key), data);
  };

  const loginUser = async (email, passowrd) =>{
      return await signInWithEmailAndPassword(firebaseAuth, email, passowrd).then()
  }




  return (
    <FirebaseContext.Provider value={{ signUpUser, putUserData }}>
      {children}
    </FirebaseContext.Provider>
  );
};
