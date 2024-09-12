import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetUserTasksData } from '../../redux/slice/apiSlice';
import ItemBar from '../public/ItemBar';
import '../../design/MyPage.css';
import DetailAgree from '../public/DetailAgree';
import { useNavigate } from 'react-router-dom';

const MyAgree = () => {
  const [loading, setLoading] = useState(false);

  const authData = useSelector((state) => state.auth.authData);

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const getUserAgrData = useSelector((state) => state.api.fetchGetUserTasks);

  const isOpen = useSelector((state) => state.modal.isOpen);

  useEffect(() => {
    if (!authData) {
      navigator('/');
      return;
    }

    const fetchGetAgrees = async () => {
      try {
        //setLoading(true); 로딩컴포넌트 추가해야함
        await dispatch(fetchGetUserTasksData(authData.user_key)).unwrap();
      } catch (error) {
        console.error('Failed to fetch items:', error);
      } finally {
        //setLoading(false); 로딩컴포넌트 추가해야함
      }
    };
    fetchGetAgrees();
  }, [dispatch, authData]);

  return (
    <div className="bg">
      <NavBar />
      <div className="aml_container">
        <h2>My Agreement</h2>
        <h3>
          내가 제출한 협의서 쉽고 편하게 관리하세요.
          <p className="My-sub_title">
            *원하는 협의서 클릭 시 상세 페이지 확인 및 수정이 가능합니다.
          </p>
        </h3>

        {isOpen && <DetailAgree />}
        <div className="My-list-content">
          <div className="My-list_title">
            <p>진행 상태 </p>
            <p>타이틀</p>
            <p>회사 이름</p>
            <p>희망마감기한</p>
          </div>
        </div>
        <div>
          {getUserAgrData?.map((item, idx) => (
            <ItemBar key={idx} task={item} /> //모달을 사용하기 위해 반드시 task란 이름으로 넘겨야 한다. 모달 슬라이스 task와 이름을 동일하게 맞춰야 한다.
          ))}
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default MyAgree;
