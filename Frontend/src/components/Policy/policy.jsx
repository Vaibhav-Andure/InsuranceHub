import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomizedSwitches from '../switch/custswitch';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Grid,
  Button,
  Typography
} from '@mui/material';

import { useDispatch } from "react-redux";
import { setPolicy, clearPolicy } from "../../redux/slices/policiesSlice";

const PolicyBenefits = ({ benefits , comparePolicies}) => {
  const splitBenefits = (benefits) => {
    return benefits.split(',').map((benefit, index) => (
      <TableRow key={index}>
        <TableCell>{benefit.trim()}</TableCell>
      </TableRow>
    ));
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s ease',
      width:"500px",
      height: "520px",
      marginLeft:  comparePolicies.length >  0  ?   "100px": "60vh"  ,
      maxWidth: "500px",
    }}>
      <Typography variant="h6">Policy Benefits</Typography>
      <TableContainer component={Paper} style={{
        maxHeight: 'calc(100% - 50px)',
        overflowY: 'auto',
      }}>
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
      {/* <Button 
        onClick={onClose} 
        style={{
          padding: '0.5rem 1rem',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          fontWeight: '500',
          backgroundColor: '#ff6b6b',
        }}
      >
        ×
      </Button> */}
    </div>
  );
};

const PolicyInfo = ({ policy  , comparePolicies}) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s ease',
      // width: 'auto',
      height: "520px",
      width:"500px",
      marginLeft:  comparePolicies.length >  0  ?   "100px": "60vh"  ,
      maxWidth: '500px',
    }}>
      <Typography variant="h6">Policy Information</Typography>
      <p><strong>Policy Number:</strong> {policy.policyNumber}</p>
      <p><strong>Coverage Amount:</strong> {policy.coverageAmount}</p>
      <p><strong>Coverage Type:</strong> {policy.coverageType}</p>
      <p><strong>Waiting Period:</strong> {policy.waitingPeriod} days</p>
      <p><strong>Renewal Terms:</strong> {policy.renewalTerms}</p>
      <p><strong>Claim Process:</strong> {policy.claimProcess}</p>
      <p><strong>Insurer:</strong> {policy.insurer && policy.insurer.insurerName}</p>
    </div>
  );
};

const PolicyComparison = ({ policies, onRemove }) => {





  const [topMargin, setTopMargin] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Adjust the top margin based on scroll position
      setTopMargin(scrollY > 100 ? scrollY - 100 : 0); // Example: start adjusting after 100px
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
   
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      position:"relative",
      display: 'flex',
      flexDirection: 'column',
      // transition: 'transform 3s ease',
      transition: 'margin-top 0.3s ease',
      width: '500px',
      height: "auto",
      marginLeft:"150px",
      maxWidth: '1000px',
       marginTop: `${topMargin}px`
    }}>
                        <Typography variant="h6" align="center">
                Compare
</Typography>

    
      <br/>
      <Grid container spacing={2}>
        {policies.map(policy => (
          <Grid item key={policy.policyId} xs={12}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              display: 'flex',
              width:"450px",
              height:"45vh",
              flexDirection: 'column',
              transition: 'transform 0.3s ease',
            }}>
              
              <Typography variant="h6"> <strong> {policy.policyName} </strong></Typography>
              <p><strong>Base Premium:</strong> {policy.premiumAmount}</p>
              <p><strong>Terms:</strong> {policy.policyTerms} years</p>
              <p><strong>Coverage Amount:</strong> {policy.coverageAmount}</p>
              <p><strong>Coverage Type:</strong> {policy.coverageType}</p>
              <p><strong>Waiting Period:</strong> {policy.waitingPeriod} days</p>
              <br/>
              <br/>


              <Button 
                onClick={() => onRemove(policy.policyId)} 
                style={{
                  padding: '0.5rem 1rem',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontWeight: '500',
                  backgroundColor: 'red',
                }}
              >
                Remove
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>
     
    </div>
   
  );
};

const ViewPolicy = () => {
  const [policies, setPolicies] = useState([]);
  const [error, setError] = useState(null);
  const [checkedPolicies, setCheckedPolicies] = useState({});
  const [activeBenefitsPolicy, setActiveBenefitsPolicy] = useState(null);
  const [activeInfoPolicy, setActiveInfoPolicy] = useState(null);
  const [sortOption, setSortOption] = useState('premium-low-high');
  const [sortedPolicies, setSortedPolicies] = useState([]);
  const [comparePolicies, setComparePolicies] = useState([]);
  const [selectedPolicyForComparison, setSelectedPolicyForComparison] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPolicies();
  }, []);

  useEffect(() => {
    sortPolicies();
  }, [sortOption, policies]);

  const fetchPolicies = async () => {
    try {
      const response = await fetch('http://localhost:8251/insurance/policies/getallpolicies');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setPolicies(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handlebuy = (policyID) => {
    navigate("/getquote");
  };

  const dispatch = useDispatch();
  
  const handleSwitchChange = (event, policy) => {
    setCheckedPolicies((prevState) => ({
      ...prevState,
      [policy.policyId]: event.target.checked,
    }));
  
    if (event.target.checked) {
      dispatch(setPolicy(policy)); // Dispatch the entire policy object
  
      setTimeout(() => handlebuy(policy.policyId), 750);
    } else {
      dispatch(clearPolicy());
    }
  };
  const toggleBenefits = (policyID) => {
    setActiveBenefitsPolicy(activeBenefitsPolicy === policyID ? null : policyID);
  };

  const toggleInfo = (policyID) => {
    setActiveInfoPolicy(activeInfoPolicy === policyID ? null : policyID);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortPolicies = () => {
    const sortedPolicies = [...policies];
    switch (sortOption) {
      case 'premium-low-high':
        sortedPolicies.sort((a, b) => parseInt(a.premiumAmount) - parseInt(b.premiumAmount));
        break;
      case 'premium-high-low':
        sortedPolicies.sort((a, b) => parseInt(b.premiumAmount) - parseInt(a.premiumAmount));
        break;
      case 'coverage-low-high':
        sortedPolicies.sort((a, b) => parseInt(a.coverageAmount) - parseInt(b.coverageAmount));
        break;
      case 'coverage-high-low':
        sortedPolicies.sort((a, b) => parseInt(b.coverageAmount) - parseInt(a.coverageAmount));
        break;
      case 'tenure-low-high':
        sortedPolicies.sort((a, b) => a.policyTerms - b.policyTerms);
        break;
      case 'tenure-high-low':
        sortedPolicies.sort((a, b) => b.policyTerms - a.policyTerms);
        break;
      default:
        break;
    }
    setSortedPolicies(sortedPolicies);
  };

  const handleCompare = (policyID) => {
    if (comparePolicies.includes(policyID)) {
      setComparePolicies(comparePolicies.filter(id => id !== policyID));
    } else {
      setComparePolicies([...comparePolicies, policyID]);
    }
  };

  const handleCompareButtonClick = () => {
    setSelectedPolicyForComparison(true);
  };

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
        
      alignItems: 'flex-start',
    
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '2rem',
        overflow: 'auto',
        
      }}>





        <Typography variant="h4"></Typography>
        <div style={{
          marginLeft: 'auto',
        }}>
          <select onChange={handleSortChange} style={{
            padding: '0.5rem',
            fontSize: '1rem',
            borderRadius: '0.375rem',
            border: '1px solid #ddd',
            backgroundColor: '#f9fafb',
          }}>
            <option value="premium-low-high">Sort by Premium (Low to High)</option>
            <option value="premium-high-low">Sort by Premium (High to Low)</option>
            <option value="coverage-low-high">Sort by Coverage Amount (Low to High)</option>
            <option value="coverage-high-low">Sort by Coverage Amount (High to Low)</option>
            {/* <option value="tenure-low-high">Sort by Tenure (Low to High)</option>
            <option value="tenure-high-low">Sort by Tenure (High to Low)</option> */}
          </select>
        </div>
      </div>

      {error && <div style={{
        textAlign: 'left',
        color: '#6b7280',
        fontSize: '1.2rem',
      }}>Error: {error}</div>}

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: '0 20px',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '2rem',
          width: '50%',
        }}>
          {sortedPolicies.length > 0 ? sortedPolicies.map((policy) => (
            <Grid container key={policy.policyId} spacing={2}>
              <Grid item xs={12}>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth:"500px",
                  marginLeft:  comparePolicies.length >  0  ?   "100px": "60vh"  ,
                  minWidth:"500px",
                  transition: 'transform 0.3s ease',
                
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}>
                    {/* <img src={policy.insurer && policy.insurer.insurerImage} alt="Insurer" style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      marginRight: '1rem',
                    }} /> */}
                    <div style={{
                      flex: 1,
                      marginLeft: '1rem',
                    }}>
                    <Typography variant="h6" align="center">
                    {policy.policyName}
</Typography>
                    </div>
                  </div>
                  <div style={{
                    marginBottom: '1rem',
                    flex: '1',
                  }}>
                    <p><strong>Base Premium:</strong> {policy.premiumAmount}</p>
                    <p><strong>Terms:</strong> {policy.policyTerms} years</p>
                    <p><strong>Coverage Amount:</strong> {policy.coverageAmount}</p>
                    <p><strong>Coverage Type:</strong> {policy.coverageType}</p>
                    <p><strong>Waiting Period:</strong> {policy.waitingPeriod} days</p>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 'auto',
                  }}>
                    <CustomizedSwitches
                      checked={checkedPolicies[policy.policyId] || false}
                      onChange={(event) => handleSwitchChange(event, policy)}
                      trackText="Slide to Get Quote"
                    />
                  </div>
                  <Button
                    onClick={() => toggleBenefits(policy.policyId)}
                    style={{
                      marginTop: '1rem',
                      padding: '0.5rem 1rem',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontWeight: '500',
                      backgroundColor: activeBenefitsPolicy === policy.policyId 
                        ? '#ff6b6b' 
                        : '#2563eb'
                    }}
                  >
                    {activeBenefitsPolicy === policy.policyId ? 'Hide Benefits' : 'See Benefits'}
                  </Button>
                  <Button
                    onClick={() => toggleInfo(policy.policyId)}
                    style={{
                      marginTop: '1rem',
                      padding: '0.5rem 1rem',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontWeight: '500',
                      backgroundColor: activeInfoPolicy === policy.policyId 
                        ? '#ff6b6b' 
                        : '#2563eb'
                    }}
                  >
                    {activeInfoPolicy === policy.policyId ? 'Hide Info' : 'See Info'}
                  </Button>
                  <Button
                    onClick={() => handleCompare(policy.policyId)}
                    style={{
                      marginTop: '1rem',
                      padding: '0.5rem 1rem',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontWeight: '500',
                      backgroundColor: comparePolicies.includes(policy.policyId) 
                        ? 'red' 
                        : '#2563eb'
                    }}
                  >
                    {comparePolicies.includes(policy.policyId) ? 'Remove from Compare' : 'Compare'}
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12}>
                {activeBenefitsPolicy === policy.policyId && (
                  <div style={{ marginTop: '1rem', width: '100%' }}>
                    <PolicyBenefits 
                      benefits={policy.benefits} 
                      onClose={() => setActiveBenefitsPolicy(null)}
                      comparePolicies={comparePolicies}
                    />
                  </div>
                )}
                {activeInfoPolicy === policy.policyId && (
                  <div style={{ marginTop: '1rem', width: '100%' }}>
                    <PolicyInfo 
                      policy={policy} 
                      onClose={() => setActiveInfoPolicy(null)}
                      comparePolicies={comparePolicies}
                    />
                  </div>
                )}
              </Grid>
            </Grid>
          )) : (
            <p style={{
              textAlign: 'left',
              color: '#6b7280',
              fontSize: '1.2rem',
            }}>Loading...</p>
          )}
        </div>
        {comparePolicies.length > 0 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '2rem',
          width: '50%',
          border: '1px solid #ddd',
          padding: '1rem',
          borderRadius: '1rem',
          marginLeft:"10vh"
        }}>
         
            <PolicyComparison 
              policies={comparePolicies.map(id => policies.find(policy => policy.policyId === id))} 
              onRemove={(policyId) => setComparePolicies(comparePolicies.filter(id => id !== policyId))}
            />
         <br/>
         <br/>
         <br />
        </div>  )}
      </div>
    </div>
  );
};

export default ViewPolicy;