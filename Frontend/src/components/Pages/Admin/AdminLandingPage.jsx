
import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../Sidebar';
import { Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, CircularProgress, Button } from '@mui/material';
import axios from 'axios';
import { Users, FileText, BarChart3, Shield } from 'lucide-react';
import InsurerRegistrationForm from '../Insurer/InsurerRegistrationForm';

const RupeeSign = () => {
  return <span style={{ fontSize: 30, color: 'green' }}>&#8377;</span>;
};

const AdminLandingPage = () => {
  const [policyholders, setPolicyholders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [insurers, setInsurers] = useState([]); 
  const [policies, setPolicies] = useState([]); 
  const [statsData, setStatsData] = useState({});
  const [activeView, setActiveView] = useState('transactions'); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPolicyholder, setSelectedPolicyholder] = useState(null); 
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const fetchPolicyholders = async () => {
    try {
      const response = await axios.get('http://localhost:8251/insurance/policyholders/getallpolicyholders');
      setPolicyholders(response.data);
    } catch (err) {
      console.error('Error fetching policyholders:', err);
      setError('Failed to fetch policyholders');
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8251/insurance/transactions/getalltransaction');
      setTransactions(response.data);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to fetch transactions');
    }
  };

  const fetchPolicies = async () => {
    try {
      const response = await axios.get('http://localhost:8251/insurance/policies/getallpolicies');
      setPolicies(response.data);
    } catch (err) {
      console.error('Error fetching policies:', err);
      setError('Failed to fetch policies');
    }
  };

  const fetchInsurers = async () => {
    try {
      const response = await axios.get('http://localhost:8251/insurance/insurers/getallinsurer'); 
      setInsurers(response.data);
    } catch (err) {
      console.error('Error fetching insurers:', err);
      setError('Failed to fetch insurers');
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:8251/insurance/transactions/stats');
      setStatsData(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to fetch stats');
    }
  };

  useEffect(() => {
    fetchTransactions(); 
    fetchPolicyholders(); 
    fetchStats(); 
    fetchInsurers(); 
    setLoading(false);
  }, []);

  const handlePolicyholderClick = (holder) => {
    setSelectedPolicyholder(holder);
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    if (view === 'policyholders') {
      fetchPolicyholders(); 
    } else if (view === 'Policies') {
      fetchPolicies(); 
    } else if (view === 'Insurers') {
      fetchInsurers(); 
    } else if (view === 'transactions') {
      fetchTransactions(); 
    }
  };

  const handleAddInsurer = () => {
    setShowRegistrationForm(true);
  };

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
      <Sidebar setActiveView={handleViewChange} /> 
      <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <Typography variant="h4" style={{ marginBottom: '20px' }}>Dashboard Overview</Typography>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', marginBottom: '20px' }}>
          <Card onClick={() => handleViewChange('policyholders')} style={{ cursor: 'pointer' }}>
            <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Users size={32} color="green" />
              <Typography variant="h6">Total Customers</Typography>
              <Typography variant="h5">{statsData.totalCustomers || '0'}</Typography>
              <Typography style={{ color: 'green' }}>{statsData.change || '+'}0%</Typography>
            </CardContent>
          </Card>
          <Card onClick={() => handleViewChange('Policies')} style={{ cursor: 'pointer' }}>
            <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FileText size={32} color="green" />
              <Typography variant="h6">Active Policies</Typography>
              <Typography variant="h5">{statsData.activePolicies || '0'}</Typography>
              <Typography style={{ color: 'green' }}>{statsData.change || '+'}0%</Typography>
            </CardContent>
          </Card>
          <Card onClick={() => handleViewChange('transactions')} style={{ cursor: 'pointer' }}>
            <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <RupeeSign />
              <Typography variant="h6">Revenue</Typography>
              <Typography variant="h5">{statsData.totalAmount || '$0'}</Typography>
              <Typography style={{ color: 'green' }}>{statsData.change || '+'}0%</Typography>
            </CardContent>
          </Card>
          <Card onClick={() => handleViewChange('transactions')} style={{ cursor: 'pointer' }}>
            <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <BarChart3 size={32} color="green" />
              <Typography variant="h6">Profit</Typography>
              <Typography variant="h5">{(statsData.totalAmount * 0.075).toFixed(2) || '0'}</Typography>
              <Typography style={{ color: 'green' }}>{statsData.change || '+'}0%</Typography>
            </CardContent>
          </Card>
          <Card onClick={() => handleViewChange('Insurers')} style={{ cursor: 'pointer' }}>
            <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Shield size={32} color="green" />
              <Typography variant="h6">Total Insurers</Typography>
              <Typography variant="h5">{insurers.length || '0'}</Typography>
            </CardContent>
          </Card>
        </div>

        {activeView === 'policyholders' && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>All Policyholders</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Policy Holder ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Date of Birth</TableCell>
                      <TableCell>Aadhar Number</TableCell>
                      <TableCell>PAN Number</TableCell>
                      <TableCell>Contact Number</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {policyholders.length > 0 ? (
                      policyholders.map((holder) => (
                        <TableRow key={holder.policyHolderId}>
                          <TableCell>{holder.policyHolderId}</TableCell>
                          <TableCell>{holder.policyHolderName}</TableCell>
                          <TableCell>{new Date(holder.dateOfBirth).toLocaleDateString()}</TableCell>
                          <TableCell>{holder.aadharNumber}</TableCell>
                          <TableCell>{holder.panNumber}</TableCell>
                          <TableCell>{holder.contactNumber}</TableCell>
                          <TableCell>
                            <Button variant="outlined" onClick={() => handlePolicyholderClick(holder)}>Details</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} style={{ textAlign: 'center' }}>No policyholders found.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {activeView === 'Policies' && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>All Policies</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Policy ID</TableCell>
                      <TableCell>Policy Name</TableCell>
                      <TableCell>Policy Number</TableCell>
                      <TableCell>Premium Amount</TableCell>
                      <TableCell>Coverage Amount</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {policies.map((policy) => (
                      <TableRow key={policy.policyId}>
                        <TableCell>{policy.policyId}</TableCell>
                        <TableCell>{policy.policyName}</TableCell>
                        <TableCell>{policy.policyNumber}</TableCell>
                        <TableCell>&#8377; {policy.premiumAmount}</TableCell>
                        <TableCell>&#8377; {policy.coverageAmount}</TableCell>
                        <TableCell>{policy.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {activeView === 'transactions' && (
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
                    {transactions.length > 0 ? (
                      transactions.map((transaction) => (
                        <TableRow key={transaction.transactionId}>
                          <TableCell>{transaction.transactionId}</TableCell>
                          <TableCell>{transaction.policyHolderName}</TableCell>
                          <TableCell>{transaction.policyName}</TableCell>
                          <TableCell>&#8377; {transaction.amount}</TableCell>
                          <TableCell>{new Date(transaction.transactionDate).toLocaleString()}</TableCell>
                          <TableCell style={{ color: 'green' }}>&#8377; {(transaction.amount * 0.075).toFixed(2)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} style={{ textAlign: 'center' }}>No transactions found.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {activeView === 'Insurers' && (
          <div>
            {showRegistrationForm ? (
              <InsurerRegistrationForm onClose={() => setShowRegistrationForm(false)} />
            ) : (
              <div>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleAddInsurer} 
                  style={{ marginBottom: '20px' }}
                >
                  Add Insurer
                </Button>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>All Insurers</Typography>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Insurer ID</TableCell>
                            <TableCell>Insurer Name</TableCell>
                            <TableCell>License Number</TableCell>
                            <TableCell>Policies Offered</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {insurers.map((insurer) => (
                            <TableRow key={insurer.insurerId}>
                              <TableCell>{insurer.insurerId}</TableCell>
                              <TableCell>{insurer.insurerName}</TableCell>
                              <TableCell>{insurer.licenseNumber}</TableCell>
                              <TableCell>
                                {insurer.policies.length > 0 ? insurer.policies.map(policy => policy.policyName).join(', ') : 'No Policies'}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* Details Section for Selected Policyholder */}
        {selectedPolicyholder && (
          <Card style={{ marginTop: '20px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Details for {selectedPolicyholder.policyHolderName}</Typography>
              <Button variant="outlined" onClick={() => setSelectedPolicyholder(null)}>Close</Button>
              <div style={{ marginTop: '10px' }}>
                <Typography variant="subtitle1">Nominees:</Typography>
                {selectedPolicyholder.nominees.length > 0 ? (
                  <ul>
                    {selectedPolicyholder.nominees.map(nominee => (
                      <li key={nominee.nomineeId}>{nominee.nomineeName} - {nominee.relationship}</li>
                    ))}
                  </ul>
                ) : (
                  <Typography>No nominees available.</Typography>
                )}
              </div>
              <div style={{ marginTop: '10px' }}>
                <Typography variant="subtitle1">Insured Members:</Typography>
                {selectedPolicyholder.insuredMembers.length > 0 ? (
                  <ul>
                    {selectedPolicyholder.insuredMembers.map(member => (
                      <li key={member.memberId}>{member.memberName} - {member.dateOfBirth}</li>
                    ))}
                  </ul>
                ) : (
                  <Typography>No insured members available.</Typography>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AdminLandingPage;