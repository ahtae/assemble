import React, { useState, createContext } from 'react';

export const UserContext = createContext();

const ContextWrapper = (props) => {
  const defaultValueHandler = () => {
    const token = localStorage.getItem('token');

    if (token) {
      return true;
    }

    return false;
  };

  const [isLoggedIn, setIsLoggedIn] = useState(defaultValueHandler());
  const user = { isLoggedIn, setIsLoggedIn };

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

export default ContextWrapper;
