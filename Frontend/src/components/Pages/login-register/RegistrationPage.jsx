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
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { Shield } from "lucide-react"; // Import Shield from lucide-react
import CheckIcon from "@mui/icons-material/Check";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [emailChecking, setEmailChecking] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
     const [seconds, setSeconds] = useState(10);

//count for redirection
     const startCountdown = () => {
      setSeconds(10);
      const interval = setInterval(() => {
          setSeconds((prevSec) => {
              if (prevSec > 1) return prevSec - 1;
              clearInterval(interval);
              retryPayment();
              return 0;
          });
      }, 1000);
  };

  const retryPayment = () => {
      setPaymentSuccess(null);
      setIsSwitchOn(false);
      setErrors({});
  };




  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|io|org|net|edu|gov)$/;

  // Validate email format
  const validateEmailFormat = (email) => {
    return emailRegex.test(email.toLowerCase()) && email.length >= 20;
  };

  // Check if email exists in the database
  const checkEmailExists = async (email) => {
    setEmailChecking(true);
    await new Promise((resolve) => setTimeout(resolve, 4000)); // Simulate a delay
    try {
      const response = await axios.get(
        `http://localhost:8251/auth/validate-email?email=${email}`
      );
      if (response.data) {
        setEmailValid(false);
        setErrors((prev) => ({
          ...prev,
          email: "Email already exists",
        }));
      } else {
        setEmailValid(true);
        setErrors((prev) => ({
          ...prev,
          email: "", // Clear error if email is valid
        }));
      }
    } catch (error) {
      console.error(error);
      setEmailValid(false);
      setErrors((prev) => ({
        ...prev,
        email: "Error checking email",
      }));
    } finally {
      setEmailChecking(false);
    }
  };

  // Validate each field
  const validateField = (name, value) => {
    let newErrors = { ...errors };

    if (name === "uname") {
      if (!value) {
        newErrors.uname = "Username is required";
      } else if (value.length < 8) {
        newErrors.uname = "Username must be at least 8 characters long";
      } else {
        newErrors.uname = ""; // Clear error if valid
      }
    }

    if (name === "email") {
      newErrors.email = value ? "" : "Email is required";
    }

    if (name === "password") {
      if (!value) {
        newErrors.password = "Password is required";
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        )
      ) {
        newErrors.password =
          "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character";
      } else {
        newErrors.password = ""; // Clear error if valid
      }
    }

    if (name === "confirmPassword") {
      if (!value) {
        newErrors.confirmPassword = "Confirm Password is required";
      } else if (value === formData.password) {
        newErrors.confirmPassword = ""; // Clear error if passwords match
      } else {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return newErrors;
  };

  // useEffect to validate fields whenever they change
  useEffect(() => {
    const { uname, email, password, confirmPassword } = formData;
    validateField("uname", uname);
    validateField("email", email);
    validateField("password", password);
    validateField("confirmPassword", confirmPassword);
  }, [formData]);

  // useEffect to check email existence when email changes
  useEffect(() => {
    const email = formData.email;
    if (email) {
      if (validateEmailFormat(email)) {
        checkEmailExists(email); // Call API only if email format is valid
      } else {
        setEmailValid(false);
        setErrors((prev) => ({
          ...prev,
          email: "Invalid email format or must be at least 20 characters long",
        }));
        setEmailChecking(false); // Stop checking if email is invalid
      }
    } else {
      setEmailValid(false);
      setErrors((prev) => ({
        ...prev,
        email: "Email is required",
      }));
      setEmailChecking(false); // Stop checking if email is empty
    }
  }, [formData.email]);

  // useEffect to determine if the form is valid
  useEffect(() => {
    const isValid = Object.values(errors).every((err) => err === "") && 
                    emailValid && 
                    Object.values(formData).every((field) => field !== ""); // Ensure all fields are filled
    setIsFormValid(isValid);
  }, [errors, emailValid, formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isFormValid) {
      setLoading(false);
      return;
    }

    const payload = {
      username: formData.uname,
      password: formData.password,
      email: formData.email,
      role: { roleName: "Customer" },
    };

    try {
      const response = await axios.post(
        "http://localhost:8251/auth/register",
        payload
      );
      if (response.status === 200) {
        setRegistrationStatus("success");
        console.log("registration sucessfully ")
        setFormData({
          uname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});
        setEmailValid(false);
        setIsFormValid(false);
        startCountdown();
        setTimeout(() => navigate('/login'), 10000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setRegistrationStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 600, p: 5, borderRadius: 3 }}>
        <CardContent>
         <Box sx={{ textAlign: "center", mb: 4, fontFamily: "Segoe UI" }}>
                     <Shield sx={{ width: 40, height: 40, color: "primary.main" }} />
                     <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold", fontFamily: "Segoe UI" }}>
                       User Registration 
                     </Typography>
                   </Box>

                   {registrationStatus === "success" && (
            <Alert severity="success">
              Registration successful!
              <Typography variant="h6" sx={{ fontFamily: "Segoe UI" }}>
                You will be redirected to the login page in {seconds} seconds.
              </Typography>
            </Alert>
          )}
          {registrationStatus === "error" && (
            <Alert severity="error">Registration failed. Try again.</Alert>
          )}
<br/>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="uname"
                  value={formData.uname}
                  onChange={handleChange}
                  error={!!errors.uname}
                  helperText={errors.uname}
                  sx={{ "& .MuiFormHelperText-root": { color: "red" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={
                    errors.email ||
                    (emailChecking ? "Checking..." : emailValid ? "Email available" : "")
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {emailChecking ? (
                          <CircularProgress size={20} />
                        ) : emailValid ? (
                          <CheckIcon color="success" />
                        ) : null}
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiFormHelperText-root": { color: errors.email ? "red" : emailValid ? "green" : "black" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </InputAdornment>
                    ),
                  }}
                  sx={{ "& .MuiFormHelperText-root": { color: "red" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                disabled={loading || !isFormValid || emailChecking || !emailValid} // Disable if loading, form is invalid, email is being checked, or email is not valid
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};


export default RegistrationPage;