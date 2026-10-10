import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ButtonGroup } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter } from 'react-icons/fa';
import API from '../api/axiosConfig';
import PoseCard from '../components/PoseCard';
import LoadingSpinner from '../components/LoadingSpinner';
import './YogaPosesPage.css';

const YogaPosesPage = () => {
  const [poses, setPoses] = useState([]);
  const [filteredPoses, setFilteredPoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const difficulties = ['All', 'Basic', 'Intermediate', 'Advanced', 'Not Specified'];

  useEffect(() => {
    fetchPoses();
  }, []);

  useEffect(() => {
    filterPoses();
  }, [poses, selectedDifficulty, searchQuery]);

  const fetchPoses = async () => {
    setLoading(true);
    try {
      const response = await API.get('/api/yoga-poses');
      setPoses(response.data);
    } catch (error) {
      console.error('Error fetching poses:', error);
      setPoses([]);
    } finally {
      setLoading(false);
    }
  };

  const filterPoses = () => {
    let filtered = poses;

    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(
        (pose) => pose.difficultyLevel === selectedDifficulty
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (pose) =>
          pose.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pose.benefits?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pose.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPoses(filtered);
  };

  return (
    <div className="yoga-poses-page">
      {/* Hero Banner */}
      <section className="poses-hero">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="poses-hero-title">Explore Yoga Poses</h1>
            <p className="poses-hero-subtitle">
              Discover a comprehensive library of yoga poses for every skill level
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Filters Section */}
      <section className="poses-filters-section">
        <Container>
          <Row className="align-items-center g-3">
            <Col lg={8}>
              <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <Form.Control
                  type="text"
                  placeholder="Search poses by name, benefits, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </Col>
            <Col lg={4}>
              <div className="difficulty-filters">
                <FaFilter className="filter-icon" />
                <ButtonGroup className="w-100">
                  {difficulties.map((difficulty) => (
                    <Button
                      key={difficulty}
                      variant={
                        selectedDifficulty === difficulty
                          ? 'primary'
                          : 'outline-secondary'
                      }
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`difficulty-btn ${
                        selectedDifficulty === difficulty ? 'active' : ''
                      }`}
                    >
                      {difficulty}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
            </Col>
          </Row>

          <div className="filter-pills mt-3">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                className={`filter-pill ${
                  selectedDifficulty === difficulty ? 'active' : ''
                }`}
                onClick={() => setSelectedDifficulty(difficulty)}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Poses Grid */}
      <section className="poses-grid-section">
        <Container>
          {loading ? (
            <LoadingSpinner message="Loading poses..." />
          ) : filteredPoses.length > 0 ? (
            <>
              <div className="poses-count mb-4">
                <p className="text-muted">
                  Showing <strong>{filteredPoses.length}</strong> pose
                  {filteredPoses.length !== 1 ? 's' : ''}
                </p>
              </div>
              <Row className="g-4">
                {filteredPoses.map((pose, index) => (
                  <Col lg={4} md={6} key={pose.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <PoseCard pose={pose} />
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <div className="no-results">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <h3>No poses found</h3>
                <p className="text-muted">
                  Try adjusting your filters or search query
                </p>
                <Button
                  onClick={() => {
                    setSelectedDifficulty('All');
                    setSearchQuery('');
                  }}
                  className="btn-primary-gradient"
                >
                  Clear Filters
                </Button>
              </motion.div>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};

export default YogaPosesPage;
