import React from 'react';
import SearchIcon from './search_icon';

const SearchBar = () => {
  return (
    <form className="search-bar">
      <input className="search-input" type="text" placeholder="Search U2B..."/>
      <SearchIcon />
    </form>
  );
};
// make a class component since it will need state

export default SearchBar;
