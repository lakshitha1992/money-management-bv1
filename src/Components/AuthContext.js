import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to provide context to the app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // Store userId
  const [userName, setUserName] = useState(''); // Optionally store user name or other data
  const [loading, setLoading] = useState(true); // To handle loading state during initial check

  // Check if user is already logged in (e.g., from localStorage)
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (storedIsLoggedIn && storedUserId && storedUserName) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
      setUserName(storedUserName);
    }

    setLoading(false); // Once the check is complete, stop loading
  }, []);

  const login = (userId, userName) => {
    setIsLoggedIn(true);
    setUserId(userId);
    setUserName(userName);

    // Save the login state, userId, and userName to localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setUserName('');

    // Remove login state, userId, and userName from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId, userName, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);
