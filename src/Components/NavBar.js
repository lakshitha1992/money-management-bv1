import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TypographyModal from '@mui/material/Typography';

// Import MUI icons
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth } from './AuthContext'; // Use the useAuth hook to access the context

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const NavBar = () => {
  const { isLoggedIn, logout } = useAuth(); // Get login state from AuthContext
  const navigate = useNavigate(); // Use useNavigate hook to navigate programmatically
  const [open, setOpen] = useState(false); // State for modal visibility

  const handleSignOutClick = () => {
    setOpen(true); // Open the confirmation modal
  };

  const handleSignOutConfirm = () => {
    logout(); // Perform logout
    setOpen(false); // Close the modal
    navigate('/'); // Redirect to home page after signout
  };

  const handleSignOutCancel = () => {
    setOpen(false); // Close the modal without logging out
  };

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: '#333' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Money Management
          </Typography>

          {/* Home Button with Icon */}
          <Button color="inherit" component={Link} to="/">
            <HomeIcon style={{ marginRight: '8px' }} />
            Home
          </Button>

          {/* Only show Payments and Incomes if logged in */}
          {isLoggedIn && (
            <>
              <Button color="inherit" component={Link} to="/payments" style={{ color: 'red' }}>
                <PaymentIcon style={{ marginRight: '8px', color: 'red' }} />
                Payments
              </Button>

              <Button color="inherit" component={Link} to="/incomes" style={{ color: 'green' }}>
                <AccountBalanceWalletIcon style={{ marginRight: '8px', color: 'green' }} />
                Incomes
              </Button>
            </>
          )}

          {/* Only show Sign Out if logged in */}
          {isLoggedIn && (
            <>
              <Button color="inherit" onClick={handleSignOutClick}>
                <ExitToAppIcon style={{ marginRight: '8px' }} />
                Sign Out
              </Button>
            </>
          )}

          {/* If not logged in, show Sign Up button */}
          {!isLoggedIn && (
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Sign Out Confirmation Modal */}
      <Modal
        open={open}
        onClose={handleSignOutCancel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Do you want to sign out?
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleSignOutConfirm}
              >
                Sign Out Now
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleSignOutCancel}
              >
                No
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default NavBar;
