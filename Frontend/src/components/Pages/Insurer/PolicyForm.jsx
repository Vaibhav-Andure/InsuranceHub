// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   Container,
//   Alert,
//   InputAdornment,
//   Checkbox,
//   FormControlLabel,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import { Shield } from "lucide-react";
// import LockIcon from '@mui/icons-material/Lock';
// import BusinessIcon from '@mui/icons-material/Business';
// import axios from 'axios';
// import { useSelector } from 'react-redux';


// const PolicyRegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     policyName: "",
//     policyNumber: "",
//     premiumAmount: "",
//     coverageAmount: "",
//     coverageType: "Individual", // Default value for coverage type
//     benefits: "",
//     exclusions: "",
//     waitingPeriod: "",
//     renewalTerms: "",
//     claimProcess: "",
//     coPayment: "",
//     policyTerms: "",
//   });

//   const [errors, setErrors] = useState({
//     policyName: "",
//     policyNumber: "",
//     premiumAmount: "",
//     coverageAmount: "",
//     coverageType: "",
//     benefits: "",
//     exclusions: "",
//     waitingPeriod: "",
//     renewalTerms: "",
//     claimProcess: "",
//     coPayment: "",
//     policyTerms: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [registrationStatus, setRegistrationStatus] = useState(null);
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [agreedToTerms, setAgreedToTerms] = useState(false); // New state for terms agreement
  
  

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = { ...errors };

//     if (formData.policyName === "") {
//       newErrors.policyName = "Policy name is required";
//       isValid = false;
//     } else {
//       newErrors.policyName = "";
//     }

//     if (formData.policyNumber === "") {
//       newErrors.policyNumber = "Policy number is required";
//       isValid = false;
//     } else {
//       newErrors.policyNumber = "";
//     }

//     if (formData.premiumAmount === "") {
//       newErrors.premiumAmount = "Premium amount is required";
//       isValid = false;
//     } else {
//       newErrors.premiumAmount = "";
//     }

//     if (formData.coverageAmount === "") {
//       newErrors.coverageAmount = "Coverage amount is required";
//       isValid = false;
//     } else {
//       newErrors.coverageAmount = "";
//     }

//     if (formData.coverageType === "") {
//       newErrors.coverageType = "Coverage type is required";
//       isValid = false;
//     } else {
//       newErrors.coverageType = "";
//     }

//     if (formData.benefits === "") {
//       newErrors.benefits = "Benefits are required";
//       isValid = false;
//     } else {
//       newErrors.benefits = "";
//     }

//     if (formData.exclusions === "") {
//       newErrors.exclusions = "Exclusions are required";
//       isValid = false;
//     } else {
//       newErrors.exclusions = "";
//     }

//     if (formData.waitingPeriod === "") {
//       newErrors.waitingPeriod = "Waiting period is required";
//       isValid = false;
//     } else {
//       newErrors.waitingPeriod = "";
//     }

//     if (formData.renewalTerms === "") {
//       newErrors.renewalTerms = "Renewal terms are required";
//       isValid = false;
//     } else {
//       newErrors.renewalTerms = "";
//     }

//     if (formData.claimProcess === "") {
//       newErrors.claimProcess = "Claim process is required";
//       isValid = false;
//     } else {
//       newErrors.claimProcess = "";
//     }

//     if (formData.coPayment === "") {
//       newErrors.coPayment = "Co-payment is required";
//       isValid = false;
//     } else {
//       newErrors.coPayment = "";
//     }

//     if (formData.policyTerms === "") {
//       newErrors.policyTerms = "Policy terms are required";
//       isValid = false;
//     } else {
//       newErrors.policyTerms = "";
//     }

//     setErrors(newErrors);
//     setIsFormValid(isValid);
//     return isValid;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     validateForm();
//   };

//   const handleTermsChange = (e) => {
//     setAgreedToTerms(e.target.checked);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!validateForm() || !agreedToTerms) { // Check if terms are agreed
//       setLoading(false);
//       return;
//     }
//     const payload = {
//         policyName: formData.policyName,
//         policyNumber: formData.policyNumber,
//         premiumAmount: formData.premiumAmount,
//         coverageAmount: formData.coverageAmount,
//         coverageType: formData.coverageType,
//         benefits: formData.benefits,
//         exclusions: formData.exclusions,
//         waitingPeriod: formData.waitingPeriod,
//         renewalTerms: formData.renewalTerms,
//         claimProcess: formData.claimProcess,
//         coPayment: formData.coPayment,
//         policyTerms: formData.policyTerms,
//         insurer: { // Add insurer object
//           user: { // Add user object
//             userId: 32 // Set userId to 1
//           }
//         }
//       };
//     axios.post('http://localhost:5555/api/policies/createpolicy', payload)
//       .then((response) => {
//         console.log(response);
//         setLoading(false);
//         setRegistrationStatus("success");
//         setFormData({
//           policyName: "",
//           policyNumber: "",
//           premiumAmount: "",
//           coverageAmount: "",
//           coverageType: "Individual", // Reset to default value
//           benefits: "",
//           exclusions: "",
//           waitingPeriod: "",
//           renewalTerms: "",
//           claimProcess: "",
//           coPayment: "",
//           policyTerms: "",
//         });
//         setErrors({
//           policyName: "",
//           policyNumber: "",
//           premiumAmount: "",
//           coverageAmount: "",
//           coverageType: "",
//           benefits: "",
//           exclusions: "",
//           waitingPeriod: "",
//           renewalTerms: "",
//           claimProcess: "",
//           coPayment: "",
//           policyTerms: "",
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//         setLoading(false);
//         setRegistrationStatus("error");
//       });
//   };

//   return (
//     <Container maxWidth="lg" sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "Segoe UI" }}>
//       <Card sx={{ width: "100%", maxWidth: 800, p: 5, borderRadius: 3, boxShadow: 3, fontFamily: "Segoe UI", maxHeight: "90vh", overflowY: "auto" }}>
//         <CardContent>
//           <Box sx={{ textAlign: "center", mb: 4, fontFamily: "Segoe UI" }}>
//             <Shield sx={{ width: 40, height: 40, color: "primary.main" }} />
//             <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold", fontFamily: "Segoe UI" }}>
//               Policy Registration Form
//             </Typography>
//           </Box>
//           <Container>
//             <Box display="flex" justifyContent="center" alignItems="center" minHeight="10vh">
//               {registrationStatus === "success" && (
//                 <Alert severity="success" sx={{ mb: 2 }}>
//                   Registration successful!
//                 </Alert>
//               )}
//               {registrationStatus === "error" && (
//                 <Alert severity="error" sx={{ mb: 2 }}>
//                   Registration failed. Please try again.
//                 </Alert>
//               )}
//             </Box>
//           </Container>

//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Policy Name"
//                   name="policyName"
//                   value={formData.policyName}
//                   onChange={handleChange}
//                   margin="normal"
//                   required
//                   sx={{ fontFamily: "Segoe UI" }}
//                   error={errors.policyName !== ""}
//                   helperText={errors.policyName}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <BusinessIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Policy Number"
//                   name="policyNumber"
//                   value={formData.policyNumber}
//                   onChange={handleChange}
//                   margin="normal"
//                   required
//                   sx={{ fontFamily: "Segoe UI" }}
//                   error={errors.policyNumber !== ""}
//                   helperText={errors.policyNumber}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Premium Amount"
//                   name="premiumAmount"
//                   type="number"
//                   value={formData.premiumAmount}
//                   onChange={handleChange}
//                   margin="normal"
//                   required
//                   sx={{ fontFamily: "Segoe UI" }}
//                   error={errors.premiumAmount !== ""}
//                   helperText={errors.premiumAmount}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockIcon />
//                       </InputAdornment>
//                     ),
//                     inputProps: {
//                       min: 0, // Minimum value
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Coverage Amount"
//                   name="coverageAmount"
//                   type="number"
//                   value={formData.coverageAmount}
//                   onChange={handleChange}
//                   margin="normal"
//                   required
//                   sx={{ fontFamily: "Segoe UI" }}
//                   error={errors.coverageAmount !== ""}
//                   helperText={errors.coverageAmount}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockIcon />
//                       </InputAdornment>
//                     ),
//                     inputProps: {
//                       min: 0, // Minimum value
//                     },
//                   }}
//                 />
//               </Grid>
            



//               <Grid item xs={12} md={6}>
//   <FormControl fullWidth margin="normal" required>
//     <InputLabel id="coverage-type-label">Coverage Type</InputLabel>
//     <br/>
//     <Select
//       labelId="coverage-type-label" // Link the label to the select
//       name="coverageType"
//       value={formData.coverageType}
//       onChange={handleChange}
//       sx={{ fontFamily: "Segoe UI" }}
//     >
//       <MenuItem value="Individual">Individual</MenuItem>
//       <MenuItem value="Family">Family</MenuItem>
//       <MenuItem value="Group">Group</MenuItem>
//     </Select>
//   </FormControl>
// </Grid>








//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Benefits"
//                   name="benefits"
//                   value={formData.benefits}
//                   onChange={handleChange}
//                   margin="normal"
//                   required
//                   sx={{ fontFamily: "Segoe UI" }}
//                   error={errors.benefits !== ""}
//                   helperText={errors.benefits}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                   multiline
//                   rows={4}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Exclusions"
//                   name="exclusions"
//                   value={formData.exclusions}
//                   onChange={handleChange}
//                   margin="normal"
//                   required
//                   sx={{ fontFamily: "Segoe UI" }}
//                   error={errors.exclusions !== ""}
//                   helperText={errors.exclusions}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                   multiline
//                   rows={4}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Waiting Period (days)"
//                   name="waitingPeriod"
//                   type="number"
//                   value={formData.waitingPeriod}
//                   onChange={handleChange}
//                   margin="normal"
//                   required
//                   sx={{ fontFamily: "Segoe UI" }}
//                   error={errors.waitingPeriod !== ""}
//                   helperText={errors.waitingPeriod}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockIcon />
//                       </InputAdornment>
//                     ),
//                     inputProps: {
//                       min: 0, // Minimum value
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//   <TextField
//     fullWidth
//     label="Renewal Terms"
//     name="renewalTerms"
//     value={formData.renewalTerms}
//     onChange={handleChange}
//     margin="normal"
//     required
//     sx={{ fontFamily: "Segoe UI" }}
//     error={errors.renewalTerms !== ""}
//     helperText={errors.renewalTerms}
//     InputProps={{
//       startAdornment: (
//         <InputAdornment position="start">
//           <LockIcon />
//         </InputAdornment>
//       ),
//     }}
//     multiline // Enable multiline
//     rows={4} // Set the number of visible rows
//   />
// </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Claim Process"
//                   name="claimProcess"
//                   value={formData.claimProcess}
//                   onChange={handleChange}
//                   margin="normal"
//                   required
//                   sx={{ fontFamily: "Segoe UI" }}
//                   error={errors.claimProcess !== ""}
//                   helperText={errors.claimProcess}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Co-Payment"
//                   name="coPayment"
//                   type="number"
//                   value={formData.coPayment}
//                   onChange={handleChange}
//                   margin="normal"
//                   required
//                   sx={{ fontFamily: "Segoe UI" }}
//                   error={errors.coPayment !== ""}
//                   helperText={errors.coPayment}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockIcon />
//                       </InputAdornment>
//                     ),
//                     inputProps: {
//                       min: 0, // Minimum value
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Policy Terms"
//                   name="policyTerms"
//                   value={formData.policyTerms}
//                   onChange={handleChange}
//                   margin="normal"
//                   required
//                   sx={{ fontFamily: "Segoe UI" }}
//                   error={errors.policyTerms !== ""}
//                   helperText={errors.policyTerms}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                   multiline
//                   rows={4} // Make it a text area
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={agreedToTerms}
//                       onChange={handleTermsChange}
//                       color="primary"
//                     />
//                   }
//                   label="I agree to the Terms and Conditions InsuranceHub platform "
//                 />
//               </Grid>
//             </Grid>

//             <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 disableElevation
//                 color="primary"
//                 disabled={loading || !isFormValid || !agreedToTerms} // Disable button if loading, form is invalid, or terms are not agreed
//                 sx={{ fontFamily: "Segoe UI" }}
//               >
//                 {loading ? "Registering..." : "Register"}
//               </Button>
//             </Box>
//           </form>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default PolicyRegistrationForm;



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
  InputAdornment,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Shield } from "lucide-react";
import LockIcon from '@mui/icons-material/Lock';
import BusinessIcon from '@mui/icons-material/Business';
import axios from 'axios';
import { useSelector } from 'react-redux';

const PolicyRegistrationForm = () => {
  const user = useSelector((state) => state.auth.user); // Get user from Redux
  const [insurerId, setInsurerId] = useState(null); // State for insurer ID
  const [formData, setFormData] = useState({
    policyName: "",
    policyNumber: "",
    premiumAmount: "",
    coverageAmount: "",
    coverageType: "Individual", // Default value for coverage type
    benefits: "",
    exclusions: "",
    waitingPeriod: "",
    renewalTerms: "",
    claimProcess: "",
    coPayment: "",
    policyTerms: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false); // New state for terms agreement

  // Fetch insurer details based on logged-in user
  const fetchUserDetails = async () => { 
    if (!user || !user.uid) {
      console.error('User  ID is undefined');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8251/insurance/insurers/by-user/${user.uid}`);
      console.log('API Response:', response.data); // Log the response data
      if (response.data && response.data.insurerId) {
        setInsurerId(response.data.insurerId);
      } else {
        console.error('Insurer ID not found in response');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails(); // Fetch user details on component mount
  }, [user]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate each field
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "") {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
        isValid = false;
      }
    });

    setErrors(newErrors);
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

  const handleTermsChange = (e) => {
    setAgreedToTerms(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm() || !agreedToTerms) {
      setLoading(false);
      return;
    }

    const payload = {
      ...formData,
      insurer: { 
        user: { 
          userId: user.uid // Ensure this is a valid user ID
        }
      }
    };

    console.log('Payload:', payload); // Log the payload

    try {
      const response = await axios.post('http://localhost:8251/insurance/policies/createpolicy', payload);
      console.log('Response:', response.data); // Log the response data
      setLoading(false);
      setRegistrationStatus("success");
      setFormData({
        policyName: "",
        policyNumber: "",
        premiumAmount: "",
        coverageAmount: "",
        coverageType: "Individual", // Reset to default value
        benefits: "",
        exclusions: "",
        waitingPeriod: "",
        renewalTerms: "",
        claimProcess: "",
        coPayment: "",
        policyTerms: "",
      });
      setErrors({});
    } catch (error) {
      console.error('Error:', error); // Log any errors
      setLoading(false);
      setRegistrationStatus("error");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "Segoe UI" }}>
      <Card sx={{ width: "100%", maxWidth: 800, p: 5, borderRadius: 3, boxShadow: 3, fontFamily: "Segoe UI", maxHeight: "90vh", overflowY: "auto" }}>
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 4, fontFamily: "Segoe UI" }}>
            <Shield sx={{ width: 40, height: 40, color: "primary.main" }} />
            <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold", fontFamily: "Segoe UI" }}>
              Policy Registration Form
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
                  label="Policy Name"
                  name="policyName"
                  value={formData.policyName}
                  onChange={handleChange}
                  margin="normal"
                  required
                  error={!!errors.policyName}
                  helperText={errors.policyName}
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
                  label="Policy Number"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleChange}
                  margin="normal"
                  required
                  error={!!errors.policyNumber}
                  helperText={errors.policyNumber}
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
                  label="Premium Amount"
                  name="premiumAmount"
                  type="number"
                  value={formData.premiumAmount}
                  onChange={handleChange}
                  margin="normal"
                  required
                  error={!!errors.premiumAmount}
                  helperText={errors.premiumAmount}
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
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Coverage Amount"
                  name="coverageAmount"
                  type="number"
                  value={formData.coverageAmount}
                  onChange={handleChange}
                  margin="normal"
                  required
                  error={!!errors.coverageAmount}
                  helperText={errors.coverageAmount}
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
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel id="coverage-type-label">Coverage Type</InputLabel>
                  <Select
                    labelId="coverage-type-label"
                    name="coverageType"
                    value={formData.coverageType}
                    onChange={handleChange}
                  >
                    <MenuItem value="Individual">Individual</MenuItem>
                    <MenuItem value="Family">Family</MenuItem>
                    <MenuItem value="Group">Group</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Benefits"
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleChange}
                  margin="normal"
                  required
                  error={!!errors.benefits}
                  helperText={errors.benefits}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Exclusions"
                  name="exclusions"
                  value={formData.exclusions}
                  onChange={handleChange}
                  margin="normal"
                  required
                  error={!!errors.exclusions}
                  helperText={errors.exclusions}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Waiting Period (days)"
                  name="waitingPeriod"
                  type="number"
                  value={formData.waitingPeriod}
                  onChange={handleChange}
                  margin="normal"
                  required
                  error={!!errors.waitingPeriod}
                  helperText={errors.waitingPeriod}
                  inputProps={{
                    min: 0, // Minimum value
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Renewal Terms"
                  name="renewalTerms"
                  value={formData.renewalTerms}
                  onChange={handleChange}
                  margin="normal"
                  required
                  error={!!errors.renewalTerms}
                  helperText={errors.renewalTerms}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Claim Process"
                  name="claimProcess"
                  value={formData.claimProcess}
                  onChange={handleChange}
                  margin="normal"
                  required
                  error={!!errors.claimProcess}
                  helperText={errors.claimProcess}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Co-Payment"
                  name="coPayment"
                  type="number"
                  value={formData.coPayment}
                  onChange={handleChange}
                  margin="normal"
                  required
                  error={!!errors.coPayment}
                  helperText={errors.coPayment}
                  inputProps={{
                    min: 0, // Minimum value
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Policy Terms"
                  name="policyTerms"
                  value={formData.policyTerms}
                  onChange={handleChange}
                  margin="normal"
                  required
                  error={!!errors.policyTerms}
                  helperText={errors.policyTerms}
                  multiline
                  rows={4}
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
                  label="I agree to the Terms and Conditions of the InsuranceHub platform"
                />
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disableElevation
                color="primary"
                disabled={loading || !agreedToTerms} // Disable button if loading or terms are not agreed
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

export default PolicyRegistrationForm;