import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../assets/images/logo.png';
import './Login.css';

const UserLogin = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');

    const { email, password } = loginData;

    if (email === 'admin@gmail.com' && password === 'adminpassword') {
      setLoginSuccess('Login successful! Redirecting as admin...');
      localStorage.setItem('token', 'admin-token');  
      onLogin(true);  
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
      return;  
    }

    try {
      const response = await fetch('https://projectmedimartwebsite-backend.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        setLoginSuccess('Login successful! Redirecting...');
        localStorage.setItem('token', data.token); 
        onLogin(data.isAdmin);  
        setTimeout(() => {
          navigate(data.isAdmin ? '/admin' : '/');  
        }, 1500);
      } else {
        setLoginError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setLoginError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-page-body">
      <div className="login-page-container">
        <div className="login-page-logo-wrapper">
          <img src={Logo} alt="Logo" className="login-page-logo" />
        </div>
        <h2 className="login-page-heading">Login</h2>
        
        {loginError && <Alert variant="danger" className="login-page-alert">{loginError}</Alert>}
        {loginSuccess && <Alert variant="success" className="login-page-alert">{loginSuccess}</Alert>}
        
        <Form onSubmit={handleLoginSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
              className="login-page-input"
            />
          </Form.Group>
          
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
              className="login-page-input"
            />
          </Form.Group>
          
          <Button variant="primary" type="submit" className="login-page-button mt-3">
            Login
          </Button>
        </Form>
        
        <div className="text-center mt-3">
          <p>Don't have an account?</p>
          <Link to="/signup">
            <Button variant="link">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
