import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './componet/LoginForm';
import SignupForm from './componet/SignupForm';
import MainPage from './componet/MainPage';
import { ToastContainer } from 'react-toastify';
import AgreeFinish from './componet/AgreeFinish';
import ColaboAgreement from './componet/ColaboAgreement';
import AgreeMasterList from './componet/AgreeMasterList';
import TechInfo from './componet/TechInfo';
import Recommend from './componet/Recommend';
import MyAgree from './componet/mypage/MyAgree';
import DetailAgree from './componet/public/DetailAgree';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/agreeFinsh" element={<AgreeFinish />} />
        <Route path="/agreeMasterList" element={<AgreeMasterList />} />
        <Route path="/colabo" element={<ColaboAgreement />} />
        <Route path="/techInfo" element={<TechInfo />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/mypage" element={<MyAgree />} />
      </Routes>

      <ToastContainer position="bottom-center" autoClose={100} theme="light" />
    </BrowserRouter>
  );
}

export default App;
