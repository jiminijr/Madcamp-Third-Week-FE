import React, { useState, useEffect, useRef } from 'react';
import Card from './card';
import Register from './register'; 
import './profiles.css'; // 스타일시트 임포트
import logoPath from '../../src/assets/images/gookhwa.png'
import poong from '../../src/assets/images/poong1.png'

function Profiles() {
    const [cards, setCards] = useState([
    {
      id: 1,
      image: 'https://img.sbs.co.kr/newsnet/etv/upload/2021/05/30/30000692162_700.jpg',

    },
    {
        id: 2,
        image: 'https://news.kbs.co.kr/data/layer/602/2017/10/ZW2Yujc29jgjF.jpg',
  
      },
      {
        id: 3,
        image: 'https://mblogthumb-phinf.pstatic.net/MjAxODA3MDJfMjQ2/MDAxNTMwNTAzNjA3MDUy.4DizrvCULdsVpLqCFLZFEnenUZ_ydpJLzYGe7joe0lAg.v2iT4kRbUoozB7djA7VoszrNNET2GhLTz6-AS9ghDz0g.JPEG.luckystar_78/%EB%B0%95%EC%A4%80%EC%84%9C%EB%8B%982.jpg?type=w420',
  
      }
        
  ]);
  

  const [lanterns, setLanterns] = useState([]);

  useEffect(() => {
      setLanterns(generateLanterns());
  }, []);

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
        }
      });
    }
      console.log(newLanterns)
      return newLanterns;
  }
 const [showPopup, setShowPopup] = useState(false);

  const handleAddCard = (newCardData) => {
    setCards(currentCards => [...currentCards, { id: currentCards.length + 1, image: newCardData.image }]);
  };

  return (
    <>
      <div className="title-container">
        <img src={logoPath} className="title-image" />
      </div>
      <div className="lantern-container">
                {lanterns.map(lantern => (
                    <img 
                        key={lantern.id} 
                        src={poong} 
                        style={lantern.style} 
                        className={`lantern lantern-${lantern.id % 2 === 0 ? 'up': 'down'}` } 
                      
                    />
                ))}
            </div>
      <div className="top-right-buttons"></div>

      <div className="profiles">
        {cards.map(card => (
          <Card key={card.id} image={card.image} />
        ))}
      </div>

      <button className="floating-button" onClick={() => setShowPopup(true)}>+</button>

      {showPopup && (
        <Register 
          show={showPopup} 
          onClose={() => setShowPopup(false)} 
          onRegister={handleAddCard} 
        />
      )}
    </>
  );
}

export default Profiles;