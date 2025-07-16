import React, { useState, useEffect } from "react";
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
import CheckIcon from "@mui/icons-material/Check";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config/api";

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
    setRegistrationStatus(null);
    setErrors({});
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|io|org|net|edu|gov)$/;

  const validateEmailFormat = (email) => {
    return emailRegex.test(email.toLowerCase()) && email.length >= 20;
  };

  const checkEmailExists = async (email) => {
    setEmailChecking(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const response = await axios.get(
        `${API_BASE_URL}/auth/validate-email?email=${email}`
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

  const validateField = (name, value) => {
    let newErrors = { ...errors };

  if (name === "uname") {
  const trimmed = value.trim();
  const noLeadingOrTrailingSpaces = value === trimmed;
  const notOnlyWhitespace = trimmed.length > 0;
  //const noInternalSpaces = !/\s/.test(value);

  if (!value) {
    newErrors.uname = "Username is required";
  } else if (!notOnlyWhitespace) {
    newErrors.uname = "Username cannot be only whitespace";
  } else if (!noLeadingOrTrailingSpaces) {
    newErrors.uname = "Username cannot start or end with spaces";
  } //else if (!noInternalSpaces) {
    //newErrors.uname = "Username cannot contain spaces";}
   //else if (value.length < 8) {
    //newErrors.uname = "Username must be at least 8 characters long";}

else {
    newErrors.uname = ""; // valid
  }
}


    if (name === "email") {
      newErrors.email = value ? "" : "Email is required";
    }

   if (name === "password") {
  const trimmed = value.trim();

  const hasLowercase = /[a-z]/.test(value);
  const hasUppercase = /[A-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecial = /[@$!%*?&]/.test(value);
  const hasMinLength = value.length >= 8;
  const noLeadingOrTrailingSpaces = value === trimmed;

  if (!value) {
    newErrors.password = "Password is required";
  } else {
    const missing = [];
    if (!hasMinLength) missing.push("at least 8 characters");
    if (!hasLowercase) missing.push("one lowercase letter");
    if (!hasUppercase) missing.push("one uppercase letter");
    if (!hasNumber) missing.push("one number");
    if (!hasSpecial) missing.push("one special character (@$!%*?&)");
    if (!noLeadingOrTrailingSpaces)
      missing.push("no leading or trailing spaces");

    if (missing.length > 0) {
      newErrors.password = `Password must contain ${missing.join(", ")}`;
    } else {
      newErrors.password = "";
    }
  }



  if (formData.confirmPassword) {
    if (formData.confirmPassword !== value) {
      newErrors.confirmPassword = "Passwords do not match";
    } else {
      newErrors.confirmPassword = "";
    }
  }

}


    if (name === "confirmPassword") {
      if (!value) {
        newErrors.confirmPassword = "Confirm Password is required";
      } else if (value !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        newErrors.confirmPassword = "";
      }
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  useEffect(() => {
    const email = formData.email;
    if (email) {
      if (validateEmailFormat(email)) {
        checkEmailExists(email);
      } else {
        setEmailValid(false);
        setErrors((prev) => ({
          ...prev,
          email: "Invalid email format or must be at least 20 characters long",
        }));
        setEmailChecking(false);
      }
    } else {
      setEmailValid(false);
      setErrors((prev) => ({
        ...prev,
        email: "Email is required",
      }));
      setEmailChecking(false);
    }
  }, [formData.email]);

  useEffect(() => {
    const isValid =
      Object.values(errors).every((err) => err === "") &&
      emailValid &&
      Object.values(formData).every((field) => field !== "");
    setIsFormValid(isValid);
  }, [errors, emailValid, formData]);

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
      const response = await axios.post(`${API_BASE_URL}/auth/register`, payload);
      if (response.status === 200) {
        setRegistrationStatus("success");
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
        setTimeout(() => navigate("/login"), 10000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setRegistrationStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const password = formData.password || "";
  const passwordChecklist = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 600, p: 5, borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Shield style={{ width: 40, height: 40, color: "#1976d2" }} />
            <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>
              User Registration
            </Typography>
          </Box>

          {registrationStatus === "success" && (
            <Alert severity="success">
              Registration successful! You will be redirected in {seconds} seconds.
            </Alert>
          )}
          {registrationStatus === "error" && (
            <Alert severity="error">Registration failed. Try again.</Alert>
          )}

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
    <Typography
      variant="caption"
      sx={{
        color: errors.email
          ? "error.main"
          : emailChecking
          ? "primary.main" // blue
          : emailValid
          ? "success.main" // green
          : "text.secondary",
      }}
    >
      {errors.email
        ? errors.email
        : emailChecking
        ? "Checking..."
        : emailValid
        ? "Email available"
        : ""}
    </Typography>
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
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mt: 1, ml: 1 }}>
                  <Typography variant="caption" color={passwordChecklist.length ? "green" : "Red"}>
                    {passwordChecklist.length ? "✓" : "•"} At least 8 characters
                  </Typography><br/>
                  <Typography variant="caption" color={passwordChecklist.lowercase ? "green" : "Red"}>
                    {passwordChecklist.lowercase ? "✓" : "•"} One lowercase letter
                  </Typography><br/>
                  <Typography variant="caption" color={passwordChecklist.uppercase ? "green" : "Red"}>
                    {passwordChecklist.uppercase ? "✓" : "•"} One uppercase letter
                  </Typography><br/>
                  <Typography variant="caption" color={passwordChecklist.number ? "green" : "Red"}>
                    {passwordChecklist.number ? "✓" : "•"} One number
                  </Typography><br/>
                  <Typography variant="caption" color={passwordChecklist.special ? "green" : "Red"}>
                    {passwordChecklist.special ? "✓" : "•"} One special character (@$!%*?&)
                  </Typography>
                </Box>
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
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading || !isFormValid || emailChecking || !emailValid}
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
