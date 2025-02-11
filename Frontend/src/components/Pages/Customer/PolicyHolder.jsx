import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Container,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Link,
  CircularProgress,
  Stack,
  FormHelperText,
} from "@mui/material";
import { Shield } from "lucide-react";
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import { useSelector, useDispatch } from 'react-redux';
import { setTransactionData } from '../../../redux/slices/transactionSlice';

const InsuranceForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { user } = useSelector((state) => state.auth);
  const selectedPolicy = useSelector((state) => state.policies.selectedPolicy);

  // Current user id 
  
  const Currentuserid = user.uid;
console.log(Currentuserid + "current policy holder user id is ")

  const [formData, setFormData] = useState({
    policyHolderName: "",
    dateOfBirth: "",
    aadharNumber: "",
    panNumber: "",
    contactNumber: "",
    address: "",
    nominees: [],
    insuredMembers: [],
    previousHealthIssues: "",
    smoker: "",
    alcoholConsumer: "",
    medicalHistory: "",
    existingMedicalHistory: "",
    agreeTerms: false,
    premium: null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  const [errors, setErrors] = useState({
    smoker: false,
    alcoholConsumer: false,
    existingMedicalHistory: false,
    aadharNumber: false,
    panNumber: false,
    contactNumber: false,
    dateOfBirth: false,



  });

  const relationships = [
    "Wife",
    "Husband",
    "Son",
    "Daughter",
    "Father",
    "Mother",
    "Brother",
    "Sister",
  ];

  const aadharRegex = /^\d{12}$/;
  const panRegex = /^[A-Z]{3}[A-Z]{1}[A-Z]{1}\d{4}[A-Z]{1}$/;
  const phoneRegex = /^[0-9]{10}$/;

  const validatePhoneNumber = (value) => {
   
    if (value.length > 10) {
      return "Invalid Phone Number. Please enter 10 digits.";
    } else if (value.length === 10 && !phoneRegex.test(value)) {
      return "Invalid Phone Number. Please enter only numbers.";
    } else {
      return "";
    }
  };




  const validateAadharNumber = (value) => {
    if (value.length > 12  ) {
      return "Invalid Aadhar Number. Please enter 12 digits.";
    }  else if (value.length < 12  ) {
      return "Invalid Aadhar Number. Please minimum 12 digits.";
    }
    
    
    else if (value.length === 12 && !aadharRegex.test(value)) {
      return "Invalid Aadhar Number. Please enter 12 digits.";
    }
    
    
    
    else {
      return "";
    }
  };

  const validatePanNumber = (value) => {
    if (value.length >  10) {
      return "Invalid PAN Number. Please enter in the format XXXXX1234X (e.g. AAAPZ1234C) maximum 10" ;
    }  if (value.length <  10) {
      return "Invalid PAN Number. Please enter in the format XXXXX1234X (e.g. AAAPZ1234C) minimum 10" ;
    }
    
    else if (value.length === 10 && !panRegex.test(value)) {
      return "Invalid PAN Number. Please enter in the format XXXXX1234X (e.g. AAAPZ1234C)";
    } else {
      return "";
    }
  };
  const validateDateOfBirth = (value) => {
    const date = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
  
    // Check for minimum age of 5 years
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      if (age < 5) {
        return "Age should be at least 5 years";
      }
    } else {
      if (age < 5) {
        return "Age should be at least 5 years";
      }
    }
  
    // Check for maximum age of 60 years
    if (age > 60 || (age === 60 && (m > 0 || (m === 0 && today.getDate() > date.getDate())))) {
      return "Age should not exceed 60 years";
    }
  
    return "";
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle nested object updates
    if (name.startsWith("nominees.") || name.startsWith("insuredMembers.")) {
      const [parentKey, index, childKey] = name.split(".");
      const updatedFormData = { ...formData };
      if (parentKey === "nominees") {
        updatedFormData.nominees[index][childKey] = type === "checkbox" ? checked : value;
      } else if (parentKey === "insuredMembers") {
        updatedFormData.insuredMembers[index][childKey] = type === "checkbox" ? checked : value;
      }
      setFormData(updatedFormData);
      return;
    }

    // Default handling
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" || type === "switch" ? checked : value,
    }));

    // Reset error state when user selects an option
    if (name === "smoker" || name === "alcoholConsumer" || name === "existingMedicalHistory") {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
    if (name === "aadharNumber") {
      setErrors((prev) => ({ ...prev, aadharNumber: validateAadharNumber(value) !== "" }));
    }
    if (name === "panNumber") {
      setErrors((prev) => ({ ...prev, panNumber: validatePanNumber(value) !== "" }));
    }
    if (name === "dateOfBirth") {
      setErrors((prev) => ({ ...prev, dateOfBirth: validateDateOfBirth(value) !== "" }));
    }

    if (name === "contactNumber") {
      setErrors((prev) => ({ ...prev, contactNumber: validatePhoneNumber(value) !== "" }));
    }




  };

  const handleAddNominee = () => {
    setFormData((prev) => ({
      ...prev,
      nominees: [
        ...prev.nominees,
        {
          name: "",
          dateOfBirth: "",
          relationship: "",
        },
      ],
    }));
  };

  const handleRemoveNominee = (index) => {
    setFormData((prev) => ({
      ...prev,
      nominees: prev.nominees.filter((_, i) => i !== index),
    }));
  };

  const handleAddInsuredMember = () => {
    setFormData((prev) => ({
      ...prev,
      insuredMembers: [
        ...prev.insuredMembers,
        {
          name: "",
          dateOfBirth: "",
          relationship: "",
        },
      ],
    }));
  };

  const handleRemoveInsuredMember = (index) => {
    setFormData((prev) => ({
      ...prev,
      insuredMembers: prev.insuredMembers.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let hasError = false;

    // Validate radio button groups
    if (!formData.smoker) {
      setErrors((prev) => ({ ...prev, smoker: true }));
      hasError = true;
    }
    if (!formData.alcoholConsumer) {
      setErrors((prev) => ({ ...prev, alcoholConsumer: true }));
      hasError = true;
    }
    if (!formData.existingMedicalHistory) {
      setErrors((prev) => ({ ...prev, existingMedicalHistory: true }));
      hasError = true;
    }

    if (errors.aadharNumber) {
      hasError = true;
    }
    if (errors.panNumber) {
      hasError = true;
    }
    if (errors.dateOfBirth) {
      hasError = true;
    }
    if (errors.contactNumber) {  // ✅ Added Phone Number Validation
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return; // Stop submission if there are errors
    }

    // Calculate ages of all members
    const policyHolderAge = calculateAge(formData.dateOfBirth);
    const insuredMemberAges = formData.insuredMembers.map((member) => calculateAge(member.dateOfBirth));

    // Use the ages to calculate premium
    const premium = Math.ceil(
      calculatePremium(
        policyHolderAge,
        insuredMemberAges,
        formData.previousHealthIssues,
        formData.smoker,
        formData.alcoholConsumer,
        formData.medicalHistory,
        formData.existingMedicalHistory
      )
    );

    // Update the premium in the form data
    setFormData((prev) => ({ ...prev, premium }));

    // For testing purposes, just log the form data
    console.log("Form submitted:", formData);
    console.log("Policy Holder Age:", policyHolderAge);
    console.log("Insured Member Ages:", insuredMemberAges);
    console.log("Premium:", premium);
    setLoading(false);
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const policybasepremium = selectedPolicy.premiumAmount;
  console.log(policybasepremium + "policy base premium is ");

  const calculatePremium = (policyHolderAge, insuredMemberAges, previousHealthIssues, smoker, alcoholConsumer, medicalHistory, existingMedicalHistory) => {
    const basePremium = policybasepremium;
    const ageFactor = Math.max(policyHolderAge, ...insuredMemberAges) * 0.1;
    const healthFactor = previousHealthIssues ? 1.5 : 1;
    const smokerFactor = smoker === "yes" ? 1.2 : 1;
    const alcoholConsumerFactor = alcoholConsumer === "yes" ? 1.1 : 1;
    const medicalHistoryFactor = medicalHistory ? 1.5 : 1;
    const existingMedicalHistoryFactor = existingMedicalHistory === "yes" ? 1.2 : 1;
    const insuredMemberCountFactor = formData.insuredMembers.length * 0.05; // Additional factor for number of insured members
    return basePremium * (1 + ageFactor + insuredMemberCountFactor) * healthFactor * smokerFactor * alcoholConsumerFactor * medicalHistoryFactor * existingMedicalHistoryFactor;
  };

  const handleAgreeTerms = () => {
    setFormData((prev) => ({ ...prev, agreeTerms: !prev.agreeTerms }));
  };

  const handleProceedToPay = () => {
    const transactionData = {
      amount: formData.premium,
      policyHolder: {
        policyHolderName: formData.policyHolderName,
        dateOfBirth: formData.dateOfBirth,
        aadharNumber: formData.aadharNumber,
        panNumber: formData.panNumber,
        contactNumber: formData.contactNumber,
        address: formData.address,
        user: {
          userId: Currentuserid, // Replace with actual user ID
        },
        nominees: formData.nominees,
        insuredMembers: formData.insuredMembers,
      },
      policy: {
        policyId: selectedPolicy.policyId, // Replace with actual policy ID
      },
    };

    console.dir(transactionData + "generated transaction data ");

    // Dispatch transaction data to Redux
    dispatch(setTransactionData(transactionData));

    // Navigate to the payment page
    navigate("/payment");
  };

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 5);

  return (
    <Container maxWidth="lg" sx={{ height: "100vh", display: "flex", justifyContent : "center", alignItems: "center", fontFamily: "Segoe UI" }}>
      <Card sx={{ width: "100%", maxWidth: 800, p: 5, borderRadius: 3, boxShadow: 3, fontFamily: "Segoe UI", maxHeight: "90vh", overflowY: "auto" }}>
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 4, fontFamily: "Segoe UI" }}>
            <Shield sx={{ width: 40, height: 40, color: "primary.main" }} />
            <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold", fontFamily: "Segoe UI" }}>
              Customer Self Declaration Form
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Policy Holder Name"
                  name="policyHolderName"
                  value={formData.policyHolderName}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{ fontFamily: "Segoe UI" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date Of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  margin="normal"
                  required
                  min={minDate.toISOString().split('T')[0]}
                  sx={{ fontFamily: "Segoe UI" }}
                  error={errors.dateOfBirth}
                  helperText={errors.dateOfBirth ? validateDateOfBirth(formData.dateOfBirth) : ""}
                  InputLabelProps={{

                    shrink: true // Shrink the label if there is a value
                
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Aadhar Number"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{ fontFamily: "Segoe UI" }}
                  error={errors.aadharNumber}
                  helperText={errors.aadharNumber ? validateAadharNumber(formData.aadharNumber) : ""}
                  inputProps={{
                    maxLength: 12,
                    minLength: 12
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="PAN Number"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{ fontFamily: "Segoe UI" }}
                  error={errors.panNumber}
                  helperText={errors.panNumber ? validatePanNumber(formData.panNumber) : ""}
                  inputProps={{
                    maxLength: 10,
                    minLength: 10
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
  <TextField
    fullWidth
    label="Contact Number"
    name="contactNumber"
    type="tel"
    value={formData.contactNumber}
    onChange={handleChange}
    margin="normal"
    required
    sx={{ fontFamily: "Segoe UI" }}
    error={errors.contactNumber} // ✅ Show red border if error exists
    helperText={errors.contactNumber ? validatePhoneNumber(formData.contactNumber) : ""} // ✅ Display validation message
    inputProps={{
      maxLength: 10,
      pattern: "[0-9]*", // Allow only numbers
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
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Nominees</Typography>
              {formData.nominees.map((nominee, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <TextField
                    select
                    label="Relationship"
                    name={`nominees.${index}.relationship`}
                    value={nominee.relationship}
                    onChange={handleChange}
                    margin="normal"
                    required
                    sx={{ fontFamily: "Segoe UI", mr: 1 }}
                    InputLabelProps={{

                      shrink: true // Shrink the label if there is a value
                  
                    }}
                  >
                    {relationships.map((relationship) => (
                      <MenuItem key={relationship} value={relationship}>
                        {relationship}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label="Name"
                    name={`nominees.${index}.name`}
                    value={nominee.name}
                    onChange={handleChange}
                    margin="normal"
                    required
                    sx={{ fontFamily: "Segoe UI", mr: 1 }}
                  />
                  <TextField
                    label="Date of Birth"
                    name={`nominees.${index}.dateOfBirth`}
                    type="date"
                    value={nominee.dateOfBirth}
                    onChange={handleChange}
                    margin="normal"
                    required

                    inputProps={{
                      min: new Date(new Date().setFullYear(new Date().getFullYear() - 60)).toISOString().split('T')[0],
                      max: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0]
                    }}
                    min={minDate.toISOString().split('T')[0]}
                    sx={{ fontFamily: "Segoe UI", mr: 1 }}
                    InputLabelProps={{

                      shrink: true // Shrink the label if there is a value
                  
                    }}
                  />
                  <Button variant="outlined" color="secondary" onClick={() => handleRemoveNominee(index)}>
                    Remove
                  </Button>
                </Box>
              ))}
              <Button variant="contained" color="primary" onClick={handleAddNominee}>
                Add Nominee
              </Button>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Insured Members</Typography>
              {formData.insuredMembers.map((member, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <TextField
                    select
                    label="Relationship"
                    name={`insuredMembers.${index}.relationship`}
                    value={member.relationship}
                    onChange={handleChange}
                    margin="normal"
                    required
                    sx={{ fontFamily: "Segoe UI", mr: 1 }}
                  >
                    {relationships.map((relationship) => (
                      <MenuItem key={relationship} value={relationship}>
                        {relationship}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label="Name"
                    name={`insuredMembers.${index}.name`}
                    value={member.name}
                    onChange={handleChange}
                    margin="normal"
                    required
                    sx={{ fontFamily: "Segoe UI", mr: 1 }}
                  />
                  <TextField
                   label ="Date of Birth"
                    name={`insuredMembers.${index}.dateOfBirth`}
                    type="date"
                    value={member.dateOfBirth}
                    onChange={handleChange}
                    margin="normal"
                    required
                    min={minDate.toISOString().split('T')[0]}
                    sx={{ fontFamily: "Segoe UI", mr: 1 }}

                    InputLabelProps={{

                      shrink: true // Shrink the label if there is a value
                  
                    }}

                    inputProps={{
                      min: new Date(new Date().setFullYear(new Date().getFullYear() - 60)).toISOString().split('T')[0],
                      max: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0]
                    }}


                  />
                  <Button variant="outlined" color="secondary" onClick={() => handleRemoveInsuredMember(index)}>
                    Remove
                  </Button>
                </Box>
              ))}
              <Button variant="contained" color="primary" onClick={handleAddInsuredMember}>
                Add Insured Member
              </Button>
            </Box>

            <Box sx={{ mt: 2 }}>
              <FormControl component="fieldset" error={errors.smoker}>
                <FormLabel component="legend">Do you smoke?</FormLabel>
                <RadioGroup row name="smoker" value={formData.smoker} onChange={handleChange}>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {errors.smoker && <FormHelperText>This field is required.</FormHelperText>}
              </FormControl>
              <br />
              <FormControl component="fieldset" error={errors.alcoholConsumer}>
                <FormLabel component="legend">Do you consume alcohol?</FormLabel>
                <RadioGroup row name="alcoholConsumer" value={formData.alcoholConsumer} onChange={handleChange}>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {errors.alcoholConsumer && <FormHelperText>This field is required.</FormHelperText>}
              </FormControl>
              <br/>

              <FormControl component="fieldset" error={errors.existingMedicalHistory}>
                <FormLabel component="legend">Do you have any existing medical history?</FormLabel>
                <RadioGroup row name="existingMedicalHistory" value={formData.existingMedicalHistory} onChange={handleChange}>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {errors.existingMedicalHistory && <FormHelperText>This field is required.</FormHelperText>}
              </FormControl>
            </Box>

            <Typography variant="body2" sx={{ mt: 2 }}>
              By accepting the terms and conditions, you agree to the processing of your personal data in accordance with our <Link href="#" underline="hover">Privacy Policy</Link>.
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={formData.agreeTerms} onChange={handleAgreeTerms} />}
              label="I accept the terms and conditions"
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disableElevation
                color="primary"
                disabled={loading || !formData.agreeTerms}
                sx={{ fontFamily: "Segoe UI", mr: 2 }}
              >
                {loading ? "Generating Quote..." : "Get Quote"}
              </Button>
              <Button
                variant="contained"
                color="success"
                disabled={!formData.premium && Currentuserid != null}
                onClick={handleProceedToPay}
                sx={{ fontFamily: "Segoe UI" }}
              >
                Proceed to Pay
              </Button>
            </Box>

            {formData.premium !== null && (
              <Box sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="Calculated Premium"
                  value={`₹ ${formData.premium.toFixed(2)}`}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ fontFamily: "Segoe UI" }}
                />
              </Box>
            )}
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default InsuranceForm;