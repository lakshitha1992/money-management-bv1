import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Payments.css';

const Payments = () => {
  const today = new Date().toISOString().split('T')[0];

  // State variables
  const [paymentDate, setPaymentDate] = useState(today);
  const [paymentDescription, setPaymentDescription] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch payments from the server
  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost/react/get_payments.php');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setPayments(data);
        } else {
          toast.error('Failed to fetch payments. Please try again later.');
        }
      } else {
        toast.error('Failed to fetch payments. Please try again later.');
      }
    } catch (error) {
      toast.error('Error fetching payments. Please check your connection.');
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add payment to the server and update the list
  const handleAddPayment = async () => {
    if (!paymentDescription.trim() || !paymentAmount) {
      toast.error('Please fill in all fields!');
      return;
    }

    if (paymentAmount <= 0) {
      toast.error('Amount must be greater than zero.');
      return;
    }

    if (new Date(paymentDate) > new Date()) {
      toast.error('Payment date cannot be in the future.');
      return;
    }

    const newPayment = {
      date: paymentDate,
      description: paymentDescription.trim(),
      amount: parseFloat(paymentAmount),
    };

    try {
      const response = await fetch('http://localhost/react/save_payment.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPayment),
      });

      if (response.ok) {
        toast.success('Payment added successfully!');
        fetchPayments(); // Refresh payments after successful addition
        setPaymentDescription('');
        setPaymentAmount('');
      } else {
        const result = await response.json();
        toast.error(result.error || 'Failed to save payment. Please try again.');
      }
    } catch (error) {
      console.error('Error saving payment:', error);
      toast.error('An error occurred while saving payment.');
    }
  };

  // Fetch payments when the component loads
  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="payment-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Payments</h1>
      <p>Manage all your payment transactions here.</p>

      {/* Payment Form */}
      <div className="form-section">
        <h2 className="form-title">Add Payment Details</h2>
        <Box component="form" className="form-box" noValidate autoComplete="on">
          <TextField
            id="outlined-payment-description"
            label="Payment Description"
            type="text"
            variant="outlined"
            fullWidth
            value={paymentDescription}
            onChange={(e) => setPaymentDescription(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            id="outlined-date"
            label="Payment Date"
            type="date"
            variant="outlined"
            fullWidth
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            id="outlined-payment-amount"
            label="Amount"
            type="number"
            variant="outlined"
            fullWidth
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            required
            margin="normal"
          />
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleAddPayment}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Add Payment'}
          </Button>
        </Box>
      </div>

      {/* Payments Table */}
      <div className="payments-table">
        <h2>Payments List</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="payments table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right" style={{ fontWeight: 'bold' }}>
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Loading payments...
                  </TableCell>
                </TableRow>
              ) : payments.length > 0 ? (
                payments.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.description}</TableCell>
                    <TableCell align="right">
                      {payment.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No payments found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Payments;
