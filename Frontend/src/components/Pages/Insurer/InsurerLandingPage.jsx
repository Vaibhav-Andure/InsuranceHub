/*import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

export default function InsurerLandingPage() {
  return (
    <div
      className="min-vh-100 bg-light py-5"
      style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}
    >
      <div className="container">
        <h1 className="text-center">Insurer Dashboard</h1>
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body text-center">
                <h4>Manage Policies</h4>
                <p>Create and update insurance policies</p>
                <button className="btn btn-primary">Manage Policies</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body text-center">
                <h4>Customer Requests</h4>
                <p>View and respond to customer inquiries</p>
                <button className="btn btn-primary">View Requests</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body text-center">
                <h4>Claims Management</h4>
                <p>Review and approve insurance claims</p>
                <button className="btn btn-primary">Manage Claims</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
*/
import React, { useState } from 'react';
import {
  Users,
  FileText,
  ClipboardList,
  AlertCircle,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Building2
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
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for redirection

// Mock data - In a real app, this would come from an API
const mockData = {
  insurerDetails: {
    name: "ABC Insurance Co.",
    license: "INS123456",
    address: "123 Insurance Street, Business District",
    contact: "+1 234 567 8900"
  },
  policies: [
    { id: 1, policyNumber: "POL001", customerName: "John Doe", customerId: "CUST001", type: "Life Insurance", premium: "$500" },
    { id: 2, policyNumber: "POL002", customerName: "Jane Smith", customerId: "CUST002", type: "Health Insurance", premium: "$300" },
    { id: 3, policyNumber: "POL003", customerName: "Mike Johnson", customerId: "CUST003", type: "Auto Insurance", premium: "$400" },
  ],
  customers: [
    { id: "CUST001", name: "John Doe", email: "john@example.com", policies: 2 },
    { id: "CUST002", name: "Jane Smith", email: "jane@example.com", policies: 1 },
    { id: "CUST003", name: "Mike Johnson", email: "mike@example.com", policies: 3 },
  ],
  claims: [
    { id: 1, claimNumber: "CLM001", customerName: "John Doe", policyNumber: "POL001", amount: "$5000", status: "pending", date: "2024-03-10" },
    { id: 2, claimNumber: "CLM002", customerName: "Jane Smith", policyNumber: "POL002", amount: "$3000", status: "pending", date: "2024-03-09" },
    { id: 3, claimNumber: "CLM003", customerName: "Mike Johnson", policyNumber: "POL003", amount: "$2000", status: "pending", date: "2024-03-08" },
  ]
};

const StatCard = ({ title, value, icon: Icon, onClick }) => (
  <Paper onClick={onClick} elevation={3} sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: onClick ? 'pointer' : 'default' }} >
    <div>
      <Typography variant="body2" color="text.secondary">{title}</Typography>
      <Typography variant="h6" fontWeight="bold">{value}</Typography>
    </div>
    <Icon sx={{ fontSize: 40, color: 'primary.main' }} />
  </Paper>
);

const InsurerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [claims, setClaims] = useState(mockData.claims);
  const navigate = useNavigate(); // useNavigate hook for redirection

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleStatusChange = (claimId, status) => {
    setClaims((prevClaims) => {
      const updatedClaims = prevClaims.map(claim => 
        claim.id === claimId ? { ...claim, status } : claim
      );
      return updatedClaims;
    });
  };

  const approvedClaims = claims.filter(c => c.status === 'approved');
  const pendingClaims = claims.filter(c => c.status === 'pending');
  const rejectedClaims = claims.filter(c => c.status === 'rejected');

  // Handle Register Policy redirection
  const handleRegisterPolicy = () => {
    navigate('/register-policy'); // Navigate to the RegisterPolicy form
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', padding: 3 }}>
      <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <Typography variant="h4" fontWeight="bold" color="text.primary">Insurer Dashboard</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="primary">
              <Building2 sx={{ fontSize: 24 }} />
            </IconButton>
            <Box sx={{ marginLeft: 2 }}>
              <Typography variant="body1" fontWeight="bold">{mockData.insurerDetails.name}</Typography>
              <Typography variant="body2" color="text.secondary">License: {mockData.insurerDetails.license}</Typography>
            </Box>
          </Box>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} marginBottom={4}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Customers"
              value={mockData.customers.length}
              icon={Users}
              onClick={() => handleTabChange('totalCustomers')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Policies"
              value={mockData.policies.length}
              icon={FileText}
              onClick={() => handleTabChange('totalPolicies')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Approved Claims"
              value={approvedClaims.length}
              icon={ClipboardList}
              onClick={() => handleTabChange('approved')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending Claims"
              value={pendingClaims.length}
              icon={AlertCircle}
              onClick={() => handleTabChange('pending')}
            />
          </Grid>
        </Grid>

        {/* Add Register Policy Button */}
        <Button variant="contained" color="primary" onClick={handleRegisterPolicy}>
          Register Policy
        </Button>

        {/* Total Policies */}
        {activeTab === 'totalPolicies' && (
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" fontWeight="bold" marginBottom={2}>Total Policies</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Policy Number</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Policy Type</TableCell>
                    <TableCell>Premium</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockData.policies.map((policy) => (
                    <TableRow key={policy.id}>
                      <TableCell>{policy.policyNumber}</TableCell>
                      <TableCell>{policy.customerName}</TableCell>
                      <TableCell>{policy.type}</TableCell>
                      <TableCell>{policy.premium}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* Total Customers */}
        {activeTab === 'totalCustomers' && (
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" fontWeight="bold" marginBottom={2}>Total Customers</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Customer ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Number of Policies</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockData.customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.policies}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* Pending Claims */}
        {activeTab === 'pending' && (
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" fontWeight="bold" marginBottom={2}>Pending Claims</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Claim Number</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Policy Number</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingClaims.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell>{claim.claimNumber}</TableCell>
                      <TableCell>{claim.customerName}</TableCell>
                      <TableCell>{claim.policyNumber}</TableCell>
                      <TableCell>{claim.amount}</TableCell>
                      <TableCell>{claim.date}</TableCell>
                      <TableCell>
                        <AlertCircle sx={{ fontSize: 20, color: 'warning.main', marginRight: 1 }} />
                        <Typography color="warning.main">Pending</Typography>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleStatusChange(claim.id, 'approved')}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{ marginLeft: 1 }}
                          onClick={() => handleStatusChange(claim.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* Approved Claims */}
        {activeTab === 'approved' && (
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" fontWeight="bold" marginBottom={2}>Approved Claims</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Claim Number</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Policy Number</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {approvedClaims.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell>{claim.claimNumber}</TableCell>
                      <TableCell>{claim.customerName}</TableCell>
                      <TableCell>{claim.policyNumber}</TableCell>
                      <TableCell>{claim.amount}</TableCell>
                      <TableCell>{claim.date}</TableCell>
                      <TableCell>
                        <Typography color="success.main">Approved</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* Rejected Claims */}
        {activeTab === 'rejected' && (
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" fontWeight="bold" marginBottom={2}>Rejected Claims</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Claim Number</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Policy Number</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rejectedClaims.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell>{claim.claimNumber}</TableCell>
                      <TableCell>{claim.customerName}</TableCell>
                      <TableCell>{claim.policyNumber}</TableCell>
                      <TableCell>{claim.amount}</TableCell>
                      <TableCell>{claim.date}</TableCell>
                      <TableCell>
                        <Typography color="error.main">Rejected</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default InsurerDashboard;
