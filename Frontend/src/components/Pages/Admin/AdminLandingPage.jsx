
// import React, { useState, useEffect } from 'react';
// import { Sidebar } from '../../Sidebar';
// import { Card, CardContent, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Pagination, CircularProgress } from '@mui/material';
// import axios from 'axios';

// const AdminLandingPage = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [stats, setStats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5555/api/transactions/getalltransaction?page=${page}&size=5`);
        
//         setTransactions(response.data.content);
//         setTotalPages(response.data.totalPages);
//       } catch (err) {
//         console.error('Error fetching transactions:', err);
//         setError('Failed to fetch transactions');
//       }
//     };

//     const fetchStats = async () => {
//       try {
//         const response = await axios.get('http://localhost:5555/api/transactions/stats');
        
//         setStats(response.data);
//       } catch (err) {
//         console.error('Error fetching stats:', err);
//         setError('Failed to fetch stats');
//       }
//     };

//     Promise.all([fetchTransactions(), fetchStats()]).then(() => {
//       setLoading(false);
//     });
//   }, [page]);

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   if (loading) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{ textAlign: 'center', marginTop: '20px' }}>
//         <Typography variant="h6" color="error">{error}</Typography>
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f4f6f8' }}>
//       <Sidebar />
//       <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//           <Typography variant="h4">Dashboard Overview</Typography>
//           <div>
//             <Button variant="outlined" style={{ marginRight: '10px' }}>Export Report</Button>
//             <Button variant="contained" color="primary">New Transaction</Button>
//           </div>
//         </div>

//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '20px' }}>
//   <Card>
//     <CardContent>
//       <Typography variant="h6">Total Customers</Typography>
//       <Typography variant="h5">{stats.totalCustomers}</Typography>
//     </CardContent>
//   </Card>
//   <Card>
//     <CardContent>
//       <Typography variant="h6">Active Policies</Typography>
//       <Typography variant="h5">{stats.activePolicies}</Typography>
//     </CardContent>
//   </Card>
//   <Card>
//     <CardContent>
//       <Typography variant="h6">Total Amount</Typography>
//       <Typography variant="h5">{stats.totalAmount}</Typography>
//     </CardContent>
//   </Card>
//   <Card>
//     <CardContent>
//       <Typography variant="h6">Pending Claims</Typography>
//       <Typography variant="h5">{stats.pendingClaims}</Typography>
//     </CardContent>
//   </Card>
// </div>

//         <Card>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>Recent Transactions</Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Transaction ID</TableCell>
//                     <TableCell>Policy Holder Name</TableCell>
//                     <TableCell>Policy Name</TableCell>
//                     <TableCell>Amount</TableCell>
//                     <TableCell>Transaction Date</TableCell>
//                     <TableCell>Earning</TableCell>
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
//                       <TableCell style={{ color: 'green' }}>&#8377; {(transaction.amount * 0.075).toFixed(2)}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <Pagination
//               count={totalPages}
//               page={page}
//               onChange={handlePageChange}
//               variant="outlined"
//               shape="rounded"
//               style={{ marginTop: '20px' }}
//             />
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// };

// export default AdminLandingPage;




// import React, { useState, useEffect } from 'react';
// import { Sidebar } from '../../Sidebar';
// import { Card, CardContent, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Pagination, CircularProgress } from '@mui/material';
// import axios from 'axios';
// import { Users, FileText, AlertCircle } from 'lucide-react';

// const RupeeSign = () => {
//   return <span style={{ fontSize: 30 , color: 'green' }} >&#8377;</span>;
// };

// const stats = [
//   { icon: Users, label: 'Total Customers', value: '2,543', change: '+12.5%', positive: true },
//   { icon: FileText, label: 'Active Policies', value: '1,789', change: '+8.2%', positive: true },
//   { icon: RupeeSign, label: 'Revenue', value: '$125,430', change: '+15.3%', positive: true },
//   { icon: AlertCircle, label: 'Pending Claims', value: '23', change: '-5.1%', positive: false }
// ];

// const AdminLandingPage = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [statsData, setStatsData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5555/api/transactions/getalltransaction`);
        
//         setTransactions(response.data.content);
//         setTotalPages(response.data.totalPages);
//       } catch (err) {
//         console.error('Error fetching transactions:', err);
//         setError('Failed to fetch transactions');
//       }
//     };

//     const fetchStats = async () => {
//       try {
//         const response = await axios.get('http://localhost:5555/api/transactions/stats');
        
//         setStatsData(response.data);
//       } catch (err) {
//         console.error('Error fetching stats:', err);
//         setError('Failed to fetch stats');
//       }
//     };

//     Promise.all([fetchTransactions(), fetchStats()]).then(() => {
//       setLoading(false);
//     });
//   }, [page]);

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   if (loading) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{ textAlign: 'center', marginTop: '20px' }}>
//         <Typography variant="h6" color="error">{error}</Typography>
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f4f6f8' }}>
//       <Sidebar />
//       <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//           <Typography variant="h4">Dashboard Overview</Typography>
//           <div>
//             <Button variant="outlined" style={{ marginRight: '10px' }}>Export Report</Button>
//             <Button variant="contained" color="primary">New Transaction</Button>
//           </div>
//         </div>

//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '20px' }}>
//           {stats.map((stat, index) => {
//             const Icon = stat.icon;
//             return (
//               <Card key={index}>
//                 <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Icon size={32} color={stat.positive ? 'green' : 'red'} />
//                   <Typography variant="h6">{stat.label}</Typography>
//                   <Typography variant="h5">{index === 0 ? statsData.totalCustomers : index === 1 ? statsData.activePolicies : index === 2 ? statsData.totalAmount : statsData.pendingClaims}</Typography>
//                   <Typography style={{ color: stat.positive ? 'green' : 'red' }}>{stat.change}</Typography>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         <Card>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>Recent Transactions</Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Transaction ID</TableCell>
//                     <TableCell>Policy Holder Name</TableCell>
//                     <TableCell>Policy Name</TableCell>
//                     <TableCell>Amount</TableCell>
//                     <TableCell>Transaction Date</TableCell>
//                     <TableCell>Earning</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {transactions.map((transaction) => (
//                     <TableRow key={transaction.transactionId}>
//                       <TableCell>{transaction.transactionId}</TableCell>
//                       <TableCell>{transaction.policyHolderName}</TableCell>
//                       <TableCell>{transaction.policyName}</TableCell>
//                       <TableCell>&#8377; {transaction.amount}</TableCell>
//                       <TableCell>{new Date(transaction.transactionDate).toLocaleString()}</TableCell>
//                       <TableCell style={{ color: 'green' }}>&#8377; {(transaction.amount * 0.075).toFixed(2)}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <Pagination
//               count={totalPages}
//               page={page}
//               onChange={handlePageChange}
//               variant="outlined"
//               shape="rounded"
//               style={{ marginTop: '20px' }}
//             />
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// };

// export default AdminLandingPage;

import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../Sidebar';
import { Card, CardContent, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';
import { Users, FileText, BarChart3 } from 'lucide-react';

const RupeeSign = () => {
  return <span style={{ fontSize: 30, color: 'green' }}>&#8377;</span>;
};

const stats = [
  { icon: Users, label: 'Total Customers', value: '2,543', change: '+12.5%', positive: true },
  { icon: FileText, label: 'Active Policies', value: '1,789', positive: true },
  { icon: RupeeSign, label: 'Revenue', value: '$125,430', change: '+15.3%', positive: true },
  { icon: BarChart3, label: 'Profit', value: '23', change: '+5.1%', positive: true }
];

const AdminLandingPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [statsData, setStatsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/transactions/getalltransaction');
        setTransactions(response.data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions');
      }
    };

    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/transactions/stats');
        setStatsData(response.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to fetch stats');
      }
    };

    Promise.all([fetchTransactions(), fetchStats()]).then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f4f6f8' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Typography variant="h4">Dashboard Overview</Typography>
          <div>
            <Button variant="outlined" style={{ marginRight: '10px' }}>Export Report</Button>
            <Button variant="contained" color="primary">New Transaction</Button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '20px' }}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {typeof Icon === 'function' ? <Icon /> : <Icon size={32} color={stat.positive ? 'green' : 'red'} />}
                  <Typography variant="h6">{stat.label}</Typography>
                  <Typography variant="h5">{index === 0 ? statsData.totalCustomers : index === 1 ? statsData.activePolicies : index === 2 ? statsData.totalAmount : (statsData.totalAmount* 0.075).toFixed(2)}</Typography>
                  <Typography style={{ color: stat.positive ? 'green' : 'red' }}>{stat.change}</Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Recent Transactions</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell>Policy Holder Name</TableCell>
                    <TableCell>Policy Name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Transaction Date</TableCell>
                    <TableCell>Earning</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(transactions) && transactions.map((transaction) => (
                    <TableRow key={transaction.transactionId}>
                      <TableCell>{transaction.transactionId}</TableCell>
                      <TableCell>{transaction.policyHolderName}</TableCell>
                      <TableCell>{transaction.policyName}</TableCell>
                      <TableCell>&#8377; {transaction.amount}</TableCell>
                      <TableCell>{new Date(transaction.transactionDate).toLocaleString()}</TableCell>
                      <TableCell style={{ color: 'green' }}>&#8377; {(transaction.amount * 0.075).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminLandingPage;