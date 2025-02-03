import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomizedSwitches from './switch/custswitch.jsx';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper 
} from '@mui/material';

const PolicyBenefits = ({ benefits, onClose }) => {
  const splitBenefits = (benefits) => {
    return benefits.split(',').map((benefit, index) => (
      <TableRow key={index}>
        <TableCell>{benefit.trim()}</TableCell>
      </TableRow>
    ));
  };

  return (
    <div style={styles.benefitsDrawer}>
      <div style={styles.benefitsContent}>
        <button 
          onClick={onClose} 
          style={styles.closeButton}
        >
          ×
        </button>
        <h4 style={styles.benefitsTitle}>Policy Benefits</h4>
        <TableContainer component={Paper} style={styles.benefitsTableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Benefit</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {splitBenefits(benefits)}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

const ViewPolicy = () => {
  const [policies, setPolicies] = useState([]);
  const [error, setError] = useState(null);
  const [checkedPolicies, setCheckedPolicies] = useState({});
  const [activeBenefitsPolicy, setActiveBenefitsPolicy] = useState(null);
  const [sortOption, setSortOption] = useState('premium-low-high');
  const [sortedPolicies, setSortedPolicies] = useState([]);
  const navigate = useNavigate();

  // Fetching policies on component mount
  useEffect(() => {
    fetchPolicies();
  }, []);

  // Sorting policies when sort option or policies change
  useEffect(() => {
    sortPolicies();
  }, [sortOption, policies]);

  // Fetch policies from the server
  const fetchPolicies = async () => {
    try {
      const response = await fetch('http://localhost:5555/api/auth/viewpolicy');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setPolicies(data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle buying the policy and navigate to the transaction page
  const handlebuy = (policyID) => {
    console.dir("hitting buying api for the policy buying for " + policyID);
    navigate("/payment");
  };

  // Handle the switch change (when a policy is selected/deselected)
  const handleSwitchChange = (event, policyID) => {
    setCheckedPolicies(prevState => ({
      ...prevState,
      [policyID]: event.target.checked,
    }));
    if (event.target.checked) {
      setTimeout(() => handlebuy(policyID), 750);
    }
  };

  // Toggle benefits for a specific policy
  const toggleBenefits = (policyID) => {
    setActiveBenefitsPolicy(activeBenefitsPolicy === policyID ? null : policyID);
  };

  // Handle change in sort option
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Sorting policies based on selected sort option
  const sortPolicies = () => {
    const sortedPolicies = [...policies];
    switch (sortOption) {
      case 'premium-low-high':
        sortedPolicies.sort((a, b) => parseInt(a.premium) - parseInt(b.premium));
        break;
      case 'premium-high-low':
        sortedPolicies.sort((a, b) => parseInt(b.premium) - parseInt(a.premium));
        break;
      case 'tenure-low-high':
        sortedPolicies.sort((a, b) => a.terms - b.terms);
        break;
      case 'tenure-high-low':
        sortedPolicies.sort((a, b) => b.terms - a.terms);
        break;
      default:
        break;
    }
    setSortedPolicies(sortedPolicies);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Policy Details</h1>
        <div style={styles.sortSelectContainer}>
          <select onChange={handleSortChange} style={styles.sortSelect}>
            <option value="premium-low-high">Sort by Premium (Low to High)</option>
            <option value="premium-high-low">Sort by Premium (High to Low)</option>
            <option value="tenure-low-high">Sort by Tenure (Low to High)</option>
            <option value="tenure-high-low">Sort by Tenure (High to Low)</option>
          </select>
        </div>
      </div>

      {error && <div style={styles.error}>Error: {error}</div>}

      <div style={styles.policiesContainer}>
        {sortedPolicies.length > 0 ? sortedPolicies.map((policy) => (
          <div 
            key={policy.policyID} 
            style={{
              ...styles.policyCardWrapper,
              position: 'relative',
            }}
          >
            <div style={styles.policyCard}>
              <div style={styles.policyHeader}>
                <img src={policy.insurerImage} alt="Insurer" style={styles.insurerImage} />
                <div style={styles.policyInfo}>
                  <h3 style={styles.policyName}>{policy.p_name}</h3>
                </div>
              </div>
              <div style={styles.policyDetails}>
                <p><strong>Premium:</strong> {policy.premium}</p>
                <p><strong>Terms:</strong> {policy.terms} years</p>
              </div>
              <div style={styles.switchContainer}>
                <CustomizedSwitches
                  checked={checkedPolicies[policy.policyID] || false}
                  onChange={(event) => handleSwitchChange(event, policy.policyID)}
                  trackText="Slide to Buy Policy"
                />
              </div>
              <button
                onClick={() => toggleBenefits(policy.policyID)}
                style={{
                  ...styles.benefitsButton,
                  backgroundColor: activeBenefitsPolicy === policy.policyID 
                    ? '#ff6b6b' 
                    : '#2563eb'
                }}
              >
                {activeBenefitsPolicy === policy.policyID ? 'Hide Benefits' : 'See Benefits'}
              </button>
            </div>

            {activeBenefitsPolicy === policy.policyID && (
              <PolicyBenefits 
                benefits={policy.benefits} 
                onClose={() => setActiveBenefitsPolicy(null)}
              />
            )}
          </div>
        )) : (
          <p style={styles.loading}>Loading...</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    padding: '2rem',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '2rem',
  },
  headerTitle: {
    fontSize: '2rem',
    color: '#1f2937',
    flexGrow: 1,
    textAlign : 'center',
  },
  sortSelectContainer: {
    marginLeft: 'auto',
  },
  sortSelect: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '0.375rem',
    border: '1px solid #ddd',
    backgroundColor: '#f9fafb',
  },
  policiesContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
    width: '100%',
    padding: '0 20px',
    overflow: 'hidden',
  },
  policyCardWrapper: {
    width: '100%',
    maxWidth: '500px',
    position: 'relative',
  },
  policyCard: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease',
  },
  policyHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  insurerImage: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginRight: '1rem',
  },
  policyInfo: {
    flex: 1,
    marginLeft: '1rem',
  },
  policyName: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  policyDetails: {
    marginBottom: '1rem',
    flex: '1',
  },
  switchContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  benefitsButton: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontWeight: '500',
  },
  loading: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '1.2rem',
  },
  benefitsDrawer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '400px',
    height: '100%',
    backgroundColor: 'white',
    boxShadow: '-4px 0 6px rgba(0,0,0,0.1)',
    zIndex: 1000,
    padding: '1rem',
    overflowY: 'auto',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease-in-out',
  },
  benefitsContent: {
    height: '100%',
  },
  benefitsTitle: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  benefitsTableContainer: {
    maxHeight: 'calc(100% - 50px)',
    overflowY: 'auto',
  },
};

export default ViewPolicy;