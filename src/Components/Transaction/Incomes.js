import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Incomes.css'; // Use specific styles for Incomes
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Incomes = () => {
  const today = new Date().toISOString().split('T')[0];

  const [incomeDate, setIncomeDate] = useState(today);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    fetchIncomes(); // Fetch incomes when the component mounts
  }, []);

  const fetchIncomes = async () => {
    try {
      const response = await fetch('http://localhost/react/get_incomes.php');
      if (!response.ok) {
        throw new Error('Failed to fetch incomes');
      }
      const data = await response.json();
      setIncomes(data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
      toast.error('Failed to fetch income data. Please try again later.');
    }
  };

  const handleAddIncome = async () => {
    // Basic validation to ensure the fields are not empty
    if (!description || !amount || !incomeDate) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost/react/save_income.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          income_date: incomeDate,
          description: description,
          amount: amount,
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        toast.success(result.message);
        fetchIncomes(); // Refresh income list after adding
        setDescription('');
        setAmount('');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error adding income:', error);
      toast.error('Failed to add income. Please try again later.');
    }
  };

  return (
    <div className="income-container">
      <h1>Incomes</h1>
      <p>Track all your income transactions below.</p>

      {/* Income Form */}
      <div className="form-section">
        <h2 className="form-title">Add Income Details</h2>
        <Box component="form" className="form-box" noValidate autoComplete="on">
          <TextField
            label="Income Description"
            type="text"
            variant="outlined"
            fullWidth
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-field"
          />
          <TextField
            label="Income Date"
            type="date"
            value={incomeDate}
            onChange={(e) => setIncomeDate(e.target.value)}
            fullWidth
            required
            className="text-field"
          />
          <TextField
            label="Income Amount"
            type="number"
            fullWidth
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-field"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddIncome}
            fullWidth
          >
            Add Income
          </Button>
        </Box>
      </div>

      {/* ToastContainer to display notifications */}
      <ToastContainer 
        position="top-right"
        autoClose={5000} // Automatically close toast after 5 seconds
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />

      {/* Income Table */}
      <div className="income-table">
        <h2>Income List</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="income table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incomes.map((income, idx) => (
                <TableRow key={idx}>
                  <TableCell>{income.income_date}</TableCell>
                  <TableCell>{income.description}</TableCell>
                  <TableCell align="right">{parseFloat(income.amount).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Incomes;
