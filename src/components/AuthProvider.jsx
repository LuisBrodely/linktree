import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { auth, userExists } from '../firebase/firebase'
import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

const AuthProvider = ({ children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegisterd }) => {

	const navigate = useNavigate()

	useEffect(() => {

    onAuthStateChanged(auth, async (user) => {
      if(user) {
        const isRegistered = await userExists(user.uid) 
        if (isRegistered) {
          onUserLoggedIn()
        } else {
          onUserNotRegisterd()
        }
      } else {
        onUserNotLoggedIn()
      }
    })
  
  }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegisterd])

  return <main>{children}</main>;
};

export default AuthProvider;
