import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import API from '../api/axiosConfig';
import './AuthPages.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ userName: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.userName || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await API.post('/api/user/login', formData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      navigate('/poses');
    } catch (err) {
      setError(err.response?.data || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100 py-5">
          <Col lg={5} md={7}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="auth-card">
                <Card.Body className="p-5">
                  <div className="text-center mb-4">
                    <div className="auth-icon-wrapper">
                      <FaSignInAlt className="auth-icon" />
                    </div>
                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="auth-subtitle">Login to continue your yoga journey</p>
                  </div>

                  {error && (
                    <Alert variant="danger" className="auth-alert">
                      {error}
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
                          placeholder="Enter your username"
                          value={formData.userName}
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
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleChange}
                          className="auth-input"
                        />
                      </div>
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check
                        type="checkbox"
                        label="Remember me"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="auth-checkbox"
                      />
                      <Link to="#" className="forgot-link">
                        Forgot Password?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      className="btn-primary-gradient w-100 py-3"
                      disabled={loading}
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </Button>
                  </Form>

                  <div className="text-center mt-4">
                    <p className="auth-footer-text">
                      Don't have an account?{' '}
                      <Link to="/register" className="auth-link">
                        Sign Up
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

export default LoginPage;
