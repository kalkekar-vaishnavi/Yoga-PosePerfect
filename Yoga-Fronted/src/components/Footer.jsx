import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaLeaf, FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-gradient-border" />
      <Container>
        <Row className="footer-main py-5">
          <Col lg={4} md={6} className="mb-4 mb-lg-0">
            <div className="footer-brand">
              <FaLeaf className="footer-brand-icon" />
              <span className="footer-brand-text">PosePerfect</span>
            </div>
            <p className="footer-about-text">
              AI-powered yoga pose detection and guidance platform.
              Perfect your practice with real-time feedback powered by
              TensorFlow and MediaPipe.
            </p>
            <div className="footer-social">
              <a href="#!" className="social-link" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#!" className="social-link" aria-label="Twitter"><FaTwitter /></a>
              <a href="#!" className="social-link" aria-label="Instagram"><FaInstagram /></a>
              <a href="#!" className="social-link" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </Col>

          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/poses">Yoga Poses</Link></li>
              <li><Link to="/detect">Pose Detection</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/feedback">Feedback</Link></li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="footer-heading">Contact Us</h5>
            <ul className="footer-contact">
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span>123 Yoga Street, Wellness City</span>
              </li>
              <li>
                <FaPhone className="contact-icon" />
                <span>+91 98765 43210</span>
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                <span>hello@poseperfect.com</span>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h5 className="footer-heading">Stay Updated</h5>
            <p className="footer-newsletter-text">
              Get the latest yoga tips and app updates delivered to your inbox.
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </Col>
        </Row>

        <div className="footer-bottom">
          <Row className="align-items-center">
            <Col md={6}>
              <p className="copyright-text">
                © {new Date().getFullYear()} PosePerfect. All rights reserved.
              </p>
            </Col>
            <Col md={6} className="text-md-end">
              <div className="footer-bottom-links">
                <a href="#!">Privacy Policy</a>
                <a href="#!">Terms of Service</a>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
