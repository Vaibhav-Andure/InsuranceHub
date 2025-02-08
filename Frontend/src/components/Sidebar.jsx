
// import React from 'react';
// import { styled } from '@mui/material/styles';
// import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, Button, Divider } from '@mui/material';
// import { LayoutDashboard, Users, FileText, Settings, Bell, BarChart3, Shield, LogOut } from 'lucide-react';

// const DRAWER_WIDTH = 240;

// // Styled ListItemButton for better styling control
// const StyledListItem = styled(ListItemButton)(({ theme, selected }) => ({
//   borderRadius: theme.shape.borderRadius,
//   margin: '5px 10px',
//   color: selected ? theme.palette.primary.main : theme.palette.text.primary,
//   backgroundColor: selected ? theme.palette.primary.light : 'transparent',
//   '&:hover': {
//     backgroundColor: theme.palette.primary.light,
//   },
// }));

// const menuItems = [
//   { icon: LayoutDashboard, label: 'Dashboard', view: 'policyholders' },
//   { icon: Users, label: 'Customers', view: 'policyholders' },
//   { icon: FileText, label: 'Policies', view: 'Policies' },
//   { icon: BarChart3, label: 'Analytics', view: 'Analytics' },
//   { icon: Shield, label: 'Insurers', view: 'Insurers' }, // Changed from Notifications to Insurers
//   { icon: Settings, label: 'Settings', view: 'Settings' },
// ];

// export function Sidebar({ setActiveView }) {
//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: DRAWER_WIDTH,
//         flexShrink: 0,
//         '& .MuiDrawer-paper': {
//           width: DRAWER_WIDTH,
//           boxSizing: 'border-box',
//         },
//       }}
//     >
//       {/* Logo / Branding */}
//       <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
//         <Shield size={32} color="#1976d2" />
//         <Typography variant="h6" component="div">
//           Admin Portal
//         </Typography>
//       </Box>
      
//       <Divider />
      
//       {/* Navigation List */}
//       <List sx={{ flex: 1 }}>
//         {menuItems.map((item) => {
//           const Icon = item.icon;
          
//           return (
//             <StyledListItem
//               key={item.label}
//               onClick={() => setActiveView(item.view)} // Set active view on click
//             >
//               <ListItemIcon>
//                 <Icon size={20} />
//               </ListItemIcon>
//               <ListItemText primary={item.label} />
//             </StyledListItem>
//           );
//         })}
//       </List>
      
//       <Divider />
      
//       {/* Logout Button */}
//       <Box sx={{ p: 2 }}>
//         <Button
//           fullWidth
//           startIcon={<LogOut size={20} />}
//           sx={{ justifyContent: 'flex-start', color: 'error.main' }}
//         >
//           Logout
//         </Button>
//       </Box>
//     </Drawer>
//   );
// }



import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, Button, Divider } from '@mui/material';
import { LayoutDashboard, Users, FileText, Settings, BarChart3, Shield, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

const DRAWER_WIDTH = 240;

// Styled ListItemButton for better styling control
const StyledListItem = styled(ListItemButton)(({ theme, selected }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: '5px 10px',
  color: selected ? theme.palette.primary.main : theme.palette.text.primary,
  backgroundColor: selected ? theme.palette.primary.light : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', view: 'policyholders' },
  { icon: Users, label: 'Customers', view: 'policyholders' },
  { icon: FileText, label: 'Policies', view: 'Policies' },
  { icon: BarChart3, label: 'Analytics', view: 'Analytics' },
  { icon: Shield, label: 'Insurers', view: 'Insurers' },
];

export function Sidebar({ setActiveView }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/'); // Redirect to home or login page
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      {/* Logo / Branding */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Shield size={32} color="#1976d2" />
        <Typography variant="h6" component="div">
          Admin Portal
        </Typography>
      </Box>
      
      <Divider />
      
      {/* Navigation List */}
      <List sx={{ flex: 1 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <StyledListItem
              key={item.label}
              onClick={() => setActiveView(item.view)} // Set active view on click
            >
              <ListItemIcon>
                <Icon size={20} />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </StyledListItem>
          );
        })}
      </List>
      
      <Divider />
      
      {/* Logout Button */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          startIcon={<LogOut size={20} />}
          sx={{ justifyContent: 'flex-start', color: 'error.main' }}
          onClick={handleLogout} // Call handleLogout on click
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );

}



export default Sidebar;
