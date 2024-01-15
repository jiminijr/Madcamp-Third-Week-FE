
import React, { useState } from 'react';
import './register.css'; // 스타일시트 임포트
import logoPath from '../../src/assets/images/lamplight.png';

function Register({ show, onClose, onRegister }) {
  const [newCard, setNewCard] = useState({
    name: '',
    separationDate: '',
    role: '',
    motto: '',
    introduction: '',
    image: null, // 변경된 부분: 이미지를 바이너리 데이터로 저장
  });

  const [lanterns, setLanterns] = useState([]);

  const generateLanterns = () => {
    const newLanterns = [];
    for (let i = 0; i < 100; i++) {
      const size = Math.random() * 50 + 50; // 50px에서 150px 사이의 크기
      newLanterns.push({
        id: i,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${Math.random() * 5 + 60}s`,
          animationDelay: `${Math.random() * 5 + 3}s`,
          left: `${Math.random() * 100}%`,
        },
      });
    }
    setLanterns(newLanterns);
  };

  const handleButtonClick = () => {
    handleSubmit(); // 폼 제출 처리
    generateLanterns(); // 랜턴 생성
  };

  const handleSubmit = async () => {
    try {
      console.log('Submitting form:', newCard);
  
      const formData = new FormData();
      formData.append('name', newCard.name);
      formData.append('date', newCard.separationDate);
      formData.append('exis', newCard.role);
      formData.append('motto', newCard.motto);
      formData.append('introduction', newCard.introduction);
      formData.append('file', newCard.image);
  
      console.log('Form data:', formData);
      for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
    
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch('http://ec2-13-124-229-171.ap-northeast-2.compute.amazonaws.com/peoples/people/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
  
      console.log('API Response:', response);
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Response Data:', responseData);
        onRegister(responseData);
        onClose();
      } else {
        console.error('Failed to register card:', response.status);
      }
    } catch (error) {
      console.error('An error occurred while registering card:', error);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        setNewCard((prevState) => ({ ...prevState, image: file }));
      }
    } else {
      setNewCard({ ...newCard, [e.target.name]: e.target.value });
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <button onClick={onClose} className="close-btn">
          X
        </button>
        <img src={logoPath} className="title-image1" />
        <text>그의 이름은 무엇인가요?</text>
        <input name="name" placeholder="" onChange={handleInputChange} />
        <text>그와 언제 이별을 하게 되었나요?</text>
        <input type="date" name="separationDate" onChange={handleInputChange} />
        <text>그는 당신에게 어떤 존재였나요?</text>
        <input name="role" placeholder="" onChange={handleInputChange} />
        <text>그의 좌우명은 무엇이었을까요?</text>
        <input name="motto" placeholder="" onChange={handleInputChange} />
        <text>그에 대해 한 줄 소개를 해주시겠어요?</text>
        <input name="introduction" placeholder="" onChange={handleInputChange} />
        <div className="file-upload-container">
          <text>그의 영정 사진을 등록해주시겠어요?</text>
          <input type="file" name="image" onChange={handleInputChange} />
        </div>
        {newCard.image && (
          <img
            src={URL.createObjectURL(newCard.image)}
            alt="Preview"
            style={{ width: '100px', height: '100px', marginBottom: '20px' }}
          />
        )}
        <button className="register-btn" onClick={handleButtonClick}>
          등록하기
        </button>
      </div>
    </div>
  );
}

export default Register;
