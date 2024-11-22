import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, IconButton, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../AuthContext'; // Assuming you have an AuthContext for managing login state
import './Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost/react/login.php', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      const result = response.data;

      if (result.success) {
        login(result.userId);
        setSuccessMessage(result.message); // Set success message
        window.location.href = "/home"; // Redirect to home after successful login
      } else {
        setError(result.error || 'Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while logging in. Please try again later.');
      console.error(err);
    }

    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <Box
        component="form"
        className="login-form"
        onSubmit={handleLogin}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h4" className="login-title" gutterBottom>
          Login
        </Typography>

        <TextField
          id="email"
          name="email"
          label="Email Address"
          type="email"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={formData.email}
          onChange={handleInputChange}
        />

        <Box className="password-field" sx={{ position: 'relative' }}>
          <TextField
            id="password"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={formData.password}
            onChange={handleInputChange}
          />
          <IconButton
            onClick={togglePasswordVisibility}
            edge="end"
            aria-label="toggle password visibility"
            sx={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: '10px',
            }}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </Box>

        {/* Error Message */}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Success Message */}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, mb: 1 }}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>

        <Box sx={{ textAlign: 'center' }}>
          <Link href="/signup" underline="hover">
            Sign Up
          </Link>
          <Link href="/forgot-password" underline="hover" sx={{ ml: 2 }}>
            Forgot Password?
          </Link>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
