import React, { useState } from "react";
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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Shield } from "lucide-react";
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ClaimFilingForm = () => {
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    userId: "",
    claimAmount: "",
    incidentDescription: "",
    incidentDate: null,
  });

  const [errors, setErrors] = useState({
    userId: "",
    claimAmount: "",
    incidentDescription: "",
    incidentDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [filingStatus, setFilingStatus] = useState(null);
  const [filingMessage, setFilingMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (formData.claimAmount === "") {
      newErrors.claimAmount = "Claim amount is required";
      isValid = false;
    } else {
      newErrors.claimAmount = "";
    }

    if (formData.incidentDate === null) {
      newErrors.incidentDate = "Incident date is required";
      isValid = false;
    } else {
      const incidentDate = new Date(formData.incidentDate);
      const today = new Date();
      
      // Set the time to the start of the day for accurate comparison
      today.setHours(0, 0, 0, 0);
      incidentDate.setHours(0, 0, 0, 0);
      
      // Check if the incident date is in the future
      if (incidentDate > today) {
        newErrors.incidentDate = "Incident date should not be in the future";
        isValid = false;
      } else {
        // Calculate the date one month ago
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);
        
        // Check if the incident date is more than one month old
        if (incidentDate < oneMonthAgo) {
          newErrors.incidentDate = "Incident date should not be more than one month old";
          isValid = false;
        } else {
          newErrors.incidentDate = "";
        }
      }
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
  };

  const handleDateChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      incidentDate: e.target.value,
    }));

    validateForm();
  };

  const handleTermsChange = (e) => {
    setAgreedToTerms(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm() || !agreedToTerms) {
      setLoading(false);
      return;
    }

    const payload = {
      userId: user?.uid,
      claimAmount: parseFloat(formData.claimAmount),
      incidentDescription: formData.incidentDescription,
      incidentDate: formData.incidentDate,
    };

    axios.post('http://localhost:8251/insurance/claims/claimpolicy', payload)
      .then((response) => {
        console.log(response);
        setLoading(false);
        setFilingStatus("success");
        setFilingMessage(response.data.message); // Get message from response
        setFormData({
          claimAmount: "",
          incidentDescription: "",
          incidentDate: null,
        });
        setErrors({
          claimAmount: "",
          incidentDescription: "",
          incidentDate: "",
        });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setFilingStatus("error");
        // Check if error response has a message
        const errorMessage = error.response?.data?.message || "Claim filing failed. Please try again.";
        setFilingMessage(errorMessage); // Set error message from response
      });
  };

  return (
    <Container maxWidth="lg" sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card sx={{ width: "100%", maxWidth: 800, p: 5, borderRadius: 3, boxShadow: 3, maxHeight: "90vh", overflowY: "auto" }}>
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Shield sx={{ width: 40, height: 40, color: "primary.main" }} />
            <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>
              Claim Filing Form
            </Typography>
          </Box>
          <Container>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="10vh">
              {filingMessage && (
                <Alert severity={filingStatus === "success" ? "success" : "error"} sx={{ mb: 2 }}>
                  {filingMessage}
                </Alert>
              )}
            </Box>
          </Container>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Claim Amount"
                  name="claimAmount"
                  type="number"
                  value={formData.claimAmount}
                  onChange={handleChange}
                  margin="normal"
                  required
                  error={errors.claimAmount !== ""}
                  helperText={errors.claimAmount}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    inputProps: {
                      min: 0, // Minimum value
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Incident Description"
                  name="incidentDescription"
                  value={formData.incidentDescription}
                  onChange={handleChange}
                  margin="normal"
                  required
                  error={errors.incidentDescription !== ""}
                  helperText={errors.incidentDescription}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Incident Date"
                  type="date"
                  value={formData.incidentDate}
                  onChange={handleDateChange}
                  margin="normal"
                  required
                  error={errors.incidentDate !== ""}
                  helperText={errors.incidentDate}
                  InputLabelProps={{

                    shrink: true // Shrink the label if there is a value
                
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreedToTerms}
                      onChange={handleTermsChange}
                      color="primary"
                    />
                  }
                  label="I agree to the Terms and Conditions of filing a claim"
                />
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disableElevation
                color="primary"
                disabled={loading || !isFormValid || !agreedToTerms || formData.incidentDate === null}
              >
                {loading ? "Filing..." : "File Claim"}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ClaimFilingForm;