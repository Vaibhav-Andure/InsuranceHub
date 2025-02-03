import React from 'react';

export default function InsurerLandingPage() {
  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <h1 className="text-center">Insurer Dashboard</h1>
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body text-center">
                <h4>Manage Policies</h4>
                <p>Create and update insurance policies</p>
                <button className="btn btn-primary">Manage Policies</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body text-center">
                <h4>Customer Requests</h4>
                <p>View and respond to customer inquiries</p>
                <button className="btn btn-primary">View Requests</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body text-center">
                <h4>Claims Management</h4>
                <p>Review and approve insurance claims</p>
                <button className="btn btn-primary">Manage Claims</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
