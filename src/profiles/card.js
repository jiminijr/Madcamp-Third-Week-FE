import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import './card.css';

function Card({ image, onClick  }) {
  // let navigate = useNavigate(); // useNavigate 훅 사용

  // // 카드 클릭 시 홈페이지로 이동하는 함수
  // const goToHome = () => {
  //   navigate('/home'); // '/home'은 홈페이지의 경로입니다.
  // };

  return (
    <div className="card" onClick={onClick}>
      <img src={image} alt="Profile" />
    </div>
  );
}

export default Card;

