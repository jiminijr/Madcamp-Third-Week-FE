
  import React, { useState} from "react";
  import { useLocation, useParams } from 'react-router-dom'; 
  import "./style.css";
  import Headermain from '../../header';
  import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
  
  export const About = () => {
    const { userId } = useParams();
    const [showPopup, setShowPopup] = useState(false);
    const [letterContent, setLetterContent] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [letters, setLetters] = useState([]);
  
    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);
  
    const handleLetterChange = (e) => setLetterContent(e.target.value);
    const handleAuthorChange = (e) => setAuthorName(e.target.value);
  
    const handleSubmit = () => {
      const timestamp = new Date().toLocaleString();
      setLetters([...letters, { authorName, letterContent, timestamp }]);
      setLetterContent("");
      setAuthorName("");
      closePopup();
    };
  
    return (
      <Container className="About-header">
        <Headermain userId={userId} />
        <Row>
          <Col>
  <Row className="mb-5 mt-3 pt-md-3 align-items-center">
  <Col lg="8">
    <h1 className="display-4 mb-4">Letters</h1>
    <hr className="t_border my-4 ml-0 text-left" />
  </Col>
  <Col lg="4" className="text-lg-right">
    <button onClick={openPopup} className="add-image-button">편지 남기기</button>
  </Col>
</Row>
  </Col>
  </Row>
    <Modal show={showPopup} onHide={closePopup}>
      <Modal.Header closeButton>
        <Modal.Title>편지 남기기</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>남기고 싶은 이름</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={authorName}
              onChange={handleAuthorChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>전해주고 싶은 편지</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your letter here"
              value={letterContent}
              onChange={handleLetterChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closePopup}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit Letter
        </Button>
      </Modal.Footer>
    </Modal>
  
    <div className="letters-display">
      {letters.map((letter, index) => (
        <div key={index} className="letter">
          <h5>From: {letter.authorName}</h5>
          <p>{letter.letterContent}</p>
          <p className="timestamp">{letter.timestamp}</p>
        </div>
      ))}
    </div>
  </Container>
  );
  };