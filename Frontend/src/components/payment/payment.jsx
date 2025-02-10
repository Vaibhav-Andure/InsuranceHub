import React, { useState , useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Payment, VpnKey } from '@mui/icons-material';
import PaymentAnimation from './paymenticon';
import CustomizedSwitches from "../switch/custswitch";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { useSelector } from 'react-redux';


const useStyles = makeStyles({
    container: {
        width: '500px',
        margin: '50px auto',
        padding: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    formControl: { marginBottom: '15px', width: '100%' },
    centerSwitch: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' },
    inputField: { marginBottom: '15px' },
    retryButton: { marginTop: '20px', width: '100%', color: '#1392ed', '&:hover': { backgroundColor: 'lightgreen' } },
    logo: { width: '120px', marginBottom: '20px' },
    paymentIconContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '30px',
    },
    iconText: { marginTop: '10px', fontWeight: 'bold' },
    header: { marginTop: '10px', fontSize: '16px', color: '#555' },
});

// Payment Types
const PaymentType = { CARD: 0, UPI: 1, NETBANKING: 2 };

const PaymentGateway = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [paymentSuccess, setPaymentSuccess] = useState(null);

    
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [seconds, setSeconds] = useState(10);
    const [errors, setErrors] = useState({});

    const Apitransactiondata = useSelector((state) => state.transaction.transactionData );
console.dir(Apitransactiondata);
   
useEffect(() => {
    const hitTransactionApi = async () => {
      if (paymentSuccess === true) { // Only hit the API if payment is successful
        try {
          const transactionResponse = await axios.post('http://localhost:8251/insurance/transactions/savetransaction', Apitransactiondata);
          console.log("api response for payment " + transactionResponse.data);

          console.log(transactionResponse.ok)

          
        } catch (error) {
          console.error('Error hitting transaction API:', error);
        }
      }
    };

    // Call the API if paymentSuccess changes to true
    if (paymentSuccess === true) {
      hitTransactionApi();
    }
  }, [paymentSuccess]);




    const initialValues = {
        paymentMethod: 'upi',
        upiId: '',
        upiPin: '', // Added UPI PIN
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        username: '',
        password: '',
    };

    const validate = (values) => {
        const newErrors = {};
        if (!values.paymentMethod) newErrors.paymentMethod = 'Payment method is required';

        if (values.paymentMethod === 'upi') {
            if (!values.upiId) newErrors.upiId = 'UPI ID is required';
            if (!/^\d{4,6}$/.test(values.upiPin)) newErrors.upiPin = 'UPI PIN must be 4-6 digits'; // Validate UPI PIN format
        }

        if (values.paymentMethod === 'card') {
            if (!/^\d{12}$/.test(values.cardNumber)) newErrors.cardNumber = 'Card number must be 12 digits';
            if (!/^\d{2}\/\d{2}$/.test(values.expiryDate)) newErrors.expiryDate = 'Invalid expiry date format (MM/YY)';
            if (!/^\d{3}$/.test(values.cvv)) newErrors.cvv = 'CVV must be 3 digits';
        }

        if (values.paymentMethod === 'netbanking') {
            if (!values.username) newErrors.username = 'Username is required';
            if (!values.password) newErrors.password = 'Password is required';
        }

        return newErrors;
    };

    const handlePayment = async (values) => {
        const validationErrors = validate(values);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    
        setIsSwitchOn(true);
    
        try {
            let payload = {
                paymentType: values.paymentMethod === 'card' ? PaymentType.CARD :
                             values.paymentMethod === 'upi' ? PaymentType.UPI :
                             PaymentType.NETBANKING,
                netBankingPaymentDetails: values.paymentMethod === 'netbanking' ? {
                    Username: values.username,
                    Password: values.password,
                } : null,
                cardPaymentDetails: values.paymentMethod === 'card' ? {
                    CardNumber: values.cardNumber,
                    ExpiryDate: values.expiryDate,
                    CVV: values.cvv,
                } : null,
                upiPaymentDetails: values.paymentMethod === 'upi' ? {
                    upiId: values.upiId,
                    upiPin: values.upiPin,
                    // REMOVE upiPin FROM PAYLOAD for security reasons
                } : null, 
            };
    
            console.log("Payload (stringified):", JSON.stringify(payload)); // Check payload
    
            const response = await axios.post('http://localhost:8251/Payment/CheckPayment', payload, {
                headers: { 'Content-Type': 'application/json' },
            });
    
            console.log("Payment Response:", response.data); // Access data with response.data
    
            setPaymentSuccess(response.data.exists); // Access data with response.data
            if (response.data.exists) {  // Access data with response.data
                setTimeout(() => navigate('/transaction'), 5000);
            } else {
                setPaymentSuccess(false);
                startCountdown();
            }
    
        } catch (error) {
            console.error('Error fetching payment response:', error);
    
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Server Response Data:", error.response.data);
                console.error("Server Response Status:", error.response.status);
                console.error("Server Response Headers:", error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("Request made but no response received:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error setting up the request:", error.message);
            }
    
            setPaymentSuccess(false);
            startCountdown();
        } finally {
            setIsSwitchOn(false);
        }
    };











   
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
//policy check 




      

    return (
        <div className={classes.container}>
            

            {paymentSuccess === null && (
                
                <Formik initialValues={initialValues} onSubmit={handlePayment} validate={validate}>
                    {({ setFieldValue, values, handleSubmit, errors, touched }) => (
                        <Form>

<div

style={{

display: 'flex',

justifyContent: 'center', // Center horizontally

alignItems: 'center', // Center vertically (if needed)

marginBottom: '20px', // Optional: Add some space below the image

}}

>

<img

src='public/images/designlogowrap.png'

alt="Logo"

style={{

mixBlendMode: 'multiply', // Blend mode

maxWidth: '100%', // Ensure the image is responsive

height: 'auto', // Maintain aspect ratio

}}

/>

</div>














                            {/* Payment Method Select Dropdown */}
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel>Payment Method</InputLabel>
                                <Select
                                    name="paymentMethod"
                                    value={values.paymentMethod}
                                    onChange={(e) => setFieldValue('paymentMethod', e.target.value)}
                                    label="Payment Method"
                                >
                                    <MenuItem value="upi">UPI</MenuItem>
                                    <MenuItem value="card">Card</MenuItem>
                                    <MenuItem value="netbanking">NetBanking</MenuItem>
                                </Select>
                            </FormControl>
                            <br/>
                            <br/>
                            {values.paymentMethod === 'upi' && (
                                <>
                                    <Field name="upiId" as={TextField} label="Enter UPI ID" fullWidth variant="outlined"
                                        className={classes.inputField} InputProps={{ startAdornment: <InputAdornment position="start"><Payment /></InputAdornment> }}
                                        error={touched.upiId && errors.upiId ? true : false}
                                        helperText={touched.upiId && errors.upiId}
                                    />
                                      <br/>
                                      <br/>
                                    <Field name="upiPin" as={TextField} label="Enter UPI PIN" fullWidth variant="outlined" type="password"
                                        className={classes.inputField} InputProps={{ startAdornment: <InputAdornment position="start"><VpnKey /></InputAdornment> }}
                                        error={touched.upiPin && errors.upiPin ? true : false}
                                        helperText={touched.upiPin && errors.upiPin}
                                    />
                                </>
                            )}









{values.paymentMethod === 'card' && (

<div>

<Field

name="cardNumber"

label="Card Number"

fullWidth

as={TextField}

variant="outlined"

className={classes.formControl}

error={touched.cardNumber && Boolean(errors.cardNumber)}

helperText={touched.cardNumber && errors.cardNumber}

/>

<br/>

<br/>

<Field

name="expiryDate"

label="Expiry Date (MM/YY)"

fullWidth

as={TextField}

variant="outlined"

className={classes.formControl}

error={touched.expiryDate && Boolean(errors.expiryDate)}

helperText={touched.expiryDate && errors.expiryDate}

/>

<br/>

<br/>

<Field

name="cvv"

label="CVV"

fullWidth

as={TextField}

variant="outlined"

className={classes.formControl}

error={touched.cvv && Boolean(errors.cvv)}

helperText={touched.cvv && errors.cvv}

type="password"

/>

</div>

)}

{values.paymentMethod === 'netbanking' && (

<div>

<Field

name="Netbanking username"

label="Enter Username"

fullWidth

as={TextField}

variant="outlined"

className={classes.formControl}

error={touched.upiId && Boolean(errors.upiId)}

helperText={touched.upiId && errors.upiId}

/>

<br/>

<br/>

<Field

name="password"

label="Enter password"

fullWidth

as={TextField}

variant="outlined"

className={`${classes.formControl} ${classes.pinField}`}

error={touched.pin && Boolean(errors.pin)}

helperText={touched.pin && errors.pin}

type="password"

/>

</div>

)}











  <div>          <Typography variant="h6">Transaction-Amount:{Apitransactiondata.amount}</Typography>  </div>

                            <div className={classes.centerSwitch}>
                                <CustomizedSwitches checked={isSwitchOn} onChange={handleSubmit} trackColor="#4CAF50"

trackText={isSwitchOn ? "Processing..." : "Swipe to Pay"} />
                            </div>
                        </Form>
                    )}
                </Formik>
            )}




















            {paymentSuccess !== null && (
                <div className={classes.paymentIconContainer}>
                    <PaymentAnimation paymentSuccess={paymentSuccess} />
                    <Typography className={classes.iconText}>
                        {paymentSuccess ? 'Thank you for shopping with us!' : 'Payment Failed'}
                    </Typography>

                    {/* Retry Button */}
                    {!paymentSuccess && (
                        <div>
                            <Button className={classes.retryButton} onClick={retryPayment}>
                                Retry Payment
                            </Button>
                            <Typography variant="h6" className={classes.header}>
                                You will be redirected to the payment page in {seconds} seconds
                            </Typography>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PaymentGateway;
