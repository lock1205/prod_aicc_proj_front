import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { fetchPostTasksData } from '../redux/slice/apiSlice';
import { features } from '../ai_info/data';
import { Link, useNavigate } from 'react-router-dom';

import NavBar from './NavBar';
import Cookies from 'js-cookie';
import { tempComplete, tempSave } from '../redux/slice/tempSlice';

const ColaboAgreement = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const temptask = useSelector((state) => state.temp.temptask);
  const location = useLocation(); // Recommend에서 전달된 데이터를 받음
  const { ai_data, ai_media, ai_lang, ai_image } = location.state || {}; // state가 없을 경우를 대비

  const authData = useSelector((state) => state.auth.authData);

  useEffect(() => {
    if (!authData) {
      navigator('/');
      return;
    }
  }, [authData]);

  // useEffect(() => {
  //   if (authData?.user_key === temptask?.key) {
  //     const confirm = window.confirm(
  //       '임시저장된 협의서가 있습니다. 불러오겠습니까?'
  //     );
  //     if (confirm) {
  //       return;
  //     } else {
  //       dispatch(tempComplete());
  //       formData = null;
  //       navigator('/colabo');
  //     }
  //   }
  // }, []);

  const [formData, setFormData] = useState(
    authData?.user_key === temptask?.key
      ? {
          key: temptask.key || '',
          company_name: temptask.company_name || '',
          level: temptask.level || '',
          master_name: temptask.master_name || '',
          master_tel: temptask.master_tel || '',
          end_date: temptask.end_date || '',
          sum_money: temptask.sum_money || '',
          ai_data: ai_data || temptask.ai_data || '',
          ai_media: ai_media || temptask.ai_media || '',
          ai_lang: ai_lang || temptask.ai_lang || '',
          ai_image: ai_image || temptask.ai_image || '',
          title: temptask.title || '',
          description: temptask.description || '',
          status: '신규', //이 컴포넌트는 신규작성일 경우만 해당되므로 여기서 초기값을 정의해줌
        }
      : {
          key: '',
          company_name: '',
          level: '',
          master_name: '',
          master_tel: '',
          end_date: '',
          sum_money: '',
          ai_data: ai_data || '',
          ai_media: ai_media || '',
          ai_lang: ai_lang || '',
          ai_image: ai_image || '',
          title: '',
          description: '',
          status: '신규', //이 컴포넌트는 신규작성일 경우만 해당되므로 여기서 초기값을 정의해줌
        }
  );

  const handleChange = (e) => {
    formData.key = authData.user_key;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error('제목이 입력되지 않았습니다.');
      return;
    }
    if (!formData.company_name) {
      toast.error('회사명이 입력되지 않았습니다.');
      return;
    }
    if (!formData.level) {
      toast.error('직책이 입력되지 않았습니다.');
      return;
    }
    if (!formData.master_name) {
      toast.error('총괄자명이 입력되지 않았습니다.');
      return;
    }
    if (!formData.master_tel) {
      toast.error('총괄자 연락처가 입력되지 않았습니다.');
      return;
    }
    if (!formData.end_date) {
      toast.error('희망마감기한이 입력되지 않았습니다.');
      return;
    }
    if (!formData.sum_money) {
      toast.error('예상예산이 입력되지 않았습니다.');
      return;
    }

    try {
      await dispatch(fetchPostTasksData(formData)).unwrap();
      dispatch(tempComplete());
      navigator('/agreeFinsh');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('협의서 등록 실패');
    }
  };

  const tempAgree = () => {
    //dispatch(tempSave({ formData }));
    Cookies.set('tempAgreeData', JSON.stringify(formData), { expires: 2 });
    dispatch(tempSave(Cookies.get('tempAgreeData')));

    toast.success('임시저장되었습니다.');
  };

  return (
    <div className="bg">
      <NavBar />
      <div className="Agree-wrapper">
        <div className="Agree-content">
          <div className="Agree-title">
            <h1>협의서 작성하기</h1>
            <h2>[AICO]나만의 AI솔루션 제작 요청</h2>
          </div>
          <form className="">
            <div className="Agree-base">
              <h3>협의서 개요</h3>
              <div className="Agree-id ">
                <p>
                  제목 <span>(필수)</span>
                  {/*<h4 className="text-red-600">*필수 입력 사항*</h4> */}
                </p>

                <input
                  className=""
                  type="text"
                  name="title"
                  id=""
                  onChange={handleChange}
                  value={formData.title}
                  placeholder="예) 애니메이션 그림체 일정하게 맞추는 AI솔루션"
                ></input>
              </div>
              <div className="Agree-decription">
                <p>요구사항</p>
                <textarea
                  className=""
                  name="description"
                  id=""
                  onChange={handleChange}
                  value={formData.description}
                  placeholder="예) 프로젝트 목표,프로젝트 범위, 이미지 처리 방식, 처리 속도, 품질 기준, 시스템 호환 등. "
                ></textarea>
              </div>
              <div className="Agree-myInfo">
                <h3>기본 정보</h3>

                <div className="Agree-company_name">
                  <p>
                    회사명 <span>(필수)</span>
                  </p>
                  <input
                    className=""
                    name="company_name"
                    id=""
                    onChange={handleChange}
                    value={formData.company_name}
                  ></input>
                </div>
                <div className="Agree-level">
                  <p>
                    직책<span>(필수)</span>
                  </p>
                  <input
                    className=""
                    name="level"
                    id=""
                    onChange={handleChange}
                    value={formData.level}
                  ></input>
                </div>
                <div className="Agree-master_name">
                  <p>
                    총괄자명<span>(필수)</span>
                  </p>
                  <input
                    className=""
                    name="master_name"
                    id=""
                    onChange={handleChange}
                    value={formData.master_name}
                    placeholder="홍길동"
                  ></input>
                </div>
                <div className="Agree-master_tel">
                  <p>
                    연락처<span>(필수)</span>
                  </p>
                  <input
                    className=""
                    name="master_tel"
                    id=""
                    onChange={handleChange}
                    value={formData.master_tel}
                    placeholder="01012345678"
                  ></input>
                </div>
              </div>
            </div>
            <div className="Agree-hope">
              <h3>사전 요구 사항</h3>

              <div className="Agree-end_date">
                <p>
                  희망 마감기한<span>(필수)</span>
                </p>
                <input
                  className=""
                  name="end_date"
                  id=""
                  type="date"
                  // 달력 보일수 있도록 추가
                  onChange={handleChange}
                  value={formData.end_date}
                  placeholder="2000-09-02"
                ></input>
              </div>
              <div className="Agree-sum_money">
                <p>
                  예상 예산<span>(필수)</span>
                </p>
                <input
                  className=""
                  name="sum_money"
                  id=""
                  onChange={handleChange}
                  value={formData.sum_money}
                  placeholder="000만원"
                ></input>
              </div>
            </div>
            <div className="Agree-need_tech">
              <h3>희망 기술</h3>
              <div className="Agree-ai_data">
                <p>AI데이터기술</p>
                <select
                  name="ai_data"
                  class="select"
                  onChange={handleChange}
                  value={formData.ai_data}
                >
                  <option key={''}>선택하세요</option>
                  {features.map(
                    (option, idx) =>
                      option.Major === 'AI_Data' && (
                        <option key={idx}>{option.title}</option>
                      )
                  )}
                </select>
              </div>
              <div className="Agree-ai_media">
                <p>AI미디어기술</p>
                <select
                  name="ai_media"
                  class="select"
                  onChange={handleChange}
                  value={formData.ai_media}
                >
                  <option key={''}>선택하세요</option>
                  {features.map(
                    (option, idx) =>
                      option.Major === 'AI_Media' && (
                        <option key={idx}>{option.title}</option>
                      )
                  )}
                </select>
              </div>
              <div className="Agree-ai_image">
                <p>AI이미지기술</p>
                <select
                  name="ai_image"
                  class="select"
                  onChange={handleChange}
                  value={formData.ai_image}
                >
                  <option key={''}>선택하세요</option>
                  {features.map(
                    (option, idx) =>
                      option.Major === 'AI_Image' && (
                        <option key={idx}>{option.title}</option>
                      )
                  )}
                </select>
              </div>
              <div className="Agree-ai_lang">
                <p>AI생성을 위한 프로그래밍 언어</p>
                <select
                  name="ai_lang"
                  class="select"
                  onChange={handleChange}
                  value={formData.ai_lang}
                >
                  <option key={''}>선택하세요</option>
                  {features.map(
                    (option, idx) =>
                      option.Major === 'AI_Lang' && (
                        <option key={idx}>{option.title}</option>
                      )
                  )}
                </select>
              </div>
            </div>
            <div className="Agree-buttonBox">
              <button
                className="Agree-register"
                type="submit"
                onClick={handleSubmit}
              >
                제출하기
              </button>
              <button className="Agree-register" onClick={tempAgree}>
                임시저장
              </button>
            </div>
            <div className="Agree-submit_tip">
              제출 과정에서 문제가 발생하였다면 1577-2020으로 문의주세요!
              <p>
                협의서 관리 솔루션 그리팅(Greeting)의 고객센터로 연결됩니다.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ColaboAgreement;
