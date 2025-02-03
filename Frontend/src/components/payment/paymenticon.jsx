




import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green, red, blue } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Typography from '@mui/material/Typography';

export default function PaymentAnimation({ paymentSuccess }) {
  const [loading, setLoading] = React.useState(true);  // Start as loading
  const [isPaymentSuccess, setIsPaymentSuccess] = React.useState(false);

  React.useEffect(() => {
    if (paymentSuccess !== null) {  // Only change when we get a valid response
      setLoading(false);  // Once we get the response, stop loading animation
      setIsPaymentSuccess(paymentSuccess);  // Set the success/failure based on response
    }
  }, [paymentSuccess]);  // Re-run when paymentSuccess prop changes

  // Define the Fab button styling dynamically based on state
  const buttonSx = {
    ...(loading && {
      bgcolor: blue[500],
      '&:hover': {
        bgcolor: blue[700],
      },
    }),
    ...(isPaymentSuccess && !loading && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
    ...(!isPaymentSuccess && !loading && {
      bgcolor: red[500],
      '&:hover': {
        bgcolor: red[700],
      },
    }),
    color: 'white',
    fontFamily: 'Segoe UI',
    width: 68, // Fixed width of the Fab
    height: 68, // Fixed height of the Fab
    position: 'relative', // Ensure relative positioning for children elements like CircularProgress
    borderRadius: '50%', // Ensure the Fab is perfectly circular
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', fontFamily: 'Segoe UI' }}>
      <Box sx={{ m: 1, position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Fab Button for Payment Status */}
        <Fab aria-label="payment-status" sx={buttonSx}>
          {loading ? null : isPaymentSuccess ? (
            <CheckCircleOutlineIcon fontSize="large" />
          ) : (
              <HighlightOffIcon fontSize="large" />
            )}
        </Fab>

        {/* CircularProgress while loading */}
        {loading && (
          <CircularProgress
            size={68} // Adjust size to match Fab button size
            thickness={6} // Thicker stroke for the circumference effect
            sx={{
              color: blue[500],
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: 'auto', // Center the CircularProgress inside the Fab
              transform: 'scale(1)', // Keep the scale intact to fit around the button
              zIndex: 1, // Ensure spinner is on top of the Fab
              transition: 'transform 3s ease-in-out', // Slow down the spinner's appearance over 3 seconds
            }}
          />
        )}
      </Box>

      {/* Text below the Fab button */}
      <Box sx={{ m: 2, textAlign: 'center' }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Segoe UI',
            mt: 2,
            fontWeight: 500,
            color: '#333',
            fontSize: '16px',
            lineHeight: 1.4,
          }}
        >
          {loading
            ? 'Processing the payment, please wait...'
            : isPaymentSuccess
              ? 'Payment Successful'
              : 'Payment Failed. Please try again.'}
        </Typography>
      </Box>
    </Box>
  );
}

