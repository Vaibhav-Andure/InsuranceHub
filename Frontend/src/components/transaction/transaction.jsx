// src/TransactionPage.js
import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import { Button, Typography, Paper, CircularProgress, Alert } from '@mui/material'; // Import Material-UI components
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSelector } from 'react-redux';

const TransactionPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [transaction, setTransaction] = useState(null); // State to hold the single transaction
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch transaction data from the API
    const fetchTransaction = async () => {
      if (!user?.uid) {
        setError('User  ID is not available.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8251/insurance/transactions/byuserid/${user.uid}`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setTransaction(jsonData); // Set the single transaction data
      } catch (error) {
        console.error('Error fetching transaction:', error);
        setError('Failed to fetch transaction data.');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchTransaction();
  }, [user]); // Dependency on user

  const generatePDF = () => {
    if (!transaction) {
      console.error('No transaction available to generate PDF');
      return;
    }

    const doc = new jsPDF();

    // Centered title
    doc.setFontSize(16);
    const title = 'InsuranceHub';
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (doc.internal.pageSize.getWidth() - titleWidth) / 2, 70);

    // Centered subtitle
    doc.setFontSize(12);
    const subtitle = 'Transaction Invoice';
    const subtitleWidth = doc.getTextWidth(subtitle);
    doc.text(subtitle, (doc.internal.pageSize.getWidth() - subtitleWidth) / 2, 80);

    // Centered informational text
    doc.setFontSize(10);
    let y = 120;

    // Add transaction details to the PDF
    const transactionIdText = `Transaction ID: ${transaction.transactionId}`;
    const policyHolderNameText = `Policy Holder Name: ${transaction.policyHolderName}`;
    const policyNameText = `Policy Name: ${transaction.policyName}`;
    const transactionDateText = `Transaction Date: ${new Date(transaction.transactionDate).toLocaleString()}`;

    // Center-align transaction details
    doc.text(transactionIdText, (doc.internal.pageSize.getWidth() - doc.getTextWidth(transactionIdText)) / 2, y);
    y += 10;
    doc.text(policyHolderNameText, (doc.internal.pageSize.getWidth() - doc.getTextWidth(policyHolderNameText)) / 2, y);
    y += 10;
    doc.text(policyNameText, (doc.internal.pageSize.getWidth() - doc.getTextWidth(policyNameText)) / 2, y);
    y += 10;
    doc.text(`Amount: ₹ ${transaction.amount}`, (doc.internal.pageSize.getWidth() - doc.getTextWidth(`Amount: ₹${transaction.amount}`)) / 2, y);
    y += 10;
    doc.text(transactionDateText, (doc.internal.pageSize.getWidth() - doc.getTextWidth(transactionDateText )) / 2, y);
    y += 20;

    // Centered thank you message
    const thankYouText = 'Thank you for choosing Insure Hub!';
    doc.text(thankYouText, (doc.internal.pageSize.getWidth() - doc.getTextWidth(thankYouText)) / 2, y);

    // Create a sanitized filename
    const sanitizedPolicyHolderName = transaction.policyHolderName.replace(/[<>:"/\\|?*]/g, ''); // Remove invalid characters
    const filename = `${transaction.transactionId}_${sanitizedPolicyHolderName}.pdf`;

    // Save the PDF with the transaction ID and policy holder name as the filename
    doc.save(filename);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', marginTop: "10vh" }}>
      

      {loading && <CircularProgress />} {/* Loading indicator */}
      {error && <Alert severity="error">{error}</Alert>} {/* Error message */}

      {transaction && (

        
        <Paper elevation={3} style={{ padding: '20px', margin: '20px auto', maxWidth: '600px' }}>


<Typography variant="h4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CheckCircleIcon style={{ color: 'green', marginRight: '8px' }} /> {/* Green check icon */}
        Transaction Successful
      </Typography>


      <br/>
          <Typography variant="h6">Transaction Preview:</Typography>
          <div>
            <Typography><strong>Transaction ID:</strong> {transaction.transactionId}</Typography>
            <Typography><strong>Policy Holder Name:</strong> {transaction.policyHolderName}</Typography>
            <Typography><strong>Policy Name:</strong> {transaction.policyName}</Typography>
            <Typography><strong>Amount:</strong> ₹ {transaction.amount.toFixed(2)}</Typography>
            <Typography><strong>Transaction Date:</strong> {new Date(transaction.transactionDate).toLocaleString()}</Typography>
          </div>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={generatePDF} 
            style={{ marginTop: '20px' }}
          >
            Download PDF
          </Button>

          <br />
          <Typography variant="h6">Thank you for choosing Insure Hub</Typography>
        </Paper>
      )}
    </div>
  );
};

export default TransactionPage;