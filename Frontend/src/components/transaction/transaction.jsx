// src/TransactionPage.js
import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import { Button, Typography, Paper, CircularProgress, Alert, TextField, Rating, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../../config/api';

const TransactionPage = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Feedback states
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const MAX_WORDS = 300;
  const roleName = user?.role;

  useEffect(() => {
    const fetchTransaction = async () => {
      if (!user?.uid) {
        setError('User ID is not available.');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/insurance/transactions/byuserid/${user.uid}`);
        if (!response.ok) throw new Error('Unable to fetch transaction for user');
        const jsonData = await response.json();
        setTransaction(jsonData);
      } catch (err) {
        console.error('Error fetching transaction:', err);
        setError('Failed to fetch transaction data.');
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [user]);

  const generatePDF = () => {
    if (!transaction) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    const title = 'InsuranceHub';
    doc.text(title, doc.internal.pageSize.getWidth() / 2, 70, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Transaction Invoice', doc.internal.pageSize.getWidth() / 2, 80, { align: 'center' });

    let y = 120;
    doc.setFontSize(10);
    const details = [
      `Transaction ID: ${transaction.transactionId}`,
      `Policy Holder Name: ${transaction.policyHolderName}`,
      `Policy Name: ${transaction.policyName}`,
      `Amount: ₹ ${transaction.amount.toFixed(2)}`,
      `Transaction Date: ${new Date(transaction.transactionDate).toLocaleString()}`
    ];
    details.forEach(text => {
      doc.text(text, doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
      y += 10;
    });

    doc.text('Thank you for choosing Insure Hub!', doc.internal.pageSize.getWidth() / 2, y + 20, { align: 'center' });
    const sanitizedName = transaction.policyHolderName.replace(/[<>:"/\\|?*]/g, '');
    doc.save(`${transaction.transactionId}_${sanitizedName}.pdf`);
  };

  const handleFeedbackSubmit = async () => {
    if (!feedbackText || !feedbackRating) return;

    try {
      const response = await fetch(`${API_BASE_URL}/insurance/feedback/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          transactionId: transaction.transactionId,
          rating: feedbackRating,
          comments: feedbackText
        })
      });
      if (!response.ok) throw new Error('Failed to submit feedback');
      setFeedbackSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Error submitting feedback');
    }
  };

  const wordCount = feedbackText.trim().split(/\s+/).filter(Boolean).length;
  const isExceeded = wordCount > MAX_WORDS;

  if (!isAuthenticated) {
    return (
      <Box sx={{ mt: 5, textAlign: 'center', fontFamily: 'Segoe UI' }}>
        <Typography variant="h6" color="error">You're not allowed to access this page without signing in!</Typography>
      </Box>
    );
  }

  if (roleName !== 'Customer') {
    return (
      <Box sx={{ mt: 5, textAlign: 'center', fontFamily: 'Segoe UI' }}>
        <Typography variant="h6" color="error">You're not authorized to access this page!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '20px', marginTop: '10vh', textAlign: 'center', fontFamily: 'Segoe UI' }}>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {transaction && (
        <Paper elevation={3} sx={{ padding: '20px', margin: '20px auto', maxWidth: 600 }}>
          <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircleIcon sx={{ color: 'green', mr: 1 }} /> Transaction Successful
          </Typography>
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="h6">Transaction Preview:</Typography>
            <Typography><strong>Transaction ID:</strong> {transaction.transactionId}</Typography>
            <Typography><strong>Policy Holder Name:</strong> {transaction.policyHolderName}</Typography>
            <Typography><strong>Policy Name:</strong> {transaction.policyName}</Typography>
            <Typography><strong>Amount:</strong> ₹ {transaction.amount.toFixed(2)}</Typography>
            <Typography><strong>Transaction Date:</strong> {new Date(transaction.transactionDate).toLocaleString()}</Typography>
          </Box>
          <Button variant="outlined" color="primary" onClick={generatePDF} sx={{ mt: 1, mb: 2 }}>
            Download PDF
          </Button>

          {/* Feedback Section */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            {!feedbackSubmitted ? (
              <>
                <Typography variant="h6">Submit Your Feedback</Typography>
                <Rating
                  name="feedback-rating"
                  value={feedbackRating}
                  onChange={(e, newValue) => setFeedbackRating(newValue)}
                  size="large"
                />
                <TextField
                  label="Your Feedback"
                  multiline
                  rows={4}
                  fullWidth
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  sx={{ mt: 2 }}
                  placeholder="Share your experience..."
                />
                <Typography sx={{ mt: 1, color: isExceeded ? 'red' : 'textSecondary' }}>
                  {wordCount}/{MAX_WORDS} words
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  disabled={isExceeded || !feedbackRating || !feedbackText.trim()}
                  onClick={handleFeedbackSubmit}
                >
                  Submit Feedback
                </Button>
              </>
            ) : (
              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <SentimentSatisfiedAltIcon sx={{ fontSize: 80, color: 'green', mb: 1 }} />
                <Typography variant="h6">Thank you for submitting your feedback!</Typography>
              </Box>
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default TransactionPage;
