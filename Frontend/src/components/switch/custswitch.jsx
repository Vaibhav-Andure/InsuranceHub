import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

// Styled Switch component
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme, trackColor, trackText }) => ({
  width: 250,  // Width of the switch, adjust as needed
  height: 40, // Adjust height as needed
  padding: 0,  // Remove extra padding around the switch

  '& .MuiSwitch-switchBase': {
    padding: 0, // No extra padding around the base of the switch
    margin: 4,  // Margin around the thumb
    transitionDuration: '500ms', // Smooth thumb transition duration
    transitionProperty: 'transform, background-color',
    transitionTimingFunction: 'ease-in-out', // Smooth easing for thumb movement
    transitionDelay: '100ms', // Delay before thumb starts sliding

    '&.Mui-checked': {
      transform: 'translateX(210px)', // Move thumb to the right
      color: '#fff', // Thumb color when checked

      '& + .MuiSwitch-track': {
        backgroundColor: trackColor || '#1392ed',  // Default or custom track color when checked
        opacity: 1, // Full opacity when checked
        border: 0, // Remove border when checked
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d', // Focus color for the thumb
      border: '8px solid #fff', // Border size around thumb when focused
    },

    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7, // Dimmed track when disabled
    },
  },

  '& .MuiSwitch-thumb': {
    width: 30,  // Thumb width
    height: 30, // Thumb height
    borderRadius: '50%', // Make the thumb circular
    transition: 'transform 500ms ease', // Smooth transition for thumb sliding
  },

  '& .MuiSwitch-track': {
    borderRadius: 20, // Adjust the rounding of the track
    backgroundColor: '#E9E9EA', // Default track color when off
    opacity: 1,
    width: '100%',
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },

  '& .MuiSwitch-thumb::after': {
    content: '"OFF"', // Default text when switch is off
    fontSize: '12px',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  '&.Mui-checked .MuiSwitch-thumb::after': {
    content: '"ON"',  // Change text when switch is ON
  },

  // Text on the track
  '&::after': {
    content: `"${trackText || 'Slide to Buy Policy'}"`,  // Default text or passed text
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '14px',
    color: '#1a242b',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    fontWeight: 'bold',
    pointerEvents: 'none',
    opacity: 1,
  },

}));

export default function CustomizedSwitches({ checked, onChange, trackColor, trackText }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <IOSSwitch
            sx={{ m: 1 }}  // Margin around the switch
            checked={checked}  // Controlled checked state
            onChange={onChange}  // Event handler for state change
            trackColor={trackColor}  // Pass the custom track color
            trackText={trackText}  // Pass the custom text for the track
          />
        }
      />
    </FormGroup>
  );
}
