import React, { useState, useEffect } from 'react';
import './register.css'; // 스타일시트 임포트
import logoPath from '../../src/assets/images/lamplight.png'

function Register({ show, onClose, onRegister }) {
  const [newCard, setNewCard] = useState({
    name: "",
    separationDate: "",
    role: "",
    motto: "",
    introduction: "",
    image: ""
  });



  const handleSubmit = () => {
    onRegister(newCard);
    onClose();
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewCard(prevState => ({ ...prevState, image: reader.result }));
        };
        reader.readAsDataURL(file);
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
      <button onClick={onClose} className="close-btn">X</button>
      <img src={logoPath} className="title-image1" />
      <text>그의 이름은 무엇인가요?</text>
        <input name="name" placeholder='' onChange={handleInputChange} />
        <text>그와 언제 이별을 하게 되었나요?</text>
<input
  type="date"
  name="separationDate"
  onChange={handleInputChange}
/>
<text>그는 당신에게 어떤 존재였나요?</text>
        <input name="role" placeholder='' onChange={handleInputChange} />
        <text>그의 좌우명은 무엇이었을까요?</text>
        <input name="motto" placeholder= '' onChange={handleInputChange} />
        <text>그에 대해 한 줄 소개를 해주시겠어요?</text>
        <input name="introduction" placeholder='' onChange={handleInputChange} />
        <div className="file-upload-container">
        <text>그의 영정 사진을 등록해주시겠어요?</text>
        <input type="file" name="image" onChange={handleInputChange} />
      </div>
        {newCard.image && <img src={newCard.image} alt="Preview" style={{ width: '100px', height: '100px' , marginBottom: '20px'}} />}
        <button className="register-btn" onClick={handleSubmit}>등록하기</button>
      </div>
    </div>
  );
}

export default Register;
