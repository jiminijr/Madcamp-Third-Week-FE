import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Card from './card';
import Register from './register';
import './profiles.css'; // 스타일시트 임포트
import logoPath from '../../src/assets/images/gookhwa.png';
import poong from '../../src/assets/images/poong1.png';

function Profiles() {
  const [cards, setCards] = useState([]);
  const [lanterns, setLanterns] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // 백엔드에서 프로필 정보를 가져오는 API 호출
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('http://ec2-13-124-229-171.ap-northeast-2.compute.amazonaws.com/peoples/people/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData)
          setCards(responseData);
        } else {
          console.error('Failed to fetch profiles:', response.status);
        }
      } catch (error) {
        console.error('An error occurred while fetching profiles:', error);
      }
    };

    fetchData();
    
    // 랜턴 생성
    setLanterns(generateLanterns());
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  const navigate = useNavigate();

  const onCardClick = (responseData) => {
    navigate(`/home/${responseData.id}`, { state: { responseData} });
  };


  function generateLanterns() {
    const newLanterns = [];
    for (let i = 0; i < 400; i++) {
      const size = Math.random() * 50 + 50; // 50px에서 150px 사이의 크기
      newLanterns.push({
        id: i,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${Math.random() * 5 + 20}s`,
          animationDelay: `${Math.random() * 5 + 3}s`,
          left: `${Math.random() * 100}%`,
        },
      });
    }
    console.log(newLanterns);
    return newLanterns;
  }

  const handleAddCard = (newCardData) => {
    setCards((currentCards) => [
      ...currentCards,
      { ...newCardData, id: currentCards.length + 1 },
    ]);
  };

  return (
    <>
      <div className="title-container">
        <img src={logoPath} className="title-image" />
      </div>
      <div className="lantern-container">
        {lanterns.map((lantern) => (
          <img
            key={lantern.id}
            src={poong}
            style={lantern.style}
            className={`lantern lantern-${lantern.id % 2 === 0 ? 'up' : 'down'}`}
          />
        ))}
      </div>
      <div className="top-right-buttons"></div>

      <div className="profiles">
        
        {cards.map((card) => (
          <Card key={card.id} image={card.picture_url}

          onClick={() => onCardClick(card)} />
        ))}
      </div>

      <button className="floating-button" onClick={() => setShowPopup(true)}>
        +
      </button>

      {showPopup && (
        <Register show={showPopup} onClose={() => setShowPopup(false)} onRegister={handleAddCard} />
      )}
    </>
  );
}

export default Profiles;

