import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './PoseCard.css';

const difficultyColors = {
  Basic: '#43E97B',
  Intermediate: '#FFB347',
  Advanced: '#FF6584',
  'Not Specified': '#6c757d',
};

const PoseCard = ({ pose }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/poses/${pose.id}`);
  };

  const badgeColor = difficultyColors[pose.difficultyLevel] || '#6c757d';

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <Card className="pose-card">
        <div className="pose-card-img-wrapper">
          <Card.Img
            variant="top"
            src={pose.imageUrl || 'https://via.placeholder.com/400x300?text=Yoga+Pose'}
            alt={pose.name}
            className="pose-card-img"
          />
          <div className="pose-card-overlay">
            <span className="pose-card-view">View Details →</span>
          </div>
          <Badge
            className="difficulty-badge"
            style={{ background: badgeColor }}
          >
            {pose.difficultyLevel || 'General'}
          </Badge>
        </div>
        <Card.Body className="pose-card-body">
          <Card.Title className="pose-card-title">{pose.name}</Card.Title>
          <Card.Text className="pose-card-text">
            {pose.benefits
              ? pose.benefits.length > 80
                ? pose.benefits.substring(0, 80) + '...'
                : pose.benefits
              : 'Explore the benefits of this pose.'}
          </Card.Text>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default PoseCard;
