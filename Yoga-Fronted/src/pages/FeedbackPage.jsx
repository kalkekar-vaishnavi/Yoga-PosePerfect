import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import API from '../api/axiosConfig';
import './FeedbackPage.css';

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    message: '',
    rate: 0,
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleStarClick = (rating) => {
    setFormData({ ...formData, rate: rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.name || !formData.message) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.rate === 0) {
      setError('Please select a rating');
      return;
    }

    setLoading(true);

    try {
      await API.post('/api/feedback/add', formData);
      setSuccess(true);
      setFormData({ name: '', address: '', message: '', rate: 0 });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-page">
      <section className="feedback-hero">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="feedback-hero-title">Share Your Feedback</h1>
            <p className="feedback-hero-subtitle">
              Help us improve PosePerfect with your valuable insights
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="feedback-form-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="feedback-card">
                  <Card.Body className="p-5">
                    {success && (
                      <Alert variant="success" className="feedback-alert animate__animated animate__fadeInDown">
                        <strong>Thank you!</strong> Your feedback has been submitted successfully.
                      </Alert>
                    )}

                    {error && (
                      <Alert variant="danger" className="feedback-alert">
                        {error}
                      </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-4">
                        <Form.Label className="feedback-label">
                          Your Name <span className="required">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          className="feedback-input"
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label className="feedback-label">
                          Location (Optional)
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          placeholder="City, Country"
                          value={formData.address}
                          onChange={handleChange}
                          className="feedback-input"
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label className="feedback-label">
                          Your Rating <span className="required">*</span>
                        </Form.Label>
                        <div className="star-rating">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`star ${
                                star <= (hoverRating || formData.rate)
                                  ? 'star-filled'
                                  : 'star-empty'
                              }`}
                              onClick={() => handleStarClick(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                            />
                          ))}
                          {formData.rate > 0 && (
                            <span className="rating-text">
                              {formData.rate} out of 5 stars
                            </span>
                          )}
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label className="feedback-label">
                          Your Message <span className="required">*</span>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          name="message"
                          rows={6}
                          placeholder="Share your experience, suggestions, or any feedback..."
                          value={formData.message}
                          onChange={handleChange}
                          className="feedback-textarea"
                        />
                      </Form.Group>

                      <Button
                        type="submit"
                        className="btn-primary-gradient w-100 py-3"
                        disabled={loading}
                      >
                        {loading ? 'Submitting...' : 'Submit Feedback'}
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-5"
          >
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-subtitle">
              Join thousands of satisfied yogis worldwide
            </p>
          </motion.div>

          <Row className="g-4">
            {[
              {
                name: 'Sarah Johnson',
                location: 'New York, USA',
                rating: 5,
                message: 'PosePerfect has completely transformed my yoga practice! The AI feedback is incredibly accurate and helps me improve every session.',
              },
              {
                name: 'Mike Chen',
                location: 'Toronto, Canada',
                rating: 5,
                message: 'Amazing app! It\'s like having a personal yoga instructor available 24/7. The pose detection is spot on!',
              },
              {
                name: 'Emma Williams',
                location: 'London, UK',
                rating: 5,
                message: 'The pose detection feature is revolutionary. Highly recommend to all yogis looking to perfect their practice!',
              },
            ].map((testimonial, index) => (
              <Col lg={4} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="testimonial-card">
                    <Card.Body>
                      <div className="testimonial-stars mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} className="star-icon-filled" />
                        ))}
                      </div>
                      <p className="testimonial-message">
                        "{testimonial.message}"
                      </p>
                      <div className="testimonial-author">
                        <strong>{testimonial.name}</strong>
                        <p className="author-location">{testimonial.location}</p>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default FeedbackPage;
