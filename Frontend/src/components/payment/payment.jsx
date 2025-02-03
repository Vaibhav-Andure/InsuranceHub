import React, { useState } from 'react';

import { Formik, Field, Form } from 'formik';

import * as Yup from 'yup';

import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';

import { makeStyles } from '@mui/styles';

import PaymentAnimation from './paymenticon'; // Import PaymentAnimation

import CustomizedSwitches from "../switch/custswitch"; // Import the switch component

import { useNavigate } from 'react-router-dom';
import axios from 'axios';


// Styles using Material-UI to create an aesthetic payment gateway

const useStyles = makeStyles({

container: {

width: '500px', // Set a fixed width for the payment gateway

margin: '100px auto', // Center the container vertically and horizontally

padding: '30px',

backgroundColor: '#ffffff', // White background for better contrast

borderRadius: '10px',

boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)', // Enhanced shadow

fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',

textAlign: 'center',

},

header: {

textAlign: 'center',

fontSize: '1.8rem', // Larger header font size

color: '#333',

marginBottom: '30px', // Increased margin for spacing

},

formControl: {

marginBottom: '15px',

width: '100%',

},

button: {

marginTop: '20px',

width: '100%',

backgroundColor: '#2563eb',

color: 'white',

'&:hover': {

backgroundColor: '#1d4ed8',

},

},

error: {

color: 'red',

fontSize: '0.8rem',

marginTop: '5px',

},

paymentIconContainer: {

marginTop: '30px',

},

iconText: {

fontSize: '1.1rem',

fontWeight: '500',

color: '#333',

marginTop: '10px',

},

centerSwitch: {

display: 'flex',

justifyContent: 'center', // Center the switch horizontally

alignItems: 'center', // Center the switch vertically

height: '100px', // Make space for centering the switch

},

retryButton: {

marginTop: '20px',

width: '100%',

color: '#1392ed',

'&:hover': {

backgroundColor: 'lightgreen', // Maintain red color on hover

},

}

});


// PaymentGateway component

const PaymentGateway = () => {

const classes = useStyles();

const [paymentSuccess, setPaymentSuccess] = useState(null); // Track payment success status

const [isSwitchOn, setIsSwitchOn] = useState(false); // Track the switch state

const [seconds, setSeconds] = useState(10); // Countdown for redirection

const navigate = useNavigate();

const initialValues = {
  paymentMethod: 'upi',
  upiId: '',
  pin: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  username: '',
  password: '',
};;

const validationSchema = Yup.object({

paymentMethod: Yup.string().required('Payment method is required'),

upiId: Yup.string().when('paymentMethod', {

is: 'upi',

then: Yup.string().required('UPI ID is required'),

}),

pin: Yup.string().when('paymentMethod', {

is: 'upi',

then: Yup.string()

.matches(/^\d{4}$/, 'PIN must be 4 digits')

.required('PIN is required for UPI'),

}),

cardNumber: Yup.string().when('paymentMethod', {

is: 'card',

then: Yup.string()

.matches(/^\d{16}$/, 'Card number must be 16 digits')

.required('Card number is required'),

}),

expiryDate: Yup.string().when('paymentMethod', {

is: 'card',

then: Yup.string()

.matches(/^\d{2}\/\d{2}$/, 'Invalid expiry date format (MM/YY)')

.required('Expiry date is required'),

}),

cvv: Yup.string().when('paymentMethod', {

is: 'card',

then: Yup.string()

.matches(/^\d{3}$/, 'CVV must be 3 digits')

.required('CVV is required'),

}),

bank: Yup.string().when('paymentMethod', {

is: 'netbanking',

then: Yup.string().required('Bank selection is required'),

}),

});

// Handle payment on switch toggle

const handlePayment = async (values) => {
    try {
      const response = await axios.post('https://localhost:7277/api/Payment/CheckPayment', {
        PaymentType: values.paymentMethod,
        PaymentDetails: {
          UPIId: values.upiId,
          PIN: values.pin,
          CardNumber: values.cardNumber,
          ExpiryDate: values.expiryDate,
          CVV: values.cvv,
          Username: values.username,
          Password: values.password,
        },
      });
  
      const paymentSuccess = response.data; // API returns true/false
      setPaymentSuccess(paymentSuccess);
  
      if (paymentSuccess) {
        let sec = 5; // 5 seconds countdown for success
        setSeconds(sec);
  
        const interval = setInterval(() => {
          setSeconds((prevSec) => {
            if (prevSec > 1) {
              return prevSec - 1;
            } else {
              clearInterval(interval);
              navigate('/transaction'); // Navigate to /transaction after 5 seconds
              return 0;
            }
          });
        }, 1000);
      } else {
        let sec = 10;
        setSeconds(sec); // Initialize countdown
  
        const interval = setInterval(() => {
          setSeconds((prevSec) => {
            if (prevSec > 1) {
              return prevSec - 1;
            } else {
              clearInterval(interval);
              retryPayment(); // Retry payment after countdown
              return 0;
            }
          });
        }, 1000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentSuccess(false);
  
      // Handle failure by starting the countdown even if the request fails
      let sec = 10;
      setSeconds(sec);
  
      const interval = setInterval(() => {
        setSeconds((prevSec) => {
          if (prevSec > 1) {
            return prevSec - 1;
          } else {
            clearInterval(interval);
            retryPayment(); // Retry payment after countdown
            return 0;
          }
        });
      }, 1000);
    }
  };
  


// Retry payment manually

const retryPayment = () => {

setPaymentSuccess(null); // Reset payment status to initiate the process again

setIsSwitchOn(false); // Reset the switch

};

return (

<div className={classes.container}>

{paymentSuccess === null && (

<Formik

initialValues={initialValues}

validationSchema={validationSchema}

onSubmit={handlePayment}

>

{({ setFieldValue, values, errors, touched }) => (

<Form>

{/* Payment Method Select */}

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

<FormControl fullWidth className={classes.formControl}>

<InputLabel>Payment Method</InputLabel>

<Select

value={values.paymentMethod}

onChange={(e) => setFieldValue('paymentMethod', e.target.value)}

label="Payment Method"

>

<MenuItem value="upi">UPI</MenuItem>

<br/>

<MenuItem value="card">Card</MenuItem>

<br/>

<MenuItem value="netbanking">NetBanking</MenuItem>

<br/>

</Select>

</FormControl>

<br/>

<br/>

{/* Conditional Fields based on Payment Method */}

{values.paymentMethod === 'upi' && (

<div>

<Field

name="upiId"

label="Enter UPI ID"

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

name="pin"

label="Enter UPI PIN"

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

{/* Switch for Payment */}

<div className={classes.centerSwitch}>

<CustomizedSwitches

checked={isSwitchOn}

onChange={

() => {

setIsSwitchOn(!isSwitchOn);

if (!isSwitchOn) {

handlePayment(); // Trigger payment if the switch is turned on

}

}}

trackColor="#4CAF50"

trackText={isSwitchOn ? "Processing..." : "Swipe to Pay"}

/>

</div>

</Form>

)}

</Formik>

)}

{/* Payment Animation Component */}

{paymentSuccess !== null && (

<div className={classes.paymentIconContainer}>

<PaymentAnimation paymentSuccess={paymentSuccess} />

<Typography className={classes.iconText}>

{paymentSuccess ? 'Thank you for shopping with us!' : ''}

</Typography>

{/* Retry Button */}

{!paymentSuccess && (

<div>

<Button

className={classes.retryButton}

onClick={retryPayment}

>

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