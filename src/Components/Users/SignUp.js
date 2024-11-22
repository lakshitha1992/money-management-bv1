import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState('success'); // 'success' or 'error'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' }); // Clear error as user types
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost/react/signup.php', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.message) {
        setMessage(response.data.message);
        setSeverity('success');
      } else if (response.data.error) {
        setMessage(response.data.error);
        setSeverity('error');
      }
      setOpenSnackbar(true);

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }); // Clear form fields after successful signup
    } catch (error) {
      console.error('Axios error:', error.response || error.message);
      setMessage('Error: ' + (error.response?.data?.error || error.message));
      setSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="signup-container">
      <Box
        component="form"
        onSubmit={handleSignUp}
        sx={{
          maxWidth: 400,
          margin: 'auto',
          marginTop: '10px',
          padding: 3,
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          Sign Up
        </Typography>

        {/* Form fields */}
        <TextField
          label="First Name"
          fullWidth
          required
          value={formData.firstName}
          onChange={handleInputChange}
          name="firstName"
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          label="Last Name"
          fullWidth
          required
          value={formData.lastName}
          onChange={handleInputChange}
          name="lastName"
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          label="Email Address"
          fullWidth
          required
          value={formData.email}
          onChange={handleInputChange}
          name="email"
          type="email"
          error={Boolean(errors.email)}
          helperText={errors.email}
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          label="Password"
          fullWidth
          required
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          name="password"
          error={Boolean(errors.password)}
          helperText={errors.password}
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          label="Confirm Password"
          fullWidth
          required
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          name="confirmPassword"
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword}
          sx={{ marginBottom: '16px' }}
        />
        <Button type="submit" variant="contained" fullWidth>
          Sign Up
        </Button>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default SignUp;
