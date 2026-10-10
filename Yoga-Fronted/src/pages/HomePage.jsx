import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { motion, useInView } from 'framer-motion';
import { FaCamera, FaBrain, FaCheckCircle, FaStar, FaArrowRight, FaUsers, FaAward } from 'react-icons/fa';
import API from '../api/axiosConfig';
import PoseCard from '../components/PoseCard';
import './HomePage.css';

const HomePage = () => {
  const [featuredPoses, setFeaturedPoses] = useState([]);
  const [animatedStats, setAnimatedStats] = useState({ poses: 0, users: 0, accuracy: 0 });

  useEffect(() => {
    fetchFeaturedPoses();
  }, []);

  const fetchFeaturedPoses = async () => {
    try {
      const response = await API.get('/api/yoga-poses');
      setFeaturedPoses(response.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching poses:', error);
      setFeaturedPoses([]);
    }
  };

  const statsData = [
    { icon: FaAward, label: 'Yoga Poses', value: 50, suffix: '+' },
    { icon: FaUsers, label: 'Happy Users', value: 10000, suffix: '+' },
    { icon: FaCheckCircle, label: 'Accuracy', value: 98, suffix: '%' },
  ];

  const testimonials = [
    { name: 'Sarah Johnson', rating: 5, text: 'PosePerfect transformed my yoga practice! The AI feedback is incredibly accurate.' },
    { name: 'Mike Chen', rating: 5, text: 'Amazing app! It\'s like having a personal yoga instructor available 24/7.' },
    { name: 'Emma Williams', rating: 5, text: 'The pose detection feature is revolutionary. Highly recommend to all yogis!' },
  ];

  const howItWorks = [
    { icon: FaCamera, title: 'Capture Your Pose', description: 'Use your webcam to perform yoga poses in real-time.' },
    { icon: FaBrain, title: 'AI Analysis', description: 'Our AI analyzes your posture using advanced computer vision.' },
    { icon: FaCheckCircle, title: 'Get Feedback', description: 'Receive instant feedback and tips to perfect your form.' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="hero-content">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="hero-title">
                  Perfect Your <span className="text-gradient">Yoga Practice</span> with AI
                </h1>
                <p className="hero-subtitle">
                  Real-time pose detection and personalized feedback powered by
                  cutting-edge machine learning technology.
                </p>
                <div className="hero-buttons">
                  <Button as={Link} to="/detect" className="btn-primary-gradient btn-lg">
                    Try Pose Detection <FaArrowRight />
                  </Button>
                  <Button as={Link} to="/poses" variant="outline-light" className="btn-lg btn-outline-custom-white">
                    Browse Poses
                  </Button>
                </div>
              </motion.div>
            </Col>
            <Col lg={6} className="hero-image-col">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hero-image-wrapper"
              >
                <img
                  src="http://localhost:8085/api/yoga-poses/images/meditation.jpg"
                  alt="Yoga Practice"
                  className="hero-image"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop';
                  }}
                />
                <div className="hero-image-accent" />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="section-padding">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-5"
          >
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Three simple steps to perfect your yoga practice</p>
          </motion.div>

          <Row className="g-4">
            {howItWorks.map((step, index) => (
              <Col lg={4} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="how-it-works-card text-center">
                    <Card.Body>
                      <div className="step-icon-wrapper">
                        <step.icon className="step-icon" />
                        <div className="step-number">{index + 1}</div>
                      </div>
                      <h4 className="step-title">{step.title}</h4>
                      <p className="step-description">{step.description}</p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Poses Section */}
      <section className="section-padding bg-light-section">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Featured Poses</h2>
            <p className="section-subtitle">Start your journey with these popular yoga poses</p>
          </motion.div>

          <Row className="g-4">
            {featuredPoses.length > 0 ? (
              featuredPoses.map((pose, index) => (
                <Col lg={4} md={6} key={pose.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <PoseCard pose={pose} />
                  </motion.div>
                </Col>
              ))
            ) : (
              <Col className="text-center">
                <p>Loading poses...</p>
              </Col>
            )}
          </Row>

          <div className="text-center mt-5">
            <Button as={Link} to="/poses" className="btn-primary-gradient btn-lg">
              View All Poses <FaArrowRight />
            </Button>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section section-padding">
        <Container>
          <Row className="g-4 text-center">
            {statsData.map((stat, index) => (
              <Col lg={4} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="stat-card"
                >
                  <stat.icon className="stat-icon" />
                  <h3 className="stat-value">
                    {stat.value.toLocaleString()}
                    {stat.suffix}
                  </h3>
                  <p className="stat-label">{stat.label}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-subtitle">Join thousands of satisfied yogis worldwide</p>
          </motion.div>

          <Row className="g-4">
            {testimonials.map((testimonial, index) => (
              <Col lg={4} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="testimonial-card">
                    <Card.Body>
                      <div className="testimonial-stars">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} className="star-icon" />
                        ))}
                      </div>
                      <p className="testimonial-text">"{testimonial.text}"</p>
                      <p className="testimonial-author">- {testimonial.name}</p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section section-padding">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center cta-content"
          >
            <h2 className="cta-title">Ready to Transform Your Practice?</h2>
            <p className="cta-subtitle">
              Join PosePerfect today and experience the future of yoga training
            </p>
            <Button as={Link} to="/register" className="btn-primary-gradient btn-lg">
              Get Started Free <FaArrowRight />
            </Button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
