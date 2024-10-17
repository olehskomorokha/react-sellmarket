import React, { useState } from 'react';
import '../Main/Main.css';
import SearchImg from '../Assets/search.jpg';
const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="SearchBar">
            <input 
                className="search-input"
                type="text" 
                value={query} 
                onChange={handleInputChange} 
                placeholder="Search..." 
            />
            <button className="searchBtn" onClick={handleSearch}>
                <img width="20" height="20" src="https://img.icons8.com/ios/50/search--v1.png" alt="search--v1"/>
            </button>
        </div>
    );
};

export default SearchBar;