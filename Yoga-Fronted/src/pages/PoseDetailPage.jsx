import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheckCircle, FaCamera } from 'react-icons/fa';
import API from '../api/axiosConfig';
import LoadingSpinner from '../components/LoadingSpinner';
import PoseCard from '../components/PoseCard';
import './PoseDetailPage.css';

const difficultyColors = {
  Basic: '#43E97B',
  Intermediate: '#FFB347',
  Advanced: '#FF6584',
  'Not Specified': '#6c757d',
};

const PoseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pose, setPose] = useState(null);
  const [relatedPoses, setRelatedPoses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPoseDetails();
    fetchRelatedPoses();
  }, [id]);

  const fetchPoseDetails = async () => {
    setLoading(true);
    try {
      const response = await API.get(`/api/yoga-poses/${id}`);
      setPose(response.data);
    } catch (error) {
      console.error('Error fetching pose details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPoses = async () => {
    try {
      const response = await API.get('/api/yoga-poses');
      const filtered = response.data.filter((p) => p.id.toString() !== id).slice(0, 3);
      setRelatedPoses(filtered);
    } catch (error) {
      console.error('Error fetching related poses:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading pose details..." />;
  }

  if (!pose) {
    return (
      <Container className="text-center" style={{ paddingTop: '150px', minHeight: '70vh' }}>
        <h2>Pose not found</h2>
        <Button onClick={() => navigate('/poses')} className="btn-primary-gradient mt-3">
          Back to Poses
        </Button>
      </Container>
    );
  }

  const badgeColor = difficultyColors[pose.difficultyLevel] || '#6c757d';
  const benefitsList = pose.benefits ? pose.benefits.split(',').map((b) => b.trim()) : [];

  return (
    <div className="pose-detail-page">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="link"
            className="back-button"
            onClick={() => navigate('/poses')}
          >
            <FaArrowLeft /> Back to Poses
          </Button>

          <Row className="mt-4">
            <Col lg={6} className="mb-4">
              <div className="pose-detail-image-wrapper">
                <img
                  src={pose.imageUrl || 'https://via.placeholder.com/600x600?text=Yoga+Pose'}
                  alt={pose.name}
                  className="pose-detail-image"
                />
                <Badge
                  className="pose-detail-badge"
                  style={{ background: badgeColor }}
                >
                  {pose.difficultyLevel || 'General'}
                </Badge>
              </div>
            </Col>

            <Col lg={6}>
              <div className="pose-detail-content">
                <h1 className="pose-detail-title">{pose.name}</h1>

                <div className="pose-detail-section">
                  <h3 className="section-heading">Description</h3>
                  <p className="section-text">
                    {pose.description || 'No description available for this pose.'}
                  </p>
                </div>

                {benefitsList.length > 0 && (
                  <div className="pose-detail-section">
                    <h3 className="section-heading">Benefits</h3>
                    <ul className="benefits-list">
                      {benefitsList.map((benefit, index) => (
                        <li key={index}>
                          <FaCheckCircle className="benefit-icon" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pose-detail-actions">
                  <Button
                    as={Link}
                    to="/detect"
                    className="btn-primary-gradient btn-lg"
                  >
                    <FaCamera /> Try This Pose
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </motion.div>

        {relatedPoses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="related-poses-section"
          >
            <h2 className="section-title text-center">Related Poses</h2>
            <Row className="g-4 mt-3">
              {relatedPoses.map((relatedPose) => (
                <Col lg={4} md={6} key={relatedPose.id}>
                  <PoseCard pose={relatedPose} />
                </Col>
              ))}
            </Row>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default PoseDetailPage;
