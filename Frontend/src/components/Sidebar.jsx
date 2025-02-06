// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   Settings,
//   Bell,
//   BarChart3,
//   Shield,
//   LogOut
// } from 'lucide-react';

// const menuItems = [
//   { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
//   { icon: Users, label: 'Customers', path: '/admin/customers' },
//   { icon: FileText, label: 'Policies', path: '/admin/policies' },
//   { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
//   { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
//   { icon: Settings, label: 'Settings', path: '/admin/settings' },
// ];

// export function Sidebar() {
//   const location = useLocation();

//   return (
//     <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
//       <div className="p-4 border-b border-gray-200">
//         <Link to="/" className="flex items-center space-x-2">
//           <Shield className="h-8 w-8 text-blue-600" />
//           <span className="text-xl font-bold text-gray-900">Admin Portal</span>
//         </Link>
//       </div>
      
//       <nav className="flex-1 p-4">
//         <ul className="space-y-2">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = location.pathname === item.path;
            
//             return (
//               <li key={item.path}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
//                     isActive
//                       ? 'bg-blue-50 text-blue-600'
//                       : 'text-gray-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   <Icon className="h-5 w-5" />
//                   <span className="font-medium">{item.label}</span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>
      
//       <div className="p-4 border-t border-gray-200">
//         <button className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
//           <LogOut className="h-5 w-5" />
//           <span className="font-medium">Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { 
  Box, 
  Drawer, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  Button,
  Divider
} from '@mui/material';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Bell,
  BarChart3,
  Shield,
  LogOut
} from 'lucide-react';

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
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Users, label: 'Customers', path: '/admin/customers' },
  { icon: FileText, label: 'Policies', path: '/admin/policies' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
  { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export function Sidebar() {
  const location = useLocation();

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
          const isActive = location.pathname === item.path;
          
          return (
            <StyledListItem
              key={item.path}
              component={Link}
              to={item.path}
              selected={isActive}
            >
              <ListItemIcon>
                <Icon size={20} color={isActive ? '#1976d2' : '#666'} />
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
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
}
