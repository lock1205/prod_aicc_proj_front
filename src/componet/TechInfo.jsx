import React, { useState } from 'react';
import '../design/TechInfo.css';
import NavBar from './NavBar';

const TechnologyOverview = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const technologies = [
    {
      logo: (
        <img
          width="60"
          height="60"
          src="https://img.icons8.com/nolan/96/1A6DFF/C822FF/cloud-storage.png"
          alt="cloud-storage"
        />
      ),
      description:
        ' 자체 거대언어모델 LUXIA 뿐 아니라, 클라우드를 통해 공개 및 활용 가능한 다양한 초거대언어모델과 MLOps 환경 제공.',
      tags: ['#클라우드 생성', '#초거대언어모델'],
      category: '클라우드 생성',
    },
    {
      logo: (
        <img
          width="60"
          height="60"
          src="https://img.icons8.com/nolan/96/1A6DFF/C822FF/message-bot.png"
          alt="message-bot"
        />
      ),
      description:
        '아웃바운드 콜봇을 통해 개인화된 상품 추천,영업지원과 계약 및 가입 확인 등 해피콜을 통한 고객만족 제고와 서비스 리스크 예방.',
      tags: ['#상담원지원', '#AI텔레마케팅'],
      category: 'AI 컨택센터',
    },
    {
      logo: (
        <img
          width="55"
          height="55"
          src="https://img.icons8.com/nolan/96/1A6DFF/C822FF/bonds.png"
          alt="bonds"
        />
      ),
      description:
        '차주 부도, 기업위험관리 등 리스크 관리에 특화된 AI 신용 평가 및 고객 분석 솔루션.',
      tags: ['#AI신용평가', '#불완전판매모니터링'],
      category: '금융 서비스',
    },
    {
      logo: (
        <img
          width="60"
          height="60"
          src="https://img.icons8.com/nolan/96/1A6DFF/C822FF/video-call.png"
          alt="video-call"
        />
      ),
      description:
        '이미지 데이터 라벨링 작업부터 배포, 관리까지 라벨링 서비스 구현의 핵심 기능을 제공.',
      tags: ['#이미지 분석/분류', '#영상분석'],
      category: '애니 제작',
    },
    // 추가 항목을 여기에 추가할 수 있습니다.
  ];

  const filteredTechnologies =
    selectedCategory === '전체'
      ? technologies
      : technologies.filter((tech) => tech.category === selectedCategory);

  return (
    <div className="bg">
      <NavBar />
      <div className="tech_container">
        <div className="tech_title">AICO 보유 기술</div>
        <div className="tech_tabs">
          <button
            className={`tech_tab ${
              selectedCategory === '전체' ? 'active' : ''
            }`}
            onClick={() => setSelectedCategory('전체')}
          >
            전체
          </button>
          <button
            className={`tech_tab ${
              selectedCategory === '클라우드 생성' ? 'active' : ''
            }`}
            onClick={() => setSelectedCategory('클라우드 생성')}
          >
            클라우드 생성
          </button>
          <button
            className={`tech_tab ${
              selectedCategory === 'AI 컨택센터' ? 'active' : ''
            }`}
            onClick={() => setSelectedCategory('AI 컨택센터')}
          >
            AI 컨택센터
          </button>
          <button
            className={`tech_tab ${
              selectedCategory === '금융 서비스' ? 'active' : ''
            }`}
            onClick={() => setSelectedCategory('금융 서비스')}
          >
            금융 서비스
          </button>
          <button
            className={`tech_tab ${
              selectedCategory === '애니 제작' ? 'active' : ''
            }`}
            onClick={() => setSelectedCategory('애니 제작')}
          >
            애니 제작
          </button>
        </div>
        {filteredTechnologies.map((tech, index) => (
          <div className="tech-row" key={index}>
            <div className="tech-logo">{tech.logo}</div>
            <div className="tech-description">{tech.description}</div>
            <div className="tech-tags">
              {tech.tags.map((tag, i) => (
                <span key={i} className="tech-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologyOverview;
