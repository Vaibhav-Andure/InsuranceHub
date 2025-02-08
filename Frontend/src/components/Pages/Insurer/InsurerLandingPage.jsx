// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Users,
//   FileText,
//   ClipboardList,
//   AlertCircle,
//   Building2,
//   PlusCircle
// } from 'lucide-react';
// import {
//   Box,
//   Typography,
//   Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   IconButton
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const StatCard = ({ title, value, icon: Icon, onClick }) => (
//   <Paper 
//     onClick={onClick} 
//     elevation={3} 
//     sx={{ 
//       padding: 2, 
//       display: 'flex', 
//       justifyContent: 'space-between', 
//       alignItems: 'center', 
//       cursor: onClick ? 'pointer' : 'default', 
//       flex: 1, 
//       margin: 1, 
//       height: 120, // Set a fixed height
//       minWidth: 150 // Set a minimum width
//     }} 
//   >
//     <div>
//       <Typography variant="body2" color="text.secondary">{title}</Typography>
//       <Typography variant="h6" fontWeight="bold">{value}</Typography>
//     </div>
//     <Icon sx={{ fontSize: 40, color: 'primary.main' }} />
//   </Paper>
// );

// const InsurerDashboard = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [claims, setClaims] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [policies, setPolicies] = useState([]);
//   const [totalTransactions, setTotalTransactions] = useState(0);
//   const [insurerPolicies, setInsurerPolicies] = useState([]); // State for insurer policies
//   const [insurerName, setInsurerName] = useState(''); // State for insurer name
//   const [insurerLicense, setInsurerLicense] = useState(''); // State for insurer license
//   const [transactions, setTransactions] = useState([]); // State for transactions
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchClaims = async () => {
//       try {
//         const response = await axios.get('http://localhost:5555/api/claims/by-insurer-user/4');
//         setClaims(response.data);
//       } catch (error) {
//         console.error('Error fetching claims:', error);
//       }
//     };

//     const fetchCustomers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5555/api/customers');
//         setCustomers(response.data);
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//       }
//     };

//     const fetchPolicies = async () => {
//       try {
//         const response = await axios.get('http://localhost:5555/api/policies');
//         setPolicies(response.data);
//       } catch (error) {
//         console.error('Error fetching policies:', error);
//       }
//     };

//     const fetchTotalTransactions = async () => {
//       try {
//         const response = await axios.get('http://localhost:5555/api/transactions'); // Adjust this endpoint as needed
//         setTotalTransactions(response.data.length); // Assuming the response is an array of transactions
//       } catch (error) {
//         console.error('Error fetching transactions:', error);
//       }
//     };

//     const fetchInsurerDetails = async () => {
//       try {
//         const response = await axios.get('http://localhost:5555/api/insurers/4'); // Adjust this endpoint as needed
//         setInsurerName(response.data.insurerName); // Assuming the response has an insurerName field
//         setInsurerLicense(response.data.licenseNumber); // Assuming the response has a licenseNumber field
//       } catch (error) {
//         console.error('Error fetching insurer details:', error);
//       }
//     };

//     fetchClaims();
//     fetchCustomers();
//     fetchPolicies();
//     fetchTotalTransactions();
//     fetchInsurerDetails(); // Fetch insurer details
//   }, []);

//   const handleTabChange = async (tab) => {
//     setActiveTab(tab);
//     if (tab === 'totalPolicies') {
//       // Fetch policies for the specific insurer (userId = 4 in this case)
//       try {
//         const response = await axios.get('http://localhost:5555/api/policies/user/4'); // Adjust userId as needed
//         setInsurerPolicies(response.data); // Set the fetched policies
//       } catch (error) {
//         console.error('Error fetching policies for insurer:', error);
//       }
//     } else if (tab === 'totalCustomers') {
//       // Fetch transactions for the specific insurer
//       try {
//         const response = await axios.get('http://localhost:5555/api/transactions/insurer/4'); // Adjust this endpoint as needed
//         setTransactions(response.data); // Set the fetched transactions
//       } catch (error) {
//         console.error('Error fetching transactions:', error);
//       }
//     }
//   };

//   const handleStatusChange = async (claimId, status) => {
//     try {
//       const response = await axios.put(`http://localhost:5555/api/claims/${claimId}/status`, null, {
//         params: { newStatus: status }
//       });
      
//       if (response.status === 200) {
//         setClaims((prevClaims) => {
//           return prevClaims.map(claim => 
//             claim.claimId === claimId ? { ...claim, claimStatus: status } : claim
//           );
//         });
//       }
//     } catch (error) {
//       console.error('Error updating claim status:', error);
//     }
//   };

//   const approvedClaims = claims.filter(c => c.claimStatus === 'Approved');
//   const pendingClaims = claims.filter(c => c.claimStatus === 'Pending');
//   const rejectedClaims = claims.filter(c => c.claimStatus === 'Rejected');

//   return (
//     <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', padding: 3 }}>
//       <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
//           <Typography variant="h4" fontWeight="bold" color="text.primary">Insurer Dashboard</Typography>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <IconButton color="primary">
//               <Building2 sx={{ fontSize: 24 }} />
//             </IconButton>
//             <Box sx={{ marginLeft: 2 }}>
//               <Typography variant="body1" fontWeight="bold">{insurerName}</Typography>
//               <Typography variant="body2" color="text.secondary">License: {insurerLicense}</Typography>
//             </Box>
//           </Box>
//         </Box>

//         <Grid container spacing={2} marginBottom={4}>
//           <Grid item xs={12} sm={6} md={3}>
//             <StatCard
//               title="Total Customers"
//               value={transactions.length}
//               icon={Users}
//               onClick={() => handleTabChange('totalCustomers')}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <StatCard
//               title="Total Policies"
//               value={insurerPolicies.length}
//               icon={FileText}
//               onClick={() => handleTabChange('totalPolicies')}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <StatCard
//               title="Approved Claims"
//               value={approvedClaims.length}
//               icon={ClipboardList}
//               onClick={() => handleTabChange('approved')}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <StatCard
//               title="Pending Claims"
//               value={pendingClaims.length}
//               icon={AlertCircle}
//               onClick={() => handleTabChange('pending')}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <StatCard
//               title="Total Transactions"
//               value={transactions.length}
//               icon={ClipboardList}
//               onClick={() => handleTabChange('totalTransactions')}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <StatCard
//               title="Register Policy"
//               value=""
//               icon={PlusCircle}
//               onClick={() => handleTabChange('registerPolicy')}
//             />
//           </Grid>
//         </Grid>

//         {activeTab === 'totalCustomers' && (
//           <Paper elevation={3} sx={{ padding: 3 }}>
//             <Typography variant="h6" fontWeight="bold" marginBottom={2}>Total Customers</Typography>
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell><strong>Policy Holder Name</strong></TableCell>
//                     <TableCell><strong>Policy Name</strong></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {transactions.map((transaction) => (
//                     <TableRow key={transaction.transactionId}>
//                       <TableCell>{transaction.policyHolderName}</TableCell>
//                       <TableCell>{transaction.policyName}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         )}

//         {activeTab === 'totalPolicies' && (
//           <Paper elevation={3} sx={{ padding: 3 }}>
//             <Typography variant="h6" fontWeight="bold" marginBottom={2}>
//               Policies for {insurerName}
//             </Typography>
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell><strong>Policy Number</strong></TableCell>
//                     <TableCell><strong>Policy Name</strong></TableCell>
//                     <TableCell><strong>Policy Terms</strong></TableCell>
//                     <TableCell><strong>Premium Amount</strong></TableCell>
//                     <TableCell><strong>Coverage Amount</strong></TableCell>
//                     <TableCell><strong>Coverage Type</strong></TableCell>
//                     <TableCell><strong>Status</strong></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {insurerPolicies.map((policy) => (
//                     <TableRow key={policy.policyId}>
//                       <TableCell>{policy.policyNumber}</TableCell>
//                       <TableCell>{policy.policyName}</TableCell>
//                       <TableCell>{policy.policyTerms}</TableCell>
//                       <TableCell>{policy.premiumAmount}</TableCell>
//                       <TableCell>{policy.coverageAmount}</TableCell>
//                       <TableCell>{policy.coverageType}</TableCell>
//                       <TableCell>{policy.status}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         )}

//         {activeTab === 'pending' && (
//           <Paper elevation={3} sx={{ padding: 3 }}>
//             <Typography variant="h6" fontWeight="bold" marginBottom={2}>Pending Claims</Typography>
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell><strong>Claim ID</strong></TableCell>
//                     <TableCell><strong>Claimant Name</strong></TableCell>
//                     <TableCell><strong>Policy ID</strong></TableCell>
//                     <TableCell><strong>Claim Amount</strong></TableCell>
//                     <TableCell><strong>Filed Date</strong></TableCell>
//                     <TableCell><strong>Status</strong></TableCell>
//                     <TableCell><strong>Actions</strong></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {pendingClaims.map((claim) => (
//                     <TableRow key={claim.claimId}>
//                       <TableCell>{claim.claimId}</TableCell>
//                       <TableCell>{claim.claimantName}</TableCell>
//                       <TableCell>{claim.policyId}</TableCell>
//                       <TableCell>{claim.claimAmount}</TableCell>
//                       <TableCell>{new Date(claim.filedDate).toLocaleDateString()}</TableCell>
//                       <TableCell>
//                         <AlertCircle sx={{ fontSize: 20, color: 'warning.main', marginRight: 1 }} />
//                         <Typography color="warning.main">Pending</Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           color="success"
//                           onClick={() => handleStatusChange(claim.claimId, 'Approved')}
//                         >
//                           Approve
//                         </Button>
//                         <Button
//                           variant="contained"
//                           color="error"
//                           sx={{ marginLeft: 1 }}
//                           onClick={() => handleStatusChange(claim.claimId, 'Rejected')}
//                         >
//                           Reject
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         )}

//         {activeTab === 'approved' && (
//           <Paper elevation={3} sx={{ padding: 3 }}>
//             <Typography variant="h6" fontWeight="bold" marginBottom={2}>Approved Claims</Typography>
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell><strong>Claim ID</strong></TableCell>
//                     <TableCell><strong>Claimant Name</strong></TableCell>
//                     <TableCell><strong>Policy ID</strong></TableCell>
//                     <TableCell><strong>Claim Amount</strong></TableCell>
//                     <TableCell><strong>Filed Date</strong></TableCell>
//                     <TableCell><strong>Status</strong></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {approvedClaims.map((claim) => (
//                     <TableRow key={claim.claimId}>
//                       <TableCell>{claim.claimId}</TableCell>
//                       <TableCell>{claim.claimantName}</TableCell>
//                       <TableCell>{claim.policyId}</TableCell>
//                       <TableCell>{claim.claimAmount}</TableCell>
//                       <TableCell>{new Date(claim.filedDate).toLocaleDateString()}</TableCell>
//                       <TableCell>
//                         <Typography color="success.main">Approved</Typography>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         )}

//         {activeTab === 'rejected' && (
//           <Paper elevation={3} sx={{ padding: 3 }}>
//             <Typography variant="h6" fontWeight="bold" marginBottom={2}>Rejected Claims</Typography>
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell><strong>Claim ID</strong></TableCell>
//                     <TableCell><strong>Claimant Name</strong></TableCell>
//                     <TableCell><strong>Policy ID</strong></TableCell>
//                     <TableCell><strong>Claim Amount</strong></TableCell>
//                     <TableCell><strong>Filed Date</strong></TableCell>
//                     <TableCell><strong>Status</strong></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {rejectedClaims.map((claim) => (
//                     <TableRow key={claim.claimId}>
//                       <TableCell>{claim.claimId}</TableCell>
//                       <TableCell>{claim.claimantName}</TableCell>
//                       <TableCell>{claim.policyId}</TableCell>
//                       <TableCell>{claim.claimAmount}</TableCell>
//                       <TableCell>{new Date(claim.filedDate).toLocaleDateString()}</TableCell>
//                       <TableCell>
//                         <Typography color="error.main">Rejected</Typography>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         )}

//         {activeTab === 'totalTransactions' && (
//           <Paper elevation={3} sx={{ padding: 3 }}>
//             <Typography variant="h6" fontWeight="bold" marginBottom={2}>Total Transactions</Typography>
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell><strong>Transaction ID</strong></TableCell>
//                     <TableCell><strong>Policy Holder Name</strong></TableCell>
//                     <TableCell><strong>Policy Name</strong></TableCell>
//                     <TableCell><strong>Amount</strong></TableCell>
//                     <TableCell><strong>Transaction Date</strong></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {transactions.map((transaction) => (
//                     <TableRow key={transaction.transactionId}>
//                       <TableCell>{transaction.transactionId}</TableCell>
//                       <TableCell>{transaction.policyHolderName}</TableCell>
//                       <TableCell>{transaction.policyName}</TableCell>
//                       <TableCell>{transaction.amount}</TableCell>
//                       <TableCell>{new Date(transaction.transactionDate).toLocaleString()}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default InsurerDashboard;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Users,
  FileText,
  ClipboardList,
  AlertCircle,
  Building2,
  PlusCircle
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
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, onClick }) => (
  <Paper 
    onClick={onClick} 
    elevation={3} 
    sx={{ 
      padding: 2, 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      cursor: onClick ? 'pointer' : 'default', 
      flex: 1, 
      margin: 1, 
      height: 120, // Set a fixed height
      minWidth: 150 // Set a minimum width
    }} 
  >
    <div>
      <Typography variant="body2" color="text.secondary">{title}</Typography>
      <Typography variant="h6" fontWeight="bold">{value}</Typography>
    </div>
    <Icon sx={{ fontSize: 40, color: 'primary.main' }} />
  </Paper>
);

const InsurerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [claims, setClaims] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [insurerPolicies, setInsurerPolicies] = useState([]); // State for insurer policies
  const [insurerName, setInsurerName] = useState(''); // State for insurer name
  const [insurerLicense, setInsurerLicense] = useState(''); // State for insurer license
  const [transactions, setTransactions] = useState([]); // State for transactions
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/claims/by-insurer-user/4');
        setClaims(response.data);
      } catch (error) {
        console.error('Error fetching claims:', error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    const fetchPolicies = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/policies');
        setPolicies(response.data);
      } catch (error) {
        console.error('Error fetching policies:', error);
      }
    };

    const fetchTotalTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/transactions'); // Adjust this endpoint as needed
        setTotalTransactions(response.data.length); // Assuming the response is an array of transactions
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    const fetchInsurerDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/insurers/4'); // Adjust this endpoint as needed
        setInsurerName(response.data.insurerName); // Assuming the response has an insurerName field
        setInsurerLicense(response.data.licenseNumber); // Assuming the response has a licenseNumber field
      } catch (error) {
        console.error('Error fetching insurer details:', error);
      }
    };

    const fetchInsurerPolicies = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/policies/byinsureruserid/4'); // Adjust userId as needed
        setInsurerPolicies(response.data); // Set the fetched policies
      } catch (error) {
        console.error('Error fetching policies for insurer:', error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/transactions/byinsureruserid/4'); // Adjust this endpoint as needed
        setTransactions(response.data); // Set the fetched transactions
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchClaims();
    fetchCustomers();
    fetchPolicies();
    fetchTotalTransactions();
    fetchInsurerDetails(); // Fetch insurer details
    fetchInsurerPolicies(); // Fetch insurer policies
    fetchTransactions(); // Fetch transactions
  }, []);

  const handleTabChange = async (tab) => {
    setActiveTab(tab);
  };

  const handleStatusChange = async (claimId, status) => {
    try {
      const response = await axios.put(`http://localhost:5555/api/claims/${claimId}/status`, null, {
        params: { newStatus: status }
      });
      
      if (response.status === 200) {
        setClaims((prevClaims) => {
          return prevClaims.map(claim => 
            claim.claimId === claimId ? { ...claim, claimStatus: status } : claim
          );
        });
      }
    } catch (error) {
      console.error('Error updating claim status:', error);
    }
  };

  const approvedClaims = claims.filter(c => c.claimStatus === 'Approved');
  const pendingClaims = claims.filter(c => c.claimStatus === 'Pending');
  const rejectedClaims = claims.filter(c => c.claimStatus === 'Rejected');

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
              <Typography variant="body1" fontWeight="bold">{insurerName}</Typography>
              <Typography variant="body2" color="text.secondary">License: {insurerLicense}</Typography>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={2} marginBottom={4}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Customers"
              value={transactions.length}
              icon={Users}
              onClick={() => handleTabChange('totalCustomers')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Policies"
              value={insurerPolicies.length}
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
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Transactions"
              value={transactions.length}
              icon={ClipboardList}
              onClick={() => handleTabChange('totalTransactions')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Register Policy"
              value=""
              icon={PlusCircle}
              onClick={() => handleTabChange('registerPolicy')}
            />
          </Grid>
        </Grid>

        {activeTab === 'totalCustomers' && (
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" fontWeight="bold" marginBottom={2}>Total Customers</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Policy Holder Name</strong></TableCell>
                    <TableCell><strong>Policy Name</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.transactionId}>
                      <TableCell>{transaction.policyHolderName}</TableCell>
                      <TableCell>{transaction.policyName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {activeTab === 'totalPolicies' && (
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" fontWeight="bold" marginBottom={2}>
              Policies for {insurerName}
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Policy Number</strong></TableCell>
                    <TableCell><strong>Policy Name</strong></TableCell>
                    <TableCell><strong>Policy Terms</strong></TableCell>
                    <TableCell><strong>Premium Amount</strong></TableCell>
                    <TableCell><strong>Coverage Amount</strong></TableCell>
                    <TableCell><strong>Coverage Type</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {insurerPolicies.map((policy) => (
                    <TableRow key={policy.policyId}>
                      <TableCell>{policy.policyNumber}</TableCell>
                      <TableCell>{policy.policyName}</TableCell>
                      <TableCell>{policy.policyTerms}</TableCell>
                      <TableCell>{policy.premiumAmount}</TableCell>
                      <TableCell>{policy.coverageAmount}</TableCell>
                      <TableCell>{policy.coverageType}</TableCell>
                      <TableCell>{policy.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {activeTab === 'pending' && (
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" fontWeight="bold" marginBottom={2}>Pending Claims</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Claim ID</strong></TableCell>
                    <TableCell><strong>Claimant Name</strong></TableCell>
                    <TableCell><strong>Policy ID</strong></TableCell>
                    <TableCell><strong>Claim Amount</strong></TableCell>
                    <TableCell><strong>Filed Date</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingClaims.map((claim) => (
                    <TableRow key={claim.claimId}>
                      <TableCell>{claim.claimId}</TableCell>
                      <TableCell>{claim.claimantName}</TableCell>
                      <TableCell>{claim.policyId}</TableCell>
                      <TableCell>{claim.claimAmount}</TableCell>
                      <TableCell>{new Date(claim.filedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <AlertCircle sx={{ fontSize: 20, color: 'warning.main', marginRight: 1 }} />
                        <Typography color="warning.main">Pending</Typography>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleStatusChange(claim.claimId, 'Approved')}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{ marginLeft: 1 }}
                          onClick={() => handleStatusChange(claim.claimId, 'Rejected')}
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

        {activeTab === 'approved' && (
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" fontWeight="bold" marginBottom={2}>Approved Claims</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Claim ID</strong></TableCell>
                    <TableCell><strong>Claimant Name</strong></TableCell>
                    <TableCell><strong>Policy ID</strong></TableCell>
                    <TableCell><strong>Claim Amount</strong></TableCell>
                    <TableCell><strong>Filed Date</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {approvedClaims.map((claim) => (
                    <TableRow key={claim.claimId}>
                      <TableCell>{claim.claimId}</TableCell>
                      <TableCell>{claim.claimantName}</TableCell>
                      <TableCell>{claim.policyId}</TableCell>
                      <TableCell>{claim.claimAmount}</TableCell>
                      <TableCell>{new Date(claim.filedDate).toLocaleDateString()}</TableCell>
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

        {activeTab === 'rejected' && (
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" fontWeight="bold" marginBottom={2}>Rejected Claims</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Claim ID</strong></TableCell>
                    <TableCell><strong>Claimant Name</strong></TableCell>
                    <TableCell><strong>Policy ID</strong></TableCell>
                    <TableCell><strong>Claim Amount</strong></TableCell>
                    <TableCell><strong>Filed Date</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rejectedClaims.map((claim) => (
                    <TableRow key={claim.claimId}>
                      <TableCell>{claim.claimId}</TableCell>
                      <TableCell>{claim.claimantName}</TableCell>
                      <TableCell>{claim.policyId}</TableCell>
                      <TableCell>{claim.claimAmount}</TableCell>
                      <TableCell>{new Date(claim.filedDate).toLocaleDateString()}</TableCell>
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

        {activeTab === 'totalTransactions' && (
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" fontWeight="bold" marginBottom={2}>Total Transactions</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Transaction ID</strong></TableCell>
                    <TableCell><strong>Policy Holder Name</strong></TableCell>
                    <TableCell><strong>Policy Name</strong></TableCell>
                    <TableCell><strong>Amount</strong></TableCell>
                    <TableCell><strong>Transaction Date</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.transactionId}>
                      <TableCell>{transaction.transactionId}</TableCell>
                      <TableCell>{transaction.policyHolderName}</TableCell>
                      <TableCell>{transaction.policyName}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{new Date(transaction.transactionDate).toLocaleString()}</TableCell>
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