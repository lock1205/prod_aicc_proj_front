import React from 'react';
import NavBar from './NavBar';
import ContentsPage from './ContentsPage';
import '../design/MainPage.css';

const text3 =
  '비싸고 어려운 도입 과정은 이제 그만! AICO는 빠르고 쉽게 솔루션을 제공합니다. ';
const text4 =
  '맞춤 컨설팅과 연동 직접 지원을 통해 손쉽게 도입할 수 있으니 지금 바로 체험해보세요.';

const MainPage = () => {
  return (
    <div className="Main-BG">
      <div className="NavBar">
        <NavBar />
      </div>
      <div className="Main-text">
        <div>WELCOME TO AICO</div>
        <div className="Main-title">Create Your Own AI Solution</div>
        <div>
          {text3}
          <br />
          {text4}
        </div>
      </div>
      <div className="ContentsPage">
        <ContentsPage />
      </div>
    </div>
  );
};

export default MainPage;
