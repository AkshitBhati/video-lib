import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config';

// Create a UserContext
const UserContext = createContext();

// Define a custom hook to use the UserContext
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
