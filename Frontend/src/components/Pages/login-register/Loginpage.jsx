import React, { useState, useEffect, useCallback } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Container,
  Alert,
  InputAdornment,
} from "@mui/material";
import { Shield } from "lucide-react"; // Import Shield from lucide-react
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../../../redux/slices/authSlice';
import { API_BASE_URL } from '../../../config/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors
  
    try {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
  email,
  password
});
      if (response.status === 200) {
        const userData = response.data;
        console.log('Login successful:', userData);

        // Dispatch loginSuccess with user details
        dispatch(loginSuccess({
          username: userData.username,
          role: userData.roleName,
          email: userData.email,
          uid: userData.userId,
        }));

        // Redirect based on role
        switch (userData.roleName) {
          case 'Admin':
            navigate('/admin');
            break;
          case 'Customer':
            navigate('/customer');
            break;
          case 'Insurer':
            navigate('/insurer');
            break;
          default:
            setErrorMessage('Role not recognized. Please contact support.');
            dispatch(loginFailure('Role not recognized. Please contact support.'));
        }
      } else {
        const errorData = response.data;
        setErrorMessage(errorData.message || 'Invalid email or password.');
        dispatch(loginFailure(errorData.message || 'Invalid credentials'));
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
      setErrorMessage('Something went wrong. Please try again later.');
      dispatch(loginFailure('Something went wrong. Please try again later.'));
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
<Container
  maxWidth="sm"
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "start", // Aligns the card toward the top
    minHeight: "100vh",
    pt: 6, // Smaller top padding instead of centering
    px: 2,
  }}
>
  <Card
    sx={{
      width: "100%",
      maxWidth: 400,
      borderRadius: 2,
      p: 3,
      boxShadow: 3,
    }}
  >
    <CardContent>
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Shield style={{ width: 36, height: 36, color: "#1976d2" }} />
        <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
          Insurance Hub
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Secure your future with us
        </Typography>
      </Box>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="Email address"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errorMessage}
          helperText={errorMessage}
        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errorMessage}
          helperText={errorMessage}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={handleTogglePasswordVisibility}
                sx={{ cursor: "pointer" }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Sign In"}
        </Button>
      </form>

      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="body2">
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#1976d2", textDecoration: "none" }}>
            Register here
          </a>
        </Typography>
      </Box>
    </CardContent>
  </Card>
</Container>



  );
};

export default LoginPage;