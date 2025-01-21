import React, { useState, useEffect } from 'react';
import './css/Categories.css';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const fetchCategories = async () => {
        const url = 'https://localhost:7118/api/Product/GetProductCategory';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const categories = await response.json();
            console.log(categories);
            setData(categories);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className='categories'>
            <h1>ГРУПИ ТОВАРІВ ТА ПОСЛУГ</h1>
            <div className='categories-container'>
                {data.map(category => (
                    <div
                        key={category.id}
                        id={category.id}
                        className='category-card'
                        onClick={() => navigate(`/subCategories/${category.id}`)}
                    >
                        <h2>{category.category}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
