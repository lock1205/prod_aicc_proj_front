import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../design/MainPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { tempComplete } from '../redux/slice/tempSlice';

const ContentsPage = () => {
  const temptask = useSelector((state) => state.temp.temptask);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const tempLoad = () => {
    if (authData?.user_key === temptask?.key) {
      const confirm = window.confirm(
        '임시저장된 협의서가 있습니다. 불러오겠습니까?'
      );
      if (!confirm) {
        dispatch(tempComplete());
      }
    }
    navigator('/colabo');
  };
  const authData = useSelector((state) => state.auth.authData);
  return (
    <div className="MP_category">
      <div className="MP_contents">
        <div className="MP_contents_tech">
          <h1>TECHNOLOGY</h1>
          <h3>AICO가 보유한 다양한 AI 기술을 한 눈에 확인해보세요.</h3>
          <Link className="tech-link" to={'/techInfo'}>
            <button>CHECK</button>
          </Link>
          <div>
            우리 AICO에서는 워크로드 생성,모델 학습,리소스 관리,워크로드 관리 등
            다양한 기술을 활용하여 맞춤 AI 솔루션을 제작할 수 있습니다.
          </div>
        </div>

        <div className="MP_contents_packge">
          <h1>RECOMMEND</h1>
          <h3>AICO에서 가장 인기 좋은 패키지를 한 눈에 확인해보세요.</h3>
          <Link className="pack-link" to={'/recommend'}>
            <button>CHECK</button>
          </Link>
          <div>
            가장 많은 의뢰를 받은 AI 솔루션 패키지로 구성 되어있어, 원하시는
            패키지를 찾아 바로 주문할 수 있습니다.
          </div>
        </div>

        <div className="MP_contents_agree">
          <h1>AGREEMENT</h1>
          <h3>나만의 AI 솔루션 협의서를 작성하여 견적 및 상담 받아보세요. </h3>
          {authData ? (
            <button onClick={tempLoad}>CHECK</button>
          ) : (
            <Link className="agree-link" to={'/login'}>
              <button>CHECK</button>
            </Link>
          )}

          <div>
            고효율 솔루션과 신뢰도 높은 파트너십을 갖춘 AICO와 협업으로,이전과는
            다른 인공지능 개발·운영을 경험하실 수 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentsPage;
