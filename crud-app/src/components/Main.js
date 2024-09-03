import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './css/Main.css';
import './css/TextAnimation.css';
import Introduce from './Introduce';
import Footer from './Footer';
import Navbar from './Navbar';
import LoginModal from './login/LoginModal';

const Main = () => {
  const [hideArrow, setHideArrow] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const koTexts = [
    '안녕하세요! 디지털 포렌식 분석 서비스입니다.',
    '빠르고 정확하게 디지털 증거를 분석해보세요.',
    '당신의 팀과 협력하여 신속한 포렌식 작업을 수행하세요.',
    '모든 디지털 증거를 한 곳에서 관리하세요.',
    '증거 분석 진행 상황을 실시간으로 확인하세요.',
    '효율적인 작업 관리로 더 나은 결과를!',
    '간편한 디지털 포렌식 분석을 시작해보세요.'
  ];

  const enTexts = [
    'Hello! Digital Forensic Analysis Service.',
    'Analyze digital evidence quickly and accurately.',
    'Collaborate efficiently with your team for swift forensic work.',
    'Manage all your digital evidence in one place.',
    'Track the progress of evidence analysis in real-time.',
    'Achieve better results with efficient case management!',
    'Start your digital forensic analysis effortlessly.'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const introductionElement = document.getElementById("introduction");
      if (window.scrollY >= introductionElement.offsetTop - window.innerHeight / 2) {
        setHideArrow(true);
      } else {
        setHideArrow(false);
      }
    };

    const loadTextAnimations = () => {
      animateText();
      const intervalId = setInterval(() => {
        setCurrentIndex((currentIndex + 1) % koTexts.length);
        animateText();
      }, 5000);
      return () => clearInterval(intervalId); // Clean up interval
    };

    const animateText = () => {
      const ko = koTexts[currentIndex];
      const en = enTexts[currentIndex];
      const appKo = document.getElementById('animated-text-ko');
      const appEn = document.getElementById('animated-text-en');
      appKo.innerHTML = '';
      appEn.innerHTML = '';

      const textArrayKo = ko.split('');
      const textArrayEn = en.split('');
      const tagName = 'span';
      let index = 0;

      const createNode = (tagname) => {
        const tag = document.createElement(tagname);
        return tag;
      };

      const insertLetters = (textArray, app) => {
        textArray.forEach(letter => {
          const textNode = createNode(tagName);
          if (letter === ' ') {
            textNode.textContent = '\xa0';
          } else {
            textNode.textContent = letter;
          }
          app.appendChild(textNode);
        });
      };

      const addClass = () => {
        const lettersKo = Array.from(appKo.querySelectorAll(tagName));
        const lettersEn = Array.from(appEn.querySelectorAll(tagName));
        if (lettersKo[index]) {
          lettersKo[index].classList.add('text-animated');
        }
        if (lettersEn[index]) {
          lettersEn[index].classList.add('text-animated');
        }
        index++;
        if (lettersKo.length === index && lettersEn.length === index) {
          clearInterval(interval);
        }
      };

      insertLetters(textArrayKo, appKo);
      insertLetters(textArrayEn, appEn);
      const interval = setInterval(addClass, 50);
    };

    window.addEventListener('scroll', handleScroll);
    const cleanup = loadTextAnimations();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cleanup(); // Clean up animations
    };
  }, [currentIndex, koTexts.length, enTexts.length]);

  const handleTryClick = () => {
    navigate('/upload');
  };

  const handleArrowClick = (event) => {
    event.preventDefault();
    const introductionElement = document.getElementById("introduction");
    const elementPosition = introductionElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - (window.innerHeight / 2) + (introductionElement.clientHeight / 2);

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="mainpage">
      <Navbar openLoginModal={openLoginModal} />
      <div>
        <h1 id="animated-text-ko"></h1>
        <h2 id="animated-text-en"></h2>
      </div>
      <div className="mainPageSub">
        <button 
          className="btn-try" 
          onClick={handleTryClick}
        >
          사용해보기
        </button>
      </div>
      <a
        href="#"
        className={`arrow-container ${hideArrow ? 'hide' : ''}`}
        onClick={handleArrowClick}>
        <div className="arrow"></div>
        <div className="arrow"></div>
        <div className="arrow"></div>
      </a>
      <div id="introduction" className="introduction-container">
        <Introduce />
      </div>
      <Footer />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
};

export default Main;
