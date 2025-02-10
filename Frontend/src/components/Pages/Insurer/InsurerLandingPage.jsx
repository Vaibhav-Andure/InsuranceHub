import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, 
  FileText, 
  ClipboardList, 
  AlertCircle, 
  Building2, 
  PlusCircle, 
  CheckCircle, 
  XCircle,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Button, 
  IconButton, 
  Modal, 
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  useMediaQuery
} from '@mui/material';

import PolicyRegistrationForm from './PolicyForm';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { logout } from '../../../redux/slices/authSlice'
import { useSelector, useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

const StatCard = ({ title, value, icon: Icon, onClick, color = "primary" }) => (
  <Paper 
    onClick={onClick}
    elevation={1}
    sx={{
      p: 3,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: 2,
      },
      bgcolor: `${color}.lighter`,
      color: `${color}.main`,
    }}
  >
    <Box>
      <Typography variant="body2" color="inherit" sx={{ opacity: 0.8 }}>
        {title}
      </Typography>
      <Typography variant="h4" fontWeight="bold" color="inherit" sx={{ mt: 1 }}>
        {value}
      </Typography>
    </Box>
    <Icon size={32} style={{ opacity: 0.8 }} />
  </Paper>
);

const DRAWER_WIDTH = 280;

const Sidebar = ({ open, onClose, onNavigate, activeTab ,handleLogout}) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'totalPolicies', label: 'Policies', icon: FileText },
    { id: 'pending', label: 'Pending Claims', icon: AlertCircle },
    { id: 'approved', label: 'Approved Claims', icon: CheckCircle },
    { id: 'totalCustomers', label: 'Customers', icon: Users },
  ];

  return (
    <Box sx={{ width: DRAWER_WIDTH }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          InsuranceHub
        </Typography>
        <IconButton onClick={onClose} sx={{ display: { sm: 'none' } }}>
          <ChevronLeft />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
              selected={activeTab === item.id}
              sx={{
                borderRadius: 2,
                mb: 1,
                '&.Mui-selected': {
                  bgcolor: 'primary.lighter',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.lighter',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                <item.icon size={20} />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mt: 2 }} />
      <List sx={{ px: 2, mt: 'auto' }}>
        {/* <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: 2 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Settings size={20} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem> */}
        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: 2, color: 'error.main' }}onClick={handleLogout}>
            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
              <LogOut size={20} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

const InsurerDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.uid;
  const [activeTab, setActiveTab] = useState('overview');
  const [claims, setClaims] = useState([]);
  const [insurerPolicies, setInsurerPolicies] = useState([]);
  const [insurerId, setInsurerId] = useState('');
  const [insurerName, setInsurerName] = useState('');
  const [insurerLicense, setInsurerLicense] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [showRegisterPolicyForm, setShowRegisterPolicyForm] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/'); // Navigate to the home page
  };


  useEffect(() => {
    console.log('User  object:', user); // Log the user object
    console.log('User  ID:', userId); // Log the user ID
  }, [user]);

  useEffect(() => {
    const fetchInsurerData = async () => {
      try {
        const response = await axios.get(`http://localhost:8251/insurance/insurers/by-user/${user.uid}`);
        setInsurerId(response.data.insurerId);
        setInsurerName(response.data.insurerName);
        setInsurerLicense(response.data.licenseNumber);
      } catch (error) {
        console.error('Error fetching insurer data:', error);
      }
    };

    const fetchClaims = async () => {
      try {
        const response = await axios.get(`http://localhost:8251/insurance/claims/by-insurer-user/${user.uid}`);
        setClaims(response.data);
      } catch (error) {
        console.error('Error fetching claims:', error);
      }
    };

    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`http://localhost:8251/insurance/policies/byinsureruserid/${user.uid}`);
        setInsurerPolicies(response.data);
      } catch (error) {
        console.error('Error fetching policies:', error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:8251/insurance/transactions/byinsureruserid/${user.uid}`);
        setTransactions(response.data);


        
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    if (userId) {
      fetchInsurerData();
    }
    if (insurerId) {
      fetchClaims();
      fetchPolicies();
      fetchTransactions();
    }
  }, [userId, insurerId]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleStatusChange = async (claimId, newStatus) => {
    try {
    
      await axios.put(`http://localhost:8251/insurance/claims/${claimId}/status`, null, {
        params: { newStatus }
      });
  
      const updatedClaims = claims.map(claim =>
        claim.claimId === claimId ? { ...claim, claimStatus: newStatus } : claim
      );
      setClaims(updatedClaims);
    } catch (error) {
      console.error('Error updating claim status:', error);
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const approvedClaims = Array.isArray(claims) ? claims.filter(c => c.claimStatus === 'Approved') : [];
  const pendingClaims = Array.isArray(claims) ? claims.filter(c => c.claimStatus === 'Pending') : [];
  const rejectedClaims = Array.isArray(claims) ? claims.filter(c => c.claimStatus === 'Rejected') : [];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Drawer
          variant={isSmUp ? 'permanent' : 'temporary'}
          open={isSmUp ? true : drawerOpen}
          onClose={handleDrawerToggle}
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              borderRight: '1px solid',
              borderColor: 'grey.200',
            },
          }}
        >
          <Sidebar
            open={drawerOpen}
            onClose={handleDrawerToggle}
            onNavigate={handleTabChange}
            activeTab={activeTab}
            handleLogout={handleLogout}
          />
        </Drawer>

        <Box sx={{ flexGrow: 1, bgcolor: 'grey.50' }}>
          <Box sx={{ bgcolor: 'white', borderBottom: 1, borderColor: 'grey.200' }}>
            <Box sx={{ px: 3, py: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                  color="inherit"
                  onClick={handleDrawerToggle}
                  sx={{ display: { sm: 'none' } }}
                >
                  <Menu />
                </IconButton>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" fontWeight="bold">
                    {activeTab === 'overview' ? 'Dashboard Overview' : 
                     activeTab === 'totalPolicies' ? 'Insurance Policies' :
                     activeTab === 'pending' ? 'Pending Claims' :
                     activeTab === 'approved' ? 'Approved Claims' :
                     'Customers'}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<PlusCircle size={20} />}
                  onClick={() => setShowRegisterPolicyForm(true)}
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Add New Policy
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconButton color="primary">
                    <Building2 />
                  </IconButton>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="medium">
                      {insurerName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      License: {insurerLicense}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ p: 3 }}>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Total Customers"
                  value={transactions.length}
                  icon={Users}
                  onClick={() => handleTabChange('totalCustomers')}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Total Policies"
                  value={insurerPolicies.length}
                  icon={FileText}
                  onClick={() => handleTabChange('totalPolicies')}
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Approved Claims"
                  value={approvedClaims.length}
                  icon={CheckCircle}
                  onClick={() => handleTabChange('approved')}
                  color="success"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Pending Claims"
                  value={pendingClaims.length}
                  icon={AlertCircle}
                  onClick={() => handleTabChange('pending')}
                  color="warning"
                />
              </Grid>
            </Grid>

            <Paper elevation={1} sx={{ overflow: 'hidden' }}>
              {activeTab === 'totalPolicies' && (
                <Box>
                  <Box sx={{ p: 3, borderBottom: 1, borderColor: 'grey.200' }}>
                    <Typography variant="h6" fontWeight="bold">
                      Active Policies
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Overview of all insurance policies
                    </Typography>
                  </Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Policy Number</TableCell>
                          <TableCell>Policy Name</TableCell>
                          <TableCell>Policy Terms</TableCell>
                          <TableCell>Premium Amount</TableCell>
                          <TableCell>Coverage Amount</TableCell>
                          <TableCell>Coverage Type</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {insurerPolicies.map((policy) => (
                          <TableRow key={policy.policyId} hover>
                            <TableCell>{policy.policyNumber}</TableCell>
                            <TableCell>{policy.policyName}</TableCell>
                            <TableCell>{policy.policyTerms}</TableCell>
                            <TableCell>${policy.premiumAmount}</TableCell>
                            <TableCell>${policy.coverageAmount}</TableCell>
                            <TableCell>{policy.coverageType}</TableCell>
                            <TableCell>
                              <Chip
                                label={policy.status}
                                color={policy.status === 'Active' ? 'success' : 'default'}
                                size="small"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {activeTab === 'totalCustomers' && (
                <Box>
                  <Box sx={{ p: 3, borderBottom: 1, borderColor: 'grey.200' }}>
                    <Typography variant="h6" fontWeight="bold">
                      Total Customers
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Overview of all customers
                    </Typography>
                  </Box>
                  {/* <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Customer ID</TableCell>
                          <TableCell>Customer Name</TableCell>
                          <TableCell>Policy Number</TableCell>
                          <TableCell>Policy Name</TableCell>
                          <TableCell>Transaction Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {transactions.map((transaction) => (
                          <TableRow key={transaction.transactionId} hover>
                            <TableCell>{transaction.customerId}</TableCell>
                            <TableCell>{transaction.customerName}</TableCell>
                            <TableCell>{transaction.policyNumber}</TableCell>
                            <TableCell>{transaction.policyName}</TableCell>
                            <TableCell>{new Date(transaction.transactionDate).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer> */}
                  <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Transaction ID</TableCell>
                            <TableCell>Policy Holder Name</TableCell>
                            <TableCell>Policy Name</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Transaction Date</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {transactions.map((transaction) => (
                            <TableRow key={transaction.transactionId} hover>
                              <TableCell>{transaction.transactionId}</TableCell>
                              <TableCell>{transaction.policyHolderName}</TableCell>
                              <TableCell>{transaction.policyName}</TableCell>
                              <TableCell>&#8377;{transaction.amount}</TableCell>
                              <TableCell>{new Date(transaction.transactionDate).toLocaleDateString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
            
                </Box>
              )}




              {activeTab === 'pending' && (
                <Box>
                  <Box sx={{ p: 3, borderBottom: 1, borderColor: 'grey.200' }}>
                    <Typography variant="h6" fontWeight="bold">
                      Pending Claims
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Claims requiring your attention
                    </Typography>
                  </Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Claim ID</TableCell>
                          <TableCell>Claimant</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Filed Date</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {pendingClaims.map((claim) => (
                          <TableRow key={claim.claimId} hover>
                            <TableCell>{claim.claimId}</TableCell>
                            <TableCell>{claim.claimantName}</TableCell>
                            <TableCell>${claim.claimAmount}</TableCell>
                            <TableCell>
                              {new Date(claim.filedDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                  variant="contained"
                                  color="success"
                                  size="small"
                                  onClick={() => handleStatusChange(claim.claimId, 'Approved')}
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  size="small"
                                  onClick={() => handleStatusChange(claim.claimId, 'Rejected')}
                                >
                                  Reject
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </Paper>
          </Box>
        </Box>

        <Modal
          open={showRegisterPolicyForm}
          onClose={() => setShowRegisterPolicyForm(false)}
          aria-labelledby="register-policy-modal"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            maxWidth: 800,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}>
            <PolicyRegistrationForm />
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default InsurerDashboard;