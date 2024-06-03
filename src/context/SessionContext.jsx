import { DropletIcon } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import UserAuthForm from '../components/shared/userAuthForm.page';
import { getFromLocalStorage } from '../lib/utils';
import { Navigate, useNavigate, } from "react-router-dom";

// Create a context for the session
const SessionContext = createContext({});

// Custom hook to use the session context
export const useSession = () => {
  const { userAuth, setShowModal, setUserAuth, showModal } = useContext(SessionContext)
  
  return {
    userAuth,
    showModal,
    setShowModal,
    setUserAuth
  }
};

// SessionProvider component to provide session data to the entire app
export const SessionProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({ access_token: null });
  const [showModal, setShowModal] = useState(false);

  // useEffect to initialize userAuth from localStorage when the component mounts
  useEffect(() => {
    const session = getFromLocalStorage('user');
    if (session) {
      setUserAuth(session);
    } else {
      setUserAuth({ access_token: null });
    }
    if (!userAuth.access_token) {
      navigate("/auth")
    }
  }, [userAuth.access_token]);
  const navigate = useNavigate()
  // Render the UserAuthForm if the user is not authenticated
  

  return (
    <SessionContext.Provider value={{ userAuth, setUserAuth, setShowModal, showModal }}>
      {children}
    </SessionContext.Provider>
  );
};
