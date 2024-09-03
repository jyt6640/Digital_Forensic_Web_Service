import React from 'react';
import './css/LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>로그인</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">아이디</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="btn-login">로그인</button>
        </form>
        <button onClick={onClose} className="btn-close">닫기</button>
      </div>
    </div>
  );
};

export default LoginModal;
