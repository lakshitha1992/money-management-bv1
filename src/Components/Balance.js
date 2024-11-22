import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { LinkedIn, Facebook, Instagram, GitHub, Person } from '@mui/icons-material';

const Balance = () => {
  const [incomeBalance, setIncomeBalance] = useState(0); // Income balance state
  const [paymentBalance, setPaymentBalance] = useState(0); // Payment balance state
  const [totalBalance, setTotalBalance] = useState(0); // Net balance state

  // Fetch Income and Payment data
  useEffect(() => {
    // Fetch total income balance
    const fetchIncomeBalance = async () => {
      try {
        // Make sure the URL corresponds to the location of your PHP script
        const response = await axios.get('http://localhost/react/get_incomes.php'); // Adjust path to your script
        const totalIncome = response.data.reduce((acc, income) => acc + parseFloat(income.amount), 0);
        setIncomeBalance(totalIncome);
      } catch (error) {
        console.error('Error fetching income data:', error);
      }
    };

    // Fetch total payment balance
    const fetchPaymentBalance = async () => {
      try {
        // Make sure the URL corresponds to the location of your PHP script
        const response = await axios.get('http://localhost/react/get_payments.php'); // Adjust path to your script
        const totalPayment = response.data.reduce((acc, payment) => acc + parseFloat(payment.amount), 0);
        setPaymentBalance(totalPayment);
      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    };

    fetchIncomeBalance();
    fetchPaymentBalance();
  }, []);

  // Calculate net balance
  useEffect(() => {
    setTotalBalance(incomeBalance - paymentBalance);
  }, [incomeBalance, paymentBalance]);

  // Styling for the card components
  const BalanceCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    margin: theme.spacing(2),
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  }));

  // Styling for the bottom-right corner info box
  const InfoBox = styled(Box)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: theme.spacing(1),
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  }));

  // Links with icons
  const links = [
    { href: 'https://www.linkedin.com/in/lakshitha-dulanjaya?originalSubdomain=lk', icon: <LinkedIn sx={{ color: '#0A66C2' }} /> }, // LinkedIn blue
    { href: 'https://web.facebook.com/pawan.anuruddha', icon: <Facebook sx={{ color: '#1877F2' }} /> }, // Facebook blue
    { href: 'https://www.instagram.com/pawan_anuruddha/', icon: <Instagram sx={{ color: '#E1306C' }} /> }, // Instagram pink
    { href: 'https://github.com/lakshitha1992', icon: <GitHub sx={{ color: '#000000' }} /> }, // GitHub black
    { href: 'https://hemasinghe.com/lakshitha/', icon: <Person sx={{ color: '#008000' }} /> }, // Portfolio using GitHub icon
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f6f8' }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Your Current Account Balance
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Income Balance Card */}
        <Grid item xs={12} sm={6} md={4}>
          <BalanceCard>
            <CardContent>
              <Typography variant="h5" component="div" align="center" color="textSecondary">
                Your All Income Balance
              </Typography>
              <Typography variant="h4" component="div" align="center" color="primary" gutterBottom>
                ${incomeBalance.toFixed(2)}
              </Typography>
            </CardContent>
          </BalanceCard>
        </Grid>

        {/* Payment Balance Card */}
        <Grid item xs={12} sm={6} md={4}>
          <BalanceCard>
            <CardContent>
              <Typography variant="h5" component="div" align="center" color="textSecondary">
                Your All Payment Balance
              </Typography>
              <Typography variant="h4" component="div" align="center" color="secondary" gutterBottom>
                ${paymentBalance.toFixed(2)}
              </Typography>
            </CardContent>
          </BalanceCard>
        </Grid>

        {/* Net Balance Card */}
        <Grid item xs={12} sm={6} md={4}>
          <BalanceCard>
            <CardContent>
              <Typography variant="h5" component="div" align="center" color="textSecondary">
                Your Net Balance
              </Typography>
              <Typography variant="h4" component="div" align="center" color={totalBalance >= 0 ? "primary" : "error"} gutterBottom>
                ${totalBalance.toFixed(2)}
              </Typography>
            </CardContent>
          </BalanceCard>
        </Grid>
      </Grid>

      {/* Bottom-right corner info box */}
      <InfoBox>
        <Typography variant="body2" align="center" color="inherit">
          This Programme Version: Beta 1.01
        </Typography>
        <Typography variant="body2" align="center" color="inherit">
          Created by Lakshitha D.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 1 }}>
          {links.map((link, index) => (
            <a href={link.href} target="_blank" rel="noopener noreferrer" key={index} style={{ margin: '0 8px' }}>
              {link.icon}
            </a>
          ))}
        </Box>
      </InfoBox>
    </div>
  );
};

export default Balance;
