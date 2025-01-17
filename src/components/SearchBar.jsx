import React from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/proflieSlice";

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Search Profiles..."
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
