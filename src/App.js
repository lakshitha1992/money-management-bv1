import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Incomes from './Components/Transaction/Incomes';
import Payments from './Components/Transaction/Payments';
import Home from './Components/Home';
import NavBar from './Components/NavBar';

import SignUp from './Components/Users/SignUp';
import { AuthProvider } from './Components/AuthContext'; // Ensure this import is correct

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          {/* Navigation Bar */}
          <NavBar />

          {/* Routing */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/incomes" element={<Incomes />} />
    
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
