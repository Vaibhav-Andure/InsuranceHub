import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody ,Typography } from '@mui/material';
import { Pending, CheckCircle, Cancel } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ClaimStatus = () => {
  const [claim, setClaim] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const getClaimStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Pending style={{ color: "#FFA07A" }} />;
      case "Approved":
        return <CheckCircle style={{ color: "green" }} />;
      case "Rejected":
        return <Cancel style={{ color: "red" }} />;
      default:
        return <Pending style={{ color: "#FFA07A" }} />;
    }
  };

  useEffect(() => {
    const fetchClaimData = async () => {
      try {
        const response = await axios.get(`http://localhost:8251/insurance/claims/user/${user?.uid}`);

        setClaim(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchClaimData();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
           Claim is not available for the customer
        </Typography>
    );
}


  return (
    <Table sx={{ fontFamily: "Segoe UI" }}>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: "bold" }}>Claim ID</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Claimant Name</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Policy ID</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Transaction ID</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Claim Status</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Claim Amount</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Incident Date</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Incident Description</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Filed Date</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Approved Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow key={claim.claimId}>
          <TableCell>{claim.claimId}</TableCell>
          <TableCell>{claim.claimantName}</TableCell>
          <TableCell>{claim.policyId}</TableCell>
          <TableCell>{claim.transactionId}</TableCell>
          <TableCell>
            {getClaimStatusIcon(claim.claimStatus)} {claim.claimStatus}
          </TableCell>
          <TableCell>{claim.claimAmount}</TableCell>
          <TableCell>{claim.incidentDate}</TableCell>
          <TableCell>{claim.incidentDescription}</TableCell>
          <TableCell>{claim.filedDate}</TableCell>
          <TableCell>{claim.approvedDate}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ClaimStatus;