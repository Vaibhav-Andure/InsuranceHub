import React from 'react';

export default function AdminLandingPage() {
  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <h1 className="text-center">Admin Dashboard</h1>
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body text-center">
                <h4>Total Users</h4>
                <p>View and manage all platform users</p>
                <button className="btn btn-primary">Manage Users</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body text-center">
                <h4>Platform Statistics</h4>
                <p>Track activities and performance metrics</p>
                <button className="btn btn-primary">View Stats</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body text-center">
                <h4>Settings</h4>
                <p>Configure platform settings</p>
                <button className="btn btn-primary">Go to Settings</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
