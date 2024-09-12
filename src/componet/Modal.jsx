import React from 'react';
import modalSlice from '../redux/slice/modalSlice';
import { useSelector } from 'react-redux';

const Modal = () => {
  const { isOpen, modalType, task } = useSelector((state) => state.modal);
  return (
    <div>
      <button>등록 완료</button>
    </div>
  );
};

export default Modal;
