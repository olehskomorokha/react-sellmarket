import React from 'react';
import { useState,  useEffect } from 'react';
import './css/Categories.css';
import foodImage from './CategoriesImg/2.jpg';
const Categories = () => {
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
        }
        catch (error) {
            console.error(error.message);
        }
        
    }
    useEffect(() => {
        fetchCategories()}, []);
        return (
            <div className='categories'>
                
                <h1>ГРУПИ ТОВАРІВ ТА ПОСЛУГ</h1>
                <div className='categories-container'>
                    {data.map(category => (
                        <div key={category.id} id={category.id} className='category-card'>
                            <h2>{category.category}</h2>
                        </div>
                    ))}
                </div>
            </div>
        );
}

export default Categories;
