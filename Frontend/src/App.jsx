import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './components/Pages/login-register/Loginpage';
import RegistrationPage from './components/Pages/login-register/RegistrationPage';
import AdminLandingPage from './components/Pages/Admin/AdminLandingPage';
import CustomerLandingPage from './components/Pages/Customer/CustomerLandingPage';
import InsurerLandingPage from './components/Pages/Insurer/InsurerLandingPage';
import Transaction from './components/transaction/transaction';
import PaymentGateway from './components/payment/payment';
import InsuranceForm from './components/Pages/Customer/PolicyHolder';
import InsurerRegistrationForm from "./components/Pages/Insurer/InsurerRegistrationForm"
function HomePage() {
  return (
    <div className="container text-center my-5">
      <h1 className="display-4 font-weight-bold">Welcome to Insurance Portal</h1>
      <p className="lead text-muted">
        Your trusted partner in protecting what matters most. Discover our range of insurance solutions tailored to your needs.
      </p>
    </div>
  );
}

function App() {
  
  return (

    <Router>
      <div className="min-vh-100 bg-light">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/admin" element={<AdminLandingPage />} />
            <Route path="/customer" element={<CustomerLandingPage />} />
            <Route path="/insurer" element={<InsurerLandingPage />} />
            <Route path="/getquote" element={<InsuranceForm/>} />
            <Route path="/payment" element={< PaymentGateway />} />
            <Route path="/transaction" element={<Transaction/>} />
            <Route path="/registerinsurer" element={<InsurerRegistrationForm />} />




          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
