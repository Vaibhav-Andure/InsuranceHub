import React, { useReducer } from 'react';
import { useSelector } from 'react-redux';
import ViewPolicy from '../../policy';
import { useNavigate } from 'react-router-dom';

// Define the initial state
const initialState = {
  showViewPolicy: false,
  showClaims: true,
  showAsst: true,
  showPolicy: true,
};

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_VIEW_POLICY':
      return {
        ...state,
        showViewPolicy: !state.showViewPolicy,
        showClaims: !state.showClaims,
        showAsst: !state.showAsst,
        showPolicy: !state.showPolicy,
      };
    default:
      return state;
  }
};

export default function CustomerLandingPage() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  // Toggle function to show/hide the ViewPolicy component
  const toggleViewPolicy = () => {
    dispatch({ type: 'TOGGLE_VIEW_POLICY' });
  };









  if (!isAuthenticated) {
    return (
      <div>
        <p className="text-danger">
          You're not allowed to access this page without signing in!
        </p>
        <button className="btn btn-info" onClick={() => navigate('/login')}>
          login
        </button>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <h1 className="text-center">Welcome, {user?.username}</h1>

        {state.showViewPolicy ? (
          <div className="row mt-5">
            <div className="col-md-12">
              <button className="btn btn-primary mb-3" onClick={toggleViewPolicy}>
                Back to main menu
              </button>
              <div style={{ height: '100vh', overflowY: 'auto' }}>
                <ViewPolicy />
              </div>
            </div>
          </div>
        ) : (
          <div className="row mt-5">
            {state.showPolicy && (
              <div className="col-md-4 d-flex">
                <div className="card shadow mb-4 flex-fill">
                  <div className="card-body text-center">
                    <h4>Your Policies</h4>
                    <p>View and manage your insurance policies</p>
                    <button className="btn btn-primary mb-3" onClick={toggleViewPolicy}>
                      view policies
                    </button>
                  </div>
                </div>
              </div>
            )}

            {state.showClaims && (
              <div className="col-md-4 d-flex">
                <div className="card shadow mb-4 flex-fill">
                  <div className="card-body text-center">
                    <h4>Claims</h4>
                    <p>Track your insurance claims</p>
                    <button className="btn btn-primary">View Claims</button>
                  </div>
                </div>
              </div>
            )}

            {state.showAsst && (
              <div className="col-md-4 d-flex">
                <div className="card shadow mb-4 flex-fill">
                  <div className="card-body text-center">
                    <h4>Contact Support</h4>
                    <p>Reach out for any assistance</p>
                    <button className="btn btn-primary">Contact Support</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}