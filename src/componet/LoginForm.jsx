import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AlermModal from './AlermModal';
import '../design/LoginForm.css';
import '../design/bg.css';
import { login, logout } from '../redux/slice/authSlice';
import NavBar from './NavBar';
import { toast } from 'react-toastify';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import { useDispatch } from 'react-redux';
function LoginForm() {
  // 로그인 컴포넌트
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigator = useNavigate();

  //axios.defaults.withCredentials = true; //withCredentials 옵션은 단어 그대로, 다른 도메인(Cross Origin)에 요청을 보낼 때 요청에 인증(credential) 정보를 담아서 보낼 지를 결정하는 항목이다. 즉, 쿠키나 인증 헤더 정보를 포함시켜 요청하고 싶다면, 클라이언트에서 API 요청 메소드를 보낼때 withCredentials 옵션을 true로 설정해야한다.

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  //폼 제출 시 호출
  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8080/login_user', values)
      .then((res) => {
        if (res.status === 201) {
          const decoded = jwtDecode(res.data.token);
          dispatch(login({ authData: decoded }));
          navigator('/');
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            setModalMessage('비밀번호가 잘못되었습니다.');
          } else if (error.response.status === 404) {
            setModalMessage('등록된 ID를 찾을 수 없습니다.');
          } else {
            setModalMessage(
              '서버에서 오류가 발생했습니다. 나중에 다시 시도해주세요'
            );
          }
        } else {
          setModalMessage('알 수 없는 오류가 발생했습니다.');
        }
        setModalOpen(true);
        console.log(error);
        return;
      });
  };

  // 모달을 닫는 함수
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="bg">
      <NavBar />
      <div className="lg_wrapper">
        <div className="lg_left">
          <h1>CUSTOMER LOGIN</h1>
          <h2>아이코에서 나만의 AI 솔루션을 커스터마이징 하세요!</h2>
          <form onSubmit={handleSubmit}>
            <div className="id">
              {/* <label>Email ID: </label> */}
              <input
                type="email"
                placeholder="E-mail ID"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                required
              />
            </div>
            <div className="pw">
              {/* <label>Password:</label> */}
              <input
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                required
              />
            </div>
            <div className="buttonBox">
              <button className="loginButton" type="submit">
                LOGIN
              </button>
            </div>
          </form>

          <div className="signup">
            <div>아직 AICO 회원이 아니신가요?</div>
            <Link to="/signup">회원가입</Link>
          </div>
        </div>
        <AlermModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          message={modalMessage}
        />
      </div>
    </div>
  );
}

export default LoginForm;
