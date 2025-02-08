// Sidebar.jsx

import React from 'react';
import { styled } from '@mui/material/styles';
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
  { icon: Users, label: 'Customers', path: '/admin/customers' },
  { icon: FileText, label: 'Policies', path: '/admin/policies' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
  { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

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
          
          return (
            <StyledListItem
              component={Link}
              to={item.path}
              selected={isActive}
            >
              <ListItemIcon>
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
