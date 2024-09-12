import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/slice/modalSlice';

const ItemBar = ({ task }) => {
  const {
    arg_num,
    company_name,
    level,
    master_name,
    master_tel,
    end_date,
    sum_money,
    ai_data,
    ai_media,
    ai_lang,
    title,
    status,
    description,
    ai_image,
    comment,
  } = task;
  const dispatch = useDispatch();

  const textLengthOverCut = (txt, len, lastTxt) => {
    if (len == '' || len == null) {
      len = 20;
    }
    if (lastTxt == '' || lastTxt == null) {
      lastTxt = '...';
    }
    if (txt.length > len) {
      txt = txt.substr(0, len) + lastTxt;
    }
    return txt;
  };

  const handleOpenModal = () => {
    if (status == '신규' || status == '재협의') {
      dispatch(openModal({ modalType: 'update', task }));
    } else {
      dispatch(openModal({ modalType: 'detail', task }));
    }
  };

  return (
    <div className="masterList">
      <div className="M-listItem" onClick={handleOpenModal}>
        {/* <span>{arg_num}</span> */}
        <span>{status}</span>
        <span>{textLengthOverCut(title, 19, '...')}</span>
        <span>{company_name}</span>
        <span>{end_date}</span>
        {/* <span>{master_tel}</span> */}
      </div>
    </div>
  );
};

export default ItemBar;
