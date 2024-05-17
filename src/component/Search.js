import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [searchItem, setSearchItem] = useState();
  const nevigate = useNavigate();
  const handleSearch = () => {
    nevigate("/search?query=" + searchItem);
  };
  return (
    <div className="input-group">
      <input
        type="text"
        id="search_field"
        className="form-control"
        placeholder="Enter Product Name ..."
        onChange={(e) => setSearchItem(e.target.value)}
        onBlur={handleSearch}
      />
      <div className="input-group-append">
        <button onClick={handleSearch} id="search_btn" className="btn">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
