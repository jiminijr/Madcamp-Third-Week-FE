
import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from 'react-router-dom'; 
import Headermain from '../../header';
import Profiles from "../../profiles/profiles";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content_option";
import { Link } from "react-router-dom";

const accessToken = localStorage.getItem('accessToken');

export const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams();
  console.log( userId , 'home userID')

  const userData = location.state?.responseData;

  useEffect(() => {
    if (userData === undefined) {
      // userData가 없는 경우 Profiles 페이지로 리디렉션
      navigate('/profiles');
    }
  }, [userData, navigate]);

    // userData가 없는 경우 렌더링을 방지하거나, 대체 UI를 표시
    if (userData === undefined) {
      return null; // 또는 대체 컴포넌트 렌더링
    }
    
  return (
    <HelmetProvider>
      <Headermain userId={userId} />
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title> {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="intro_sec d-block d-lg-flex align-items-center ">
          <div
            className="h_bg-image order-1 order-lg-2 h-100 "
            style={{ backgroundImage: `url(${introdata.your_img_url})` }}
          ></div>
          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center ">
              <div className="intro mx-auto">
              <h2 className="mb-1x">{userData.name}</h2>
                <h1 className="fluidz-48 mb-1x">
                  <Typewriter
                    options={{
                      strings: [
                        userData.date,
                        userData.exis,
                        userData.motto,
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 10,
                    }}
                  />
                </h1>
                <p className="mb-1x">{userData.introduction}</p>
                <div className="intro_btn-action pb-5">
                  <Link to="/portfolio" className="text_2">
                    <div id="button_p" className="ac_btn btn ">
                      Gallery
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                  <Link to="/contact">
                    <div id="button_h" className="ac_btn btn">
                      Contact Me
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};

export default Home;