import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, ProgressBar } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaCheck, FaTimes } from 'react-icons/fa';
import API from '../api/axiosConfig';
import './AuthPages.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  const getStrengthColor = () => {
    if (passwordStrength < 40) return 'danger';
    if (passwordStrength < 70) return 'warning';
    return 'success';
  };

  const getStrengthLabel = () => {
    if (passwordStrength < 40) return 'Weak';
    if (passwordStrength < 70) return 'Medium';
    return 'Strong';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.userName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      await API.post('/api/user/register', {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || 'Registration failed. Username or email may already exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100 py-5">
          <Col lg={6} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="auth-card">
                <Card.Body className="p-5">
                  <div className="text-center mb-4">
                    <div className="auth-icon-wrapper">
                      <FaUserPlus className="auth-icon" />
                    </div>
                    <h2 className="auth-title">Create Account</h2>
                    <p className="auth-subtitle">Join PosePerfect and start your journey</p>
                  </div>

                  {error && (
                    <Alert variant="danger" className="auth-alert">
                      {error}
                    </Alert>
                  )}

                  {success && (
                    <Alert variant="success" className="auth-alert">
                      Registration successful! Redirecting to login...
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label className="auth-label">Username</Form.Label>
                      <div className="input-with-icon">
                        <FaUser className="input-icon" />
                        <Form.Control
                          type="text"
                          name="userName"
                          placeholder="Choose a username"
                          value={formData.userName}
                          onChange={handleChange}
                          className="auth-input"
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="auth-label">Email Address</Form.Label>
                      <div className="input-with-icon">
                        <FaEnvelope className="input-icon" />
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          className="auth-input"
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="auth-label">Password</Form.Label>
                      <div className="input-with-icon">
                        <FaLock className="input-icon" />
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={handleChange}
                          className="auth-input"
                        />
                      </div>
                      {formData.password && (
                        <div className="mt-2">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <small className="text-muted">Password Strength</small>
                            <small className={`text-${getStrengthColor()}`}>{getStrengthLabel()}</small>
                          </div>
                          <ProgressBar
                            now={passwordStrength}
                            variant={getStrengthColor()}
                            style={{ height: '4px' }}
                          />
                        </div>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="auth-label">Confirm Password</Form.Label>
                      <div className="input-with-icon">
                        <FaLock className="input-icon" />
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="auth-input"
                        />
                        {formData.confirmPassword && (
                          <span className="password-match-icon">
                            {formData.password === formData.confirmPassword ? (
                              <FaCheck className="text-success" />
                            ) : (
                              <FaTimes className="text-danger" />
                            )}
                          </span>
                        )}
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Check
                        type="checkbox"
                        label={
                          <span>
                            I agree to the{' '}
                            <Link to="#" className="auth-link">
                              Terms & Conditions
                            </Link>
                          </span>
                        }
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="auth-checkbox"
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      className="btn-primary-gradient w-100 py-3"
                      disabled={loading || success}
                    >
                      {loading ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                  </Form>

                  <div className="text-center mt-4">
                    <p className="auth-footer-text">
                      Already have an account?{' '}
                      <Link to="/login" className="auth-link">
                        Login
                      </Link>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;
