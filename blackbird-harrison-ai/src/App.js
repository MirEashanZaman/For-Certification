import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { validateForm } from './validation';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const result = validateForm(email, password);
    setEmailError(result.emailError);
    setPasswordError(result.passwordError);

    if (result.isValid) {
      setOpenSnackbar(true);
    } else {
      setOpenSnackbar(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className="App">
      <Box component="form" onSubmit={handleSubmit} noValidate className="form-card">
        <Typography variant="h5" component="h1" gutterBottom fontWeight={600}>
          Sign In
        </Typography>

        <TextField
          id="email"
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError('');
          }}
          error={Boolean(emailError)}
          helperText={emailError}
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError('');
          }}
          error={Boolean(passwordError)}
          helperText={passwordError}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Validation passed! Form submitted successfully.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
