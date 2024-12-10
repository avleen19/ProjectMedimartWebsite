import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css'; 
import Logo from '../../assets/images/logo.png';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Sign-up successful! Welcome aboard.');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch (error) {
      setError('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-form-wrapper">
          <h2 className="signup-title">Create an Account</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" className="signup-btn">
              Sign Up
            </Button>
          </Form>
          <p className="signup-footer">
            Already have an account? <a href="/login">Log In</a>
          </p>
        </div>
        <div className="signup-image">
          <div className="image-overlay">
            <img src={Logo} alt="Platform Logo" className="logo" />
            <h1 className="animated-text">Welcome to Our Platform</h1>
            <p>Join us today and explore products!</p>
            <Button variant="light" className="explore-btn">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
