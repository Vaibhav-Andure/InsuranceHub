import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const TransactionStatus = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);
 
  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await axios.get(`http://localhost:8251/insurance/transactions/byuserid/${user?.uid}`);
        setTransactions(response.data); // Assuming the response is an array of transactions
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchTransactionData();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (

<div>
    

    <Table sx={{ fontFamily: "Segoe UI" }}>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: "bold" }}>Transaction ID</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Policy Holder Name</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Policy Name</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Transaction Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        
          <TableRow key={transactions.transactionId}>
            <TableCell>{transactions.transactionId}</TableCell>
            <TableCell>{transactions.policyHolderName}</TableCell>
            <TableCell>{transactions.policyName}</TableCell>
            <TableCell>

  {"₹" + transactions.amount.toFixed(2)}

</TableCell>

           
            <TableCell>{new Date(transactions.transactionDate).toLocaleString()}</TableCell>
          </TableRow>
    
      </TableBody>
    </Table> </div>
  );
};

export default TransactionStatus;