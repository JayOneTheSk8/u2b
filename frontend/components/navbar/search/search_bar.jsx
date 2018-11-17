import React from 'react';

const SearchBar = () => {
  return (
    <form className="search-bar">
      <input className="search-input" type="text" placeholder="Search U2B..."/>
      <button className="search-submit">S</button>
    </form>
  );
};
// make a class component since it will need state

export default SearchBar;
