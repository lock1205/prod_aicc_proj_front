import React from 'react';
import '../../design/AgreeMasterList.css';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/slice/modalSlice';

const List = ({ task }) => {
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
      {/* {task.length > 0 ? ( // 필터링된 데이터가 있을 경우 */}
      <div className="M-listItem" onClick={handleOpenModal}>
        {/* 데이터의 고유 인덱스를 key로 설정 */}
        <span>{status}</span> {/* 진행 상태 표시 */}
        <span>{textLengthOverCut(title, 19, '...')}</span> {/* 타이틀 표시 */}
        <span>{textLengthOverCut(company_name, 7, '...')}</span>{' '}
        {/* 회사 이름 표시 */}
        <span>{end_date}</span> {/* 마감 일자 표시 */}
      </div>
      {/* ) : (
        <p className="M-listNone">No results found.</p> // 필터링된 데이터가 없을 경우 메시지 표시
      )} */}
    </div>
  );
};

export default List;
