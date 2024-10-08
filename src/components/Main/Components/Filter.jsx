import React, { useState } from 'react';
import '../Main.css';

const Filter = ({ onFilterChange }) => {
    const [filterText, setFilterText] = useState('');

    const handleInputChange = (e) => {
        setFilterText(e.target.value);
        onFilterChange(e.target.value);
    };

    return (
        <div className="filter-panel">
            <h1 style={{ color: 'black', fontWeight: 'normal' }}>Фільтри</h1>
            <div className='price-filter'>
                <h5 style={{ color: 'black', fontWeight: 'normal' }}>Ціна</h5>
                
                <label htmlFor="price-input-min">від</label>
                <input type="text" id="price-input-min" className='price-input' value={filterText} onChange={handleInputChange} />

                <label htmlFor="price-input-max">до</label>
                <input type="text" id="price-input-max" className='price-input' value={filterText} onChange={handleInputChange} />
                
                <button id="filter-button">
                    <img width="13" height="13" src="https://img.icons8.com/ios/50/search--v1.png" alt="search--v1"/>
                </button>
            </div>
            
            <div className='sort-type'>
                <label htmlFor="sortType">Сортування: </label>
                <select name="sorting" id="sortType" onChange={handleInputChange}>
                    <option value="position">По порядку</option>
                    <option value="price">По зростанню ціни</option>
                    <option value="-price">По спаданню ціни</option>
                    <option value="-date_created">По новизні</option>
                </select>
            </div>
            
        </div>
    );
};

export default Filter;