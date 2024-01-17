import React, { useState, useEffect } from "react";
import Modal from "react-modal"; // react-modal 라이브러리 사용
import Headermain from '../../header';
import "./style.css";
import { useLocation, useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { meta } from "../../content_option";

export const Portfolio = () => {
  const { userId } = useParams();
  const [portfolioData, setPortfolioData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newImage, setNewImage] = useState({ content: '', picture: null });
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetchGalleryList();
  }, [userId]);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setNewImage({ ...newImage, picture: file });
    }
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('receiver', userId);
    formData.append('content', newDescription);
    formData.append('picture', newImage.picture);

    console.log(newDescription)
    console.log(newImage.picture)

    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://ec2-13-124-229-171.ap-northeast-2.compute.amazonaws.com/gallery/${userId}/`,
       { method: 'POST', 
       headers: { Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
    });

    console.log(formData)
    console.log('API Response:', response);

    if (response.ok) {
      const responseData = await response.json();
      console.log('Upload successful', responseData);
      fetchGalleryList(); // 갤러리 목록 재로드
      closePopup(); // 팝업 닫기
    } else {
      console.error('Failed to upload image:', response.status);
      // 여기에 사용자에게 오류 메시지를 표시하는 로직을 추가할 수 있습니다.
    }
  } catch (error) {
    console.error('An error occurred while uploading image:', error);
    // 여기에 사용자에게 오류 메시지를 표시하는 로직을 추가할 수 있습니다.
  }
  };
  
  const fetchGalleryList = async () => {
  const accessToken = localStorage.getItem('accessToken');
  try {
  const response = await fetch(`http://ec2-13-124-229-171.ap-northeast-2.compute.amazonaws.com/gallery/list/${userId}/`, {
  method: 'GET',
  headers: {
  Authorization: `Bearer ${accessToken}`,
  },
  });
  if (response.ok) {
  const responseData = await response.json();
  setPortfolioData(responseData);
  } else {
  console.error('Failed to load gallery:', response.status);
  }
  } catch (error) {
  console.error('Error loading gallery:', error);
  }
  };
  return (
    
    <HelmetProvider>
       <Headermain userId={userId} />
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Gallery | {meta.title} </title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3 align-items-center">
  <Col lg="8">
    <h1 className="display-4 mb-4">Gallery</h1>
    <hr className="t_border my-4 ml-0 text-left" />
  </Col>
  <Col lg="4" className="text-lg-right">
    <button onClick={openPopup} className="add-image-button">이미지 추가</button>
  </Col>
</Row>
        {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>&times;</span>
            <form onSubmit={handleSubmit}>
                  <input type="file" onChange={handleImageChange} />
                  <input type="text" value={newDescription} onChange={handleDescriptionChange} />
                  <button type="submit">등록</button>
                </form>
          </div>
        </div>
      )}
  
  <div className="mb-5 po_items_ho">
  {portfolioData.map((data) => (
    <div key={data.id} className="po_item">
      <img src={data.picture} alt={`Gallery item ${data.id}`} />
      <div className="content">
        <p>{data.content}</p>
      </div>
    </div>
  ))}
</div>
      </Container>
    </HelmetProvider>
  );
};
