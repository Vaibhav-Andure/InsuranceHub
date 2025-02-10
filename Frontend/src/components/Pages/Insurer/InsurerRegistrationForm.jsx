


import React, { useState, useRef, useEffect } from "react";
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
import { Shield } from "lucide-react";
import CheckIcon from '@mui/icons-material/Check';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';

const InsurerRegistrationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    insurerName: "",
    licenseNumber: "",
    address: "",
    username: "",
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    insurerName: "",
    licenseNumber: "",
    address: "",
    username: "",
    password: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [licenseNumberValid, setLicenseNumberValid] = useState(false);
  const [licenseNumberChecking, setLicenseNumberChecking] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [emailChecking, setEmailChecking] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const validateLicenseNumber = async (licenseNumber) => {
    setLicenseNumberChecking(true);
    console.log("License Number:", licenseNumber);
    const sanitizedLicenseNumber = encodeURIComponent(licenseNumber);
    try {

   
      const response = await axios.get(`http://localhost:8251/insurance/license/check-license-number?licenseNumber=${sanitizedLicenseNumber}`);
      
    
      if (response.data) {
        setLicenseNumberValid(true);
        setErrors((prev) => ({
          ...prev,
          licenseNumber: "",
        }));
      } else {
        setLicenseNumberValid(false);
        setErrors((prev) => ({
          ...prev,
          licenseNumber: "Invalid license number",
        }));
      }
    } catch (error) {
      console.error(error);
      setLicenseNumberValid(false);
      setErrors((prev) => ({
        ...prev,
        licenseNumber: "Error checking license number",
      }));
    } finally {
      setLicenseNumberChecking(false);
    }
  };

  const validateEmail = async (email) => {
    setEmailChecking(true);
    try {
      const response = await axios.get(`http://localhost:8251/auth/validate-email?email=${email}`);
      console.log("api hit for email validation ")
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
          email: "",
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

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (formData.insurerName === "") {
      newErrors.insurerName = "Insurer name is required";
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.insurerName)) {
      newErrors.insurerName = "Insurer name should only contain letters and spaces";
      isValid = false;
    } else {
      newErrors.insurerName = "";
    }

    if (formData.licenseNumber === "") {
      newErrors.licenseNumber = "License number is required";
      isValid = false;
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.licenseNumber)) {
      newErrors.licenseNumber = "License number should only contain alphanumeric characters";
      isValid = false;
    } else {
      newErrors.licenseNumber = "";
    }

    if (formData.address === "") {
      newErrors.address = "Address is required";
      isValid = false;
    } else {
      newErrors.address = "";
    }

    if (formData.username === "") {
      newErrors.username = "Username is required";
      isValid = false;
    } else {
      newErrors.username = "";
    }

    if (formData.password === "") {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      newErrors.password = "Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    if (formData.email === "") {
        newErrors.email = "Email is required. Please enter a valid email address.";
        isValid = false;
      } else if (!/^[a-zA-Z._%+-]+@[a-zA-Z.-]+\.(com|in|io|org|net|edu|gov)$/.test(formData.email.toLowerCase())|| formData.email.length > 30 ) {
        newErrors.email = "Invalid email address. Please ensure that your email address is in the correct format (e.g. a@b.com) and that the domain is one of the following: .com, .in, .io, .org, .net, .edu, .gov.";
        isValid = false;
      }else {
        newErrors.email = "";
      }

    
    setErrors(newErrors);
    setIsFormValid(isValid);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));


    validateForm();
    // Clear the previous timeout if it exists
    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    // Set a new timeout for debouncing
    const id = setTimeout(() => {
        if (name === "licenseNumber") {
            validateLicenseNumber(value);
        } else if (name === "email" && isFormValid) {
            validateEmail(value);
        }

      
    }, 500); // Adjust the timeout duration as needed (500 ms in this case)

    // Store the timeout ID so it can be cleared on the next change
    setTimeoutId(id);
};

// Clear the timeout when the component unmounts
useEffect(() => {
    return () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    };
}, [timeoutId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isFormValid) {
      setLoading(false);
      return;
    }

    const payload = {
      insurerName: formData.insurerName,
      licenseNumber: formData.licenseNumber,
      address: formData.address,
      user: {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        role: {
          roleName: "Insurer"
        }
      }
    };


    axios.post('http://localhost:8251/insurance/insurers/registerinsurer', payload)
    .then((response) => {
      console.log(response);
      setLoading(false);
      // You can also add a success message or redirect to another page here
      setRegistrationStatus("success")


      setFormData({
        insurerName: "",
        licenseNumber: "",
        address: "",
        username: "",
        password: "",
        email: "",
      });
      setErrors({
        insurerName: "",
        licenseNumber: "",
        address: "",
        username: "",
        password: "",
        email: "",
      });
      setIsFormValid(false);
      setLicenseNumberValid(false);
      setEmailValid(false);



      
    })
    .catch((error) => {
      console.error(error);
      console.log("error during insurer registration")
      setLoading(false);
      setRegistrationStatus("error")



      setFormData({
        insurerName: "",
        licenseNumber: "",
        address: "",
        username: "",
        password: "",
        email: "",
      });
      setErrors({
        insurerName: "",
        licenseNumber: "",
        address: "",
        username: "",
        password: "",
        email: "",
      });
      setIsFormValid(false);
      setLicenseNumberValid(false);
      setEmailValid(false);

      // You can also add an error message here
    });

    console.log("Registration payload:", payload);

    setLoading(false);
  };

  return (
    <Container maxWidth="lg" sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "Segoe UI" }}>
      <Card sx={{ width: "100%", maxWidth: 800, p: 5, borderRadius: 3, boxShadow: 3, fontFamily: "Segoe UI", maxHeight: "90vh", overflowY: "auto" }}>
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 4, fontFamily: "Segoe UI" }}>
            <Shield sx={{ width: 40, height: 40, color: "primary.main" }} />
            <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold", fontFamily: "Segoe UI" }}>
              Insurer Registration Form
            </Typography>
          </Box>
          <Container>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="10vh">
        {registrationStatus === "success" && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Registration successful!
          </Alert>
        )}
        {registrationStatus === "error" && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Registration failed. Please try again.
          </Alert>
        )}
      </Box>
    </Container>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Insurer Name"
                  name="insurerName"
                  value={formData.insurerName}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{ fontFamily: "Segoe UI" }}
                  error={errors.insurerName !== ""}
                  helperText={errors.insurerName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon />
                      </InputAdornment>
                    ),
                  }}
                
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="License Number"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                
                  margin="normal"
                  required
                  sx={{ fontFamily: "Segoe UI" }}
                  error={errors.licenseNumber !== ""}
                  helperText={errors.licenseNumber}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {licenseNumberChecking ? (
                          <CircularProgress size={20} />
                        ) : licenseNumberValid ? (
                          <CheckIcon color="success" />
                        ) : (
                          <></>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{ fontFamily: "Segoe UI" }}
                  error={errors.address !== ""}
                  helperText={errors.address}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{ fontFamily: "Segoe UI" }}
                  error={errors.username !== ""}
                  helperText={errors.username}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{ fontFamily: "Segoe UI" }}
                  error={errors.password !== ""}
                  helperText={errors.password} 

                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                

                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{ fontFamily: "Segoe UI" }}
                  error={errors.email !== ""}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {emailChecking ? (
                          <CircularProgress size={20} />
                        ) : emailValid ? (
                          <CheckIcon color="success" />
                        ) : (
                          <></>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disableElevation
                color="primary"
                disabled={loading || !isFormValid || !emailValid || !licenseNumberValid }
                sx={{ fontFamily: "Segoe UI" }}
              >
                {loading ? "Registering..." : "Register"}
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="primary"
                onClick={onClose}
                sx={{ fontFamily: "Segoe UI", ml: 2 }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default InsurerRegistrationForm;