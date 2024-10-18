import React from 'react';
import Filter from './Filter';
import Products from './Products';

const Content = () => {
    return (
        <div className='content'>
            <Filter />
            <Products />
        </div>
    );
};

export default Content;