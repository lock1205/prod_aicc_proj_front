import React, { useState } from 'react';
import '../../design/AgreeMasterList.css';

const SearchBar = ({ props }) => {
  const [formData, setFormData] = useState('');
  const handleInputChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSubmit = () => {
    props(formData);
  };
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="회사 또는 협의서 이름으로 검색하세요"
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>검색</button>
    </div>
  );
};

export default SearchBar;
