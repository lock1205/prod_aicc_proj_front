import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import '../design/Recommend.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Recommend = () => {
  const authData = useSelector((state) => state.auth.authData);

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // 데이터를 가져오는 비동기 함수
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/get_Category/:text'); // API 호출
      const data = await response.json();

      // console.log(data);

      setCategories(data); // 받아온 데이터를 상태로 설정
    } catch (error) {
      console.log('Error fetching categories', error); //
    }
  };

  // 컴포넌트가 처음 렌더링될 때 한 번만 데이터 가져오기
  useEffect(() => {
    fetchCategories();
  }, []); // 의존성 배열을 빈 배열로 설정하여 무한 루프 방지

  // useNavigate 데이터 전달
  const handleNavigate = (category) => {
    navigate('/colabo', {
      state: {
        ai_data: category.ai_data,
        ai_media: category.ai_media,
        ai_lang: category.ai_lang,
        ai_image: category.ai_image,
      },
    });
  };

  return (
    <div className="bg">
      <NavBar />
      <div className="R-container">
        {categories.map((category, index) => (
          <div key={index} className="R-packages">
            <div className="R-title">{category.package_name}</div>

            <div className="R-catecory">
              <span>#{category.ai_data}</span>
              <span>#{category.ai_media}</span>
              <span>#{category.ai_lang}</span>
              <span>#{category.ai_image}</span>
            </div>
            <div className="R-des">{category.package_desc}</div>

            <div className="R-like">
              {authData ? (
                <button onClick={() => handleNavigate(category)}>
                  나만의 솔루션 의뢰하기
                </button>
              ) : (
                <Link to={'/login'}>
                  <button onClick={() => handleNavigate(category)}>
                    나만의 솔루션 의뢰하기
                  </button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
