import React, { useState } from 'react';
import './intro.css'; // CSS 스타일시트 임포트
import backgroundVideo from '../../src/assets/images/intro.mp4';
import backgroundMusic from '../../src/assets/audio/bgm.mp3'; // 배경 음악 파일 경로

function Intro() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
    const toggleAudio = () => {
    const audioEl = document.getElementsByClassName("background-audio")[0];
    if (isAudioPlaying) {
        audioEl.pause();
    } else {
        audioEl.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
    };
  
  const openLoginPopup = () => {
    setShowLoginPopup(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="intro-container">
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <button onClick={toggleAudio}>
        {isAudioPlaying ? '음악 끄기' : '음악 켜기'}
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
            <button onClick={closeLoginPopup} className="close-popup">X</button>
            <h2>Login</h2>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button className="login-btn">Login</button>
            <button className="signup-btn">Sign Up</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Intro;
