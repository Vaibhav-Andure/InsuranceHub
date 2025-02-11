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
      const response = await axios.post('http://localhost:8251/auth/login', {
        email: email,
        password: password
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
      maxWidth="lg"
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        topmargin:"30vh"
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 600, p: 5, borderRadius: 3, fontFamily: "Segoe UI" , minHeight:"70vh"}}>
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Shield sx={{ width: 40, height: 40, color: "primary.main" }} />
            <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>
              Insurance Hub
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Secure your future with us
            </Typography>
          </Box>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <form onSubmit={handleLogin}>
        
          <br/>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errorMessage}
                  helperText={errorMessage}
                  sx={{ "& .MuiFormHelperText-root": { color: "red" } }}
                />
              </Grid>
              <br/>
              <br/>
              <br/>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errorMessage}
                  helperText={errorMessage}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiFormHelperText-root": { color: "red" } }}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Sign In"}
              </Button>
            </Box>
          </form>

          <div sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Don't have an account?{' '} 
              <a href="/register" sx={{ color: "primary.main" }}>
                Register here
              </a>
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;