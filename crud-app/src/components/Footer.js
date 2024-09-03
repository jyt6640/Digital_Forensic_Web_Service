import React from 'react';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h2>안동대학교 보안셀®</h2>
          <p>yANUs</p>
          <p>주소: 경상북도 안동시 경동로 1375 공대 2호관 3층</p>
          <p>Tel: 010-4936-6620 Email: jyt6640@naver.com</p>
        </div>
        <div className="footer-icons-and-bottom">
          <div className="footer-icons">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="./img/instagram.png" alt="Instagram" />
            </a>
            <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
              <img src="./img/github.png" alt="GitHub" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <img src="./img/youtube.png" alt="YouTube" />
            </a>
          </div>
          <div className="footer-bottom">
            <img src='./img/yANUsLogo.png' alt="yANUs Logo" />
          </div>
        </div>
        <div className="footer-rights">
          <p>&copy; Copyright by 2024 yANUs Project. All Rights Reserved.</p>
          <p>Designed by Jeong</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
