import React from 'react';
import { useAuth } from './AuthContext'; // Import useAuth hook
import Login from './Users/Login'; // Import Login component
import Balance from './Balance'; // Import Balance component

const Home = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth(); // Using useAuth to get context values

  // Handle successful login by updating the login state
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update login state when login is successful
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Payment Management System</h1>

      {/* If the user is not logged in, show the Login form */}
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        // If the user is logged in, show the Balance component
        <div>
          <Balance />
        </div>
      )}
    </div>
  );
};

export default Home;
