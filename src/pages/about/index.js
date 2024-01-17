
  import React, { useState, useEffect} from "react";
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
    const [receiver, setReceiver] = useState("");
  
    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);
  
    const handleLetterChange = (e) => setLetterContent(e.target.value);
    const handleAuthorChange = (e) => setAuthorName(e.target.value);

    const handleSubmit = async () => {
      // 폼 데이터 구성
      const letterData = {
          content: letterContent,
          author: authorName,
      };

      

  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`http://ec2-13-124-229-171.ap-northeast-2.compute.amazonaws.com/letter/${userId}/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(letterData)
        });
        console.log(accessToken)
        console.log(response)
        console.log('API Response:', response);

        if (!response.ok) {
            throw new Error('Response Error: ' + response.status);
        }
        
        const newLetter = await response.json();
        console.log('Response Data:', newLetter);
        setLetters([...letters, newLetter]);

        // 폼 초기화
        setReceiver("");
        setLetterContent("");
        setAuthorName("");
        closePopup();
    } catch (error) {
        console.error('Error:', error);
    }
};


   // 편지 목록을 불러오는 함수
   const fetchLetters = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`http://ec2-13-124-229-171.ap-northeast-2.compute.amazonaws.com/letter/list/${userId}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        if (!response.ok) {
            throw new Error('Response Error: ' + response.status);
        }
        console.log(response)
        const lettersData = await response.json();
        console.log(lettersData)
        setLetters(lettersData);
    } catch (error) {
        console.error('Error fetching letters:', error);
    }
};

// 컴포넌트 마운트 시 편지 목록 불러오기
useEffect(() => {
    fetchLetters();
}, []); // 빈 배열은 컴포넌트가 마운트될 때만 실행됨을 의미
    
  
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
    <button onClick={openPopup} className="add-image-button" >편지 남기기</button>
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
                    placeholder="당신의 이름을 입력하세요"
                    value={authorName}
                    onChange={handleAuthorChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>전해주고 싶은 편지</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="여기에 편지를 작성하세요"
                    value={letterContent}
                    onChange={handleLetterChange}
                />
            </Form.Group>
        </Form>
    </Modal.Body>

    <Modal.Footer>
        <Button variant="secondary" onClick={closePopup}>
            닫기
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
            편지 제출
        </Button>
    </Modal.Footer>
</Modal>
    <div className="letters-display">
      {letters.map((letter, index) => (
        <div key={index} className="letter">
          <h5>From: {letter.author}</h5>
          <p>{letter.content}</p>
          <p className="timestamp">{new Date(letter.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  </Container>
  );
  };