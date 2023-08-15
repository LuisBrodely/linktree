import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, userExists } from "../firebase/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthProvider from "../components/AuthProvider";

const LoginView = () => {
  const navigate = useNavigate();

  const [state, setCurrentState] = useState(1);

  const signInWithGoogle = async (googleProvider) => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnClick = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);
  };

  const handleUserLoggedIn = (user) => {
    navigate("/dashboard");
  };

  const handleUserNotRegistered = (user) => {
    navigate("/choose-username");
  };

  const handleUserNotLoggedIn = () => {
    setCurrentState(4);
  };

  if (state === 4) {
    return <button onClick={handleOnClick}>Login with Google</button>;
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegisterd={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <div>Loading...</div>
    </AuthProvider>
  );
};

export default LoginView;
