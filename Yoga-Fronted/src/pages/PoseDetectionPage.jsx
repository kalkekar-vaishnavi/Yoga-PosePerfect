import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs-core';
import { Container, Row, Col, Button, Card, Alert, Badge } from 'react-bootstrap';
import { FaCamera, FaStop, FaRedo, FaInfoCircle } from 'react-icons/fa';
import './PoseDetectionPage.css';

const PoseDetectionPage = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detector, setDetector] = useState(null);
  const [currentPose, setCurrentPose] = useState('Unknown');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize TensorFlow and detector
  useEffect(() => {
    const loadDetector = async () => {
      setIsLoading(true);
      setError('');
      try {
        await tf.ready();
        const detectorConfig = {
          modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
        };
        const detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          detectorConfig
        );
        setDetector(detector);
      } catch (err) {
        setError('Failed to load pose detection model. Please refresh the page.');
        console.error('Error loading detector:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDetector();
  }, []);

  // Draw skeleton on canvas
  const drawKeypoints = (keypoints, ctx) => {
    keypoints.forEach((keypoint) => {
      if (keypoint.score > 0.3) {
        const { x, y } = keypoint;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#6C63FF';
        ctx.fill();
      }
    });
  };

  const drawSkeleton = (keypoints, ctx) => {
    const adjacentPairs = [
      [5, 7], [7, 9],   // Left arm
      [6, 8], [8, 10],  // Right arm
      [5, 6],           // Shoulders
      [5, 11], [6, 12], // Torso
      [11, 12],         // Hips
      [11, 13], [13, 15], // Left leg
      [12, 14], [14, 16], // Right leg
    ];

    adjacentPairs.forEach(([i, j]) => {
      const kp1 = keypoints[i];
      const kp2 = keypoints[j];

      if (kp1.score > 0.3 && kp2.score > 0.3) {
        ctx.beginPath();
        ctx.moveTo(kp1.x, kp1.y);
        ctx.lineTo(kp2.x, kp2.y);
        ctx.strokeStyle = '#43E97B';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    });
  };

  // Detect pose from webcam
  const detectPose = async () => {
    if (
      !detector ||
      !webcamRef.current ||
      !webcamRef.current.video ||
      webcamRef.current.video.readyState !== 4
    ) {
      return;
    }

    const video = webcamRef.current.video;
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    try {
      const poses = await detector.estimatePoses(video);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (poses.length > 0) {
        const pose = poses[0];
        const keypoints = pose.keypoints;

        // Draw skeleton
        drawSkeleton(keypoints, ctx);
        drawKeypoints(keypoints, ctx);

        // Calculate average confidence
        const avgConfidence =
          keypoints.reduce((sum, kp) => sum + kp.score, 0) / keypoints.length;
        setConfidence(Math.round(avgConfidence * 100));

        // Simple pose classification (placeholder logic)
        const poseName = classifyPose(keypoints);
        setCurrentPose(poseName);
      } else {
        setCurrentPose('No pose detected');
        setConfidence(0);
      }
    } catch (err) {
      console.error('Error detecting pose:', err);
    }
  };

  // Simple pose classification based on keypoint positions
  const classifyPose = (keypoints) => {
    // This is a simplified placeholder. In production, you'd use a trained classifier
    const leftShoulder = keypoints[5];
    const rightShoulder = keypoints[6];
    const leftHip = keypoints[11];
    const rightHip = keypoints[12];
    const leftAnkle = keypoints[15];
    const rightAnkle = keypoints[16];

    // Check if person is standing (ankles below hips)
    if (
      leftAnkle &&
      rightAnkle &&
      leftHip &&
      rightHip &&
      leftAnkle.y > leftHip.y &&
      rightAnkle.y > rightHip.y
    ) {
      // Check if arms are raised (shoulders above hips significantly)
      if (leftShoulder && leftShoulder.y < leftHip.y - 100) {
        return 'Tree Pose (Vrksasana)';
      }
      return 'Mountain Pose (Tadasana)';
    }

    return 'General Pose';
  };

  // Start detection loop
  useEffect(() => {
    let intervalId;
    if (isDetecting) {
      intervalId = setInterval(() => {
        detectPose();
      }, 100); // Detect every 100ms
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isDetecting, detector]);

  const handleStartDetection = () => {
    setError('');
    setIsDetecting(true);
  };

  const handleStopDetection = () => {
    setIsDetecting(false);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    setCurrentPose('Unknown');
    setConfidence(0);
  };

  const handleReset = () => {
    handleStopDetection();
    setError('');
  };

  return (
    <div className="pose-detection-page">
      <Container className="py-5">
        <div className="page-header text-center mb-5">
          <h1 className="display-4 fw-bold">AI Pose Detection</h1>
          <p className="lead text-muted">
            Use your webcam to detect and analyze yoga poses in real-time
          </p>
        </div>

        {error && (
          <Alert variant="danger" className="mb-4">
            <FaInfoCircle /> {error}
          </Alert>
        )}

        <Row>
          <Col lg={8}>
            <Card className="detection-card shadow-lg">
              <Card.Body className="p-0">
                <div className="webcam-container">
                  <Webcam
                    ref={webcamRef}
                    className="webcam-feed"
                    screenshotFormat="image/jpeg"
                    videoConstraints={{
                      facingMode: 'user',
                      width: 640,
                      height: 480,
                    }}
                  />
                  <canvas ref={canvasRef} className="pose-canvas" />

                  {!isDetecting && (
                    <div className="overlay-message">
                      <FaCamera size={64} />
                      <p>Click "Start Detection" to begin</p>
                    </div>
                  )}
                </div>

                <div className="controls-bar p-3 bg-light">
                  <div className="d-flex justify-content-center gap-3">
                    {!isDetecting ? (
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleStartDetection}
                        disabled={isLoading || !detector}
                        className="px-4"
                      >
                        <FaCamera className="me-2" />
                        {isLoading ? 'Loading Model...' : 'Start Detection'}
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="danger"
                          size="lg"
                          onClick={handleStopDetection}
                          className="px-4"
                        >
                          <FaStop className="me-2" />
                          Stop Detection
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="lg"
                          onClick={handleReset}
                          className="px-4"
                        >
                          <FaRedo className="me-2" />
                          Reset
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="info-card shadow mb-4">
              <Card.Body>
                <h5 className="card-title mb-3">
                  <FaInfoCircle className="me-2 text-primary" />
                  Detection Results
                </h5>
                <div className="result-item mb-3">
                  <label className="text-muted small">Current Pose</label>
                  <h4 className="mb-0 text-primary">{currentPose}</h4>
                </div>
                <div className="result-item mb-3">
                  <label className="text-muted small">Confidence</label>
                  <div className="d-flex align-items-center gap-2">
                    <div className="progress flex-grow-1" style={{ height: '24px' }}>
                      <div
                        className={`progress-bar ${
                          confidence > 70
                            ? 'bg-success'
                            : confidence > 40
                            ? 'bg-warning'
                            : 'bg-danger'
                        }`}
                        style={{ width: `${confidence}%` }}
                      >
                        {confidence}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="result-item">
                  <label className="text-muted small">Status</label>
                  <div>
                    <Badge bg={isDetecting ? 'success' : 'secondary'} className="px-3 py-2">
                      {isDetecting ? '🟢 Detecting' : '⚪ Stopped'}
                    </Badge>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card className="instructions-card shadow">
              <Card.Body>
                <h5 className="card-title mb-3">Instructions</h5>
                <ol className="instructions-list">
                  <li>Allow camera access when prompted</li>
                  <li>Stand 5-6 feet away from the camera</li>
                  <li>Ensure good lighting and clear background</li>
                  <li>Click "Start Detection" to begin</li>
                  <li>Strike a yoga pose and hold it steady</li>
                  <li>The AI will detect your pose and show confidence</li>
                </ol>
                <Alert variant="info" className="mt-3 mb-0 small">
                  <strong>Tip:</strong> For best results, wear fitted clothing and ensure your full body is visible in the frame.
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PoseDetectionPage;
