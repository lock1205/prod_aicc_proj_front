import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../design/SignupForm.css';
import '../design/bg.css';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../redux/slice/modalSlice';
import { fetchPostItemData } from '../redux/slice/apiSlice';

import Modal from './Modal';
import NavBar from './NavBar';

const SignupForm = () => {
  const navigate = useNavigate();
  //const navigate = useNavigate();
  //navigate('/login'); javascript에서 페이지 라우팅 할 수 있음
  //const completeRegister = () => {};

  //console.log(isOpen, modalType, task);

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal({ modalType: 'register', task: null }));
  };

  const [formData, setFormData] = useState({
    id: '',
    password: '',
    name: '',
    email: '',
    company: '',
    level: '',
    phone: '',
  });

  const handleChange = (e) => {
    //const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!formData.id) {
    //   console.log('formData id');
    //   toast.error('ID가 입력되지 않았습니다.');
    //   return;
    // }
    // if (!formData.password) {
    //   toast.error('password가 입력되지 않았습니다.');
    //   return;
    // }
    // if (!formData.name) {
    //   toast.error('성함이 입력되지 않았습니다.');
    //   return;
    // }
    // if (!formData.email) {
    //   toast.error('Email이 입력되지 않았습니다.');
    //   return;
    // }
    // if (!formData.company) {
    //   toast.error('회사명이 입력되지 않았습니다.');
    //   return;
    // }
    // if (!formData.level) {
    //   toast.error('직책이 입력되지 않았습니다.');
    //   return;
    // }
    // if (!formData.phone) {
    //   toast.error('연락처가 입력되지 않았습니다.');
    //   return;
    // }
    try {
      handleOpenModal();
      await dispatch(fetchPostItemData(formData)).unwrap();
      toast.success('회원등록 완료');
      navigate('/login');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('회원 등록 실패');
    }
  };
  return (
    <div className="bg">
      <NavBar />
      <div className="Signup-wrapper">
        <div className="content">
          <div className="Signup-title">CREATE ACCOUNT</div>
          <form className="" onSubmit={handleSubmit}>
            <div className="id ">
              <p>ID</p>
              <input
                className="bg-gray-300 text-gray-900"
                type="text"
                name="id"
                id=""
                placeholder="신규 입력"
                onChange={handleChange}
                value={formData.id}
                required //로그인화면과 맞춤 추가
              ></input>
            </div>
            <div className="password">
              <p>비밀번호</p>
              <input
                className="bg-gray-300 text-gray-900"
                type="password"
                name="password"
                id=""
                placeholder="20자이내"
                onChange={handleChange}
                value={formData.password}
                required //로그인화면과 맞춤 추가
              ></input>
            </div>
            <div className="name">
              <p>성함</p>
              <input
                className="bg-gray-300 text-gray-900"
                name="name"
                id=""
                onChange={handleChange}
                value={formData.name}
                required //로그인화면과 맞춤 추가
              ></input>
            </div>
            <div className="email">
              <p>Email</p>
              <input
                className="bg-gray-300 text-gray-900"
                name="email"
                type="email" //타입만 재지정
                id=""
                onChange={handleChange}
                value={formData.email}
                required //로그인화면과 맞춤 추가
              ></input>
            </div>
            <div className="company">
              <p>회사명</p>
              <input
                className="bg-gray-300 text-gray-900"
                name="company"
                id=""
                onChange={handleChange}
                value={formData.company}
                required //로그인화면과 맞춤 추가
              ></input>
            </div>
            <div className="level">
              <p>직책</p>
              <input
                className="bg-gray-300 text-gray-900"
                name="level"
                id=""
                onChange={handleChange}
                value={formData.level}
                required //로그인화면과 맞춤 추가
              ></input>
            </div>
            <div className="phone">
              <p>연락처</p>
              <input
                className="bg-gray-300 text-gray-900"
                name="phone"
                id=""
                onChange={handleChange}
                placeholder="'-'부호는 빼주세요"
                value={formData.phone}
                required //로그인화면과 맞춤 추가
              ></input>
            </div>

            <div className="buttonBox">
              <button className="register" type="submit">
                등록완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
