import React from 'react';
import '../design/agreeFinsh.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

const AgreeFinish = () => {
  const authData = useSelector((state) => state.auth.authData);
  return (
    <div className="bg">
      <NavBar />
      <div className="af_container">
        <div className="af_top">
          <h1>AICO</h1>
        </div>
        <div className="af_middle">
          <div className="finishIcon">
            <img
              width="70"
              height="70"
              src="https://img.icons8.com/nolan/100/1A6DFF/C822FF/check-file.png"
              alt="check-file"
            />
          </div>
          <h1>협의서 제출 완료</h1>
          <div className="text">
            <div>{authData.id}님의 협의서가</div>
            <div>성공적으로 제출되었습니다.</div>
          </div>
          <div className="af_bottom">
            <div className="text">
              <span>제출된 협의서 내역 확인 및 수정은 </span>
              <span>마이페이지 - 협의서 수정</span>
              <span>에서 가능합니다.</span>
            </div>
            <p>
              <Link to={'/mypage'}>
                <button>마이페이지</button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreeFinish;
