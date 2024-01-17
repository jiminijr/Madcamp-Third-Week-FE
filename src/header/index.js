

import React, { useState } from "react";
import "./style.css";
import { VscGrabber, VscClose } from "react-icons/vsc";
import Home from "../pages/home";
import { Link } from "react-router-dom";
import { logotext ,socialprofils } from "../content_option";
import Themetoggle from "../components/themetoggle";
import { useParams, useLocation } from 'react-router-dom';


const Headermain = ({ userId }) => {
  console.log(userId); 
  const [isActive, setActive] = useState(true);


  const pathMatchRegex = /^\/home\/\d+(\/(gallery|letters|photobooth))?$/;

  const shouldShowHeader = ["/gallery", "/letters", "/photobooth", "/home"].some(path => 
    location.pathname === path || pathMatchRegex.test(location.pathname)
  );

  if (!shouldShowHeader) {
    return null;
  }

  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("ovhidden");
  };

  return (
    <>
      <header className="fixed-top site__header">
        <div className="d-flex align-items-center justify-content-between">
          <Link  className="navbar-brand nav_ac" to="/">
            {logotext}
          </Link>
          <div className="d-flex align-items-center">
          <Themetoggle />
          <button className="menu__button  nav_ac" onClick={handleToggle}>
            {!isActive ? <VscClose /> : <VscGrabber />}
          </button>
          
          </div>
        </div>

        <div className={`site__navigation ${!isActive ? "menu__opend" : ""}`}>
          <div className="bg__menu h-100">
            <div className="menu__wrapper">
              <div className="menu__container p-3">
                <ul className="the_menu">
                <li className="menu_item">
                <Link to={`/home/${userId}`} className="my-3">Home</Link>
                  </li>
                  <li className="menu_item">
                  <Link to={`/home/${userId}/gallery`} className="my-3" onClick={handleToggle} >Gallery</Link>
                  </li>
                  <li className="menu_item">
                  <Link to={`/home/${userId}/letters`} className="my-3" onClick={handleToggle} >Letters</Link>
                  </li>
                  <li className="menu_item">
                  <Link to={`/home/${userId}/photobooth`} className="my-3" onClick={handleToggle} >Photobooth</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="menu_footer d-flex flex-column flex-md-row justify-content-between align-items-md-center position-absolute w-100 p-3">
            <div className="d-flex">
            </div>
          </div>
        </div>
      </header>
      <div className="br-top"></div>
      <div className="br-bottom"></div>
      <div className="br-left"></div>
      <div className="br-right"></div>
      
    </>
  );
};

export default Headermain;
