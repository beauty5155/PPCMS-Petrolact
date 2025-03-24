import React from "react";
import './Footer.css';
import { NavLink } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* <footer>
        <div className="footer-bottom mt-5">
          <div className="container-xl">
            <div className="text-center px-5 px-sm-0">PPCMS. © {year} . All Rights Reserved</div>
          </div>
        </div>
      </footer> */}
      
      <div className="footer">
        <NavLink><img src={require('../assets/logo3.jpg')} alt="Bootstrap" /></NavLink>
          Copyright © {year} | All Rights Reserved
      </div>
    </>
  )
}
export default Footer;