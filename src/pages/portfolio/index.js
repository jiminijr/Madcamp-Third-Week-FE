import React, { useState } from "react";
import Modal from "react-modal"; // react-modal 라이브러리 사용
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";

export const Portfolio = () => {
  const dataportfolio = [
];


  const [portfolioData, setPortfolioData] = useState(dataportfolio);
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 상태
  const [newImage, setNewImage] = useState(null);
  const [newDescription, setNewDescription] = useState("");

  const openPopup = () => setShowPopup(true); // 팝업 열기
  const closePopup = () => setShowPopup(false); // 팝업 닫기

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPortfolio = [
      ...portfolioData,
      { img: URL.createObjectURL(newImage), description: newDescription, link: "#" },
    ];
    setPortfolioData(updatedPortfolio);
    closePopup();
    console.log(updatedPortfolio);
  };


  return (
    <HelmetProvider>
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
          {portfolioData.map((data, i) => {
            return (
              <div key={i} className="po_item">
                <img src={data.img} alt="" />
                <div className="content">
                  <p>{data.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </HelmetProvider>
  );
};
