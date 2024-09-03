import React, { useState } from 'react';
import './css/Register.css';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    nickname: '',
    phoneNumber: '',
    birthdate: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    nickname: '',
    phoneNumber: '',
    birthdate: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'username':
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
          errorMessage = '아이디는 영문자와 숫자만 가능합니다.';
        }
        break;
      case 'nickname':
        if (value.length < 2) {
          errorMessage = '닉네임은 최소 2자리 이상이어야 합니다.';
        }
        break;
      case 'phoneNumber':
        if (!/^\d{10,11}$/.test(value)) {
          errorMessage = '전화번호는 10자리 또는 11자리 숫자여야 합니다.';
        }
        break;
      case 'birthdate':
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          errorMessage = '생일은 YYYY-MM-DD 형식이어야 합니다.';
        }
        break;
      case 'password':
        if (!/^(?=.*[!@#$%^&*])(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(value)) {
          errorMessage = '비밀번호는 특수문자 포함 최소 8자리 이상이어야 합니다.';
        }
        break;
      case 'confirmPassword':
        if (value !== form.password) {
          errorMessage = '비밀번호가 일치하지 않습니다.';
        }
        break;
      default:
        break;
    }
    setErrors({
      ...errors,
      [name]: errorMessage,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 추가 유효성 검사를 수행하고, 오류가 없으면 회원가입 로직을 처리합니다.
    if (Object.values(errors).every((error) => error === '') && 
        Object.values(form).every((value) => value !== '')) {
      console.log('회원가입 정보:', form);
      // 서버로 회원가입 정보 전송 로직을 추가합니다.
    } else {
      alert('입력 정보를 다시 확인해주세요.');
    }
  };

  const getIconColor = (field) => {
    if (errors[field] !== '') {
      return 'red';
    } else if (form[field] !== '' && errors[field] === '') {
      return 'green';
    }
    return 'gray';
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">아이디</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
              <span className={`icon ${getIconColor('username')}`}>✓</span>
            </div>
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="nickname">닉네임</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={form.nickname}
                onChange={handleChange}
                required
              />
              <span className={`icon ${getIconColor('nickname')}`}>✓</span>
            </div>
            {errors.nickname && <p className="error-message">{errors.nickname}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">전화번호</label>
            <div className="input-with-icon">
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
              <span className={`icon ${getIconColor('phoneNumber')}`}>✓</span>
            </div>
            {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="birthdate">생일</label>
            <div className="input-with-icon">
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={form.birthdate}
                onChange={handleChange}
                required
              />
            </div>
            {errors.birthdate && <p className="error-message">{errors.birthdate}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <div className="input-with-icon">
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <span className={`icon ${getIconColor('password')}`}>✓</span>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <div className="input-with-icon">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <span className={`icon ${getIconColor('confirmPassword')}`}>✓</span>
            </div>
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>
          <button type="submit" className="btn-register">회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
