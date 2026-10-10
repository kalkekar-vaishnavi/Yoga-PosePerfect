import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaLeaf, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

const NavbarComponent = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/poses', label: 'Poses' },
    { path: '/detect', label: 'Detect' },
    { path: '/about', label: 'About' },
    { path: '/feedback', label: 'Feedback' },
  ];

  return (
    <Navbar
      expand="lg"
      fixed="top"
      variant={scrolled ? 'light' : 'dark'}
      className={`custom-navbar ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand">
          <FaLeaf className="brand-icon" />
          <span className="brand-text">PosePerfect</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" className="custom-toggler" />

        <Navbar.Collapse id="main-nav">
          <Nav className="mx-auto">
            {navLinks.map((link) => (
              <Nav.Link
                key={link.path}
                as={Link}
                to={link.path}
                className={`nav-item-link ${location.pathname === link.path ? 'active-link' : ''}`}
              >
                {link.label}
              </Nav.Link>
            ))}
          </Nav>

          <div className="nav-auth-buttons">
            {isLoggedIn ? (
              <div className="d-flex align-items-center gap-2">
                <div className="user-avatar">
                  <FaUser />
                </div>
                <Button
                  variant="link"
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> Logout
                </Button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-light"
                  className="auth-btn auth-btn-login"
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  className="auth-btn auth-btn-register"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
