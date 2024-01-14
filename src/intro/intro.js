import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './intro.css'; // CSS 스타일시트 임포트
import backgroundVideo from '../../src/assets/images/intro.mp4';
import backgroundMusic from '../../src/assets/audio/bgm.mp3'; // 배경 음악 파일 경로

function Intro() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/profiles');
  };
  
  // 로그인 팝업을 여는 함수
  const openLoginPopup = () => {
    setShowLoginPopup(true);
    setShowSignupPopup(false);
    document.body.style.overflow = 'hidden';
  };

  // 로그인 팝업을 닫는 함수
  const closeLoginPopup = () => {
    setShowLoginPopup(false);
    document.body.style.overflow = 'unset';
  };

  // 회원가입 팝업을 여는 함수
  const openSignupPopup = () => {
    setShowLoginPopup(false);
    setShowSignupPopup(true);
  };

  // 회원가입 팝업을 닫는 함수
  const closeSignupPopup = () => {
    setShowSignupPopup(false);
    openLoginPopup();
  };
  
    const toggleAudio = () => {
    const audioEl = document.getElementsByClassName("background-audio")[0];
    if (isAudioPlaying) {
        audioEl.pause();
    } else {
        audioEl.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
    };
  
  return (
    <div className="intro-container">
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <button onClick={toggleAudio} className="background-audio-button">
        {isAudioPlaying ? 'Music off' : 'Music on'}
      </button>
      <audio autoPlay loop className="background-audio">
  <source src={backgroundMusic} type="audio/mp3" />
</audio>

      <div className="content">
        <h1>HAVEN</h1>
        <p className="intro-text">
          <b>H</b>olding memories close,<br/>
          <b>A</b>ngels in our hearts,<br/>
          <b>V</b>oices echoing in silence,<br/>
          <b>E</b>ternal love unbroken,<br/>
          <b>N</b>ever forgotten.
        </p>
        <button className="login-button" onClick={openLoginPopup}>Login</button>
      </div>

      {showLoginPopup && (
        <div className="login-popup">
          <div className="login-content">
            <h2>Login</h2>
            <button onClick={closeLoginPopup} className="close-popup">X</button>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button className="login-btn" onClick={handleLoginClick}>Login</button>
            <button className="signup-btn" onClick={openSignupPopup}>Sign Up</button>

          </div>
        </div>
      )}
       {showSignupPopup && (
    <div className="signup-popup">
      <div className="signup-content">
        <h2>Sign Up</h2>
        <button onClick={closeSignupPopup} className="close-popup">X</button>
        <input type="email" placeholder="Email" />
        <input type="username" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="phone_number" placeholder="Phone Number" />
        <input type="nickname" placeholder="Nickname" />
        <button className="signup-submit-btn">Create Account</button>
      </div>
    </div>
  )}
</div>
  );
}

export default Intro;
