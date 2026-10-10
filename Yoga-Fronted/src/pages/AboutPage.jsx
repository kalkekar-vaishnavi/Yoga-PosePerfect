import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaReact, FaJava, FaBrain, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiSpringboot, SiTensorflow, SiMysql } from 'react-icons/si';
import './AboutPage.css';

const AboutPage = () => {
  const techStack = [
    { icon: FaReact, name: 'React 19', color: '#61DAFB' },
    { icon: SiSpringboot, name: 'Spring Boot', color: '#6DB33F' },
    { icon: SiTensorflow, name: 'TensorFlow.js', color: '#FF6F00' },
    { icon: FaBrain, name: 'MediaPipe', color: '#6C63FF' },
    { icon: SiMysql, name: 'MySQL', color: '#4479A1' },
    { icon: FaJava, name: 'Java 17', color: '#007396' },
  ];

  const team = [
    {
      name: 'Dr. Sarah Martinez',
      role: 'Yoga Expert & Advisor',
      image: 'https://i.pravatar.cc/300?img=5',
    },
    {
      name: 'Alex Chen',
      role: 'Lead Developer',
      image: 'https://i.pravatar.cc/300?img=12',
    },
    {
      name: 'Emily Johnson',
      role: 'AI/ML Engineer',
      image: 'https://i.pravatar.cc/300?img=9',
    },
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="about-hero-title">About PosePerfect</h1>
            <p className="about-hero-subtitle">
              Revolutionizing yoga practice through AI-powered pose detection
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="mission-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section-heading">Our Mission</h2>
                <p className="mission-text">
                  At PosePerfect, we believe that everyone deserves access to high-quality
                  yoga instruction. Our mission is to democratize yoga education by combining
                  ancient wisdom with cutting-edge technology.
                </p>
                <p className="mission-text">
                  Using advanced computer vision and machine learning, we provide real-time
                  feedback on your yoga poses, helping you practice safely and effectively
                  from anywhere in the world.
                </p>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mission-image-wrapper"
              >
                <img
                  src="http://localhost:8085/api/yoga-poses/images/flow.png"
                  alt="Yoga Practice"
                  className="mission-image"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&h=400&fit=crop';
                  }}
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="tech-stack-section">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Powered By Modern Technology</h2>
            <p className="section-subtitle">
              Built with industry-leading frameworks and tools
            </p>
          </motion.div>

          <Row className="g-4">
            {techStack.map((tech, index) => (
              <Col lg={4} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="tech-card text-center">
                    <Card.Body>
                      <tech.icon
                        className="tech-icon"
                        style={{ color: tech.color }}
                      />
                      <h4 className="tech-name">{tech.name}</h4>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="team-section">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              Passionate individuals dedicated to improving your yoga journey
            </p>
          </motion.div>

          <Row className="g-4 justify-content-center">
            {team.map((member, index) => (
              <Col lg={4} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="team-card text-center">
                    <Card.Body>
                      <div className="team-image-wrapper">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="team-image"
                        />
                      </div>
                      <h4 className="team-name">{member.name}</h4>
                      <p className="team-role">{member.role}</p>
                      <div className="team-social">
                        <a href="#!" className="social-icon">
                          <FaGithub />
                        </a>
                        <a href="#!" className="social-icon">
                          <FaLinkedin />
                        </a>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="contact-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="section-title">Get In Touch</h2>
                <p className="section-subtitle mb-4">
                  Have questions or feedback? We'd love to hear from you!
                </p>

                <div className="contact-info">
                  <div className="contact-item">
                    <FaMapMarkerAlt className="contact-icon" />
                    <span>123 Yoga Street, Wellness City, WC 12345</span>
                  </div>
                  <div className="contact-item">
                    <FaEnvelope className="contact-icon" />
                    <span>hello@poseperfect.com</span>
                  </div>
                  <div className="contact-item">
                    <FaPhone className="contact-icon" />
                    <span>+91 98765 43210</span>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;
