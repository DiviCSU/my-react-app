import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, useTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import axios from 'axios';

import backgroundImage from './intelligrow-high-resolution-logo.png';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [fetchedData, setFetchedData] = useState('');
  const theme = useTheme();

  const handleLogin = async () => {
    try {
      const response = await axios.get(`/api/login?username=${username}&password=${password}`);
      
      if (response.data.success) {
        onLogin(true);
      } else {
        setError('Invalid username or password');
      }

      // Debugging: Log the fetched data
      console.log('Fetched data:', response.data);

      // Set fetched data in a textbox for debugging
      setFetchedData(JSON.stringify(response.data));
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Internal server error');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Image with About Section */}
      <div style={{ flex: '1', position: 'relative', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', backgroundColor: theme.palette.mode === 'dark' ? '#424242' : 'rgba(255, 255, 255, 0.8)', maxWidth: '70%', textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            About
          </Typography>
          <Typography variant="body1">
            Welcome to IntelliGrow! Our Unit is a state-of-the-art hydroponic growing system, designed to empower enthusiasts like you to cultivate crops with precision and efficiency. Leveraging cutting-edge technology and sustainable practices, our system offers a controlled environment for year-round crop cultivation. With automated climate control, precise irrigation, and predictive plant height analysis powered by machine learning, we optimize resource utilization and ensure top-quality produce. Join us in revolutionizing home gardening and creating a greener, smarter, and more abundant future with IntelliGrow. Explore more on our webpage <a href="https://intelligrow.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>here</a>.
          </Typography>
        </div>
      </div>

      {/* Login Form */}
      <Paper elevation={3} style={{ flex: '0 0 30%', padding: '20px', backgroundColor: theme.palette.mode === 'dark' ? '#424242' : 'rgba(255, 255, 255, 0.8)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
          color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'} // Apply secondary color in dark mode
        />
        <TextField
          label="Password"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'} // Apply secondary color in dark mode
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && <Typography variant="body2" style={{ color: 'red', marginTop: '10px' }}>{error}</Typography>}
        {/* Display fetched data for debugging */}
        <TextField
          label="Fetched Data"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={fetchedData}
          disabled
          style={{ marginTop: '20px' }}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </div>
  );
};

export default Login;
