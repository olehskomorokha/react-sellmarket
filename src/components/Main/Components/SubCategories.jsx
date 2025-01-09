import React from 'react';
import { useState,  useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../../Headers/Header';
import SearchBar from '../../Headers/SearchBar';
import './css/SubCategories.css';
import Content from './Content';
import Menu from './Menu';
const SubCategories = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState([]);
    const fetchSubCategories = async () => {
        const url = `https://localhost:44383/api/Product/GetSubcategoriesByCategoryId?id=${id}`;
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
        fetchSubCategories()}, [id]);
        
    if (!data || data.length === 0) {
        return (
            <>
                <Header/>
                <SearchBar/>
                <Content/>
            </>
            
        );
    }

    return (
        <>
            <Header/>
            <SearchBar/>
            <div className='main-container'>
                <Menu/>
                <div className='subcategories'>
                    <h1>ГРУПИ ТОВАРІВ ТА ПОСЛУГ</h1>
                    <div className='subcategories-container'>
                        {data.map(category => (
                            <div key={category.id} id={category.id} className='subcategory-card' onClick={() => navigate(`/subCategories/${category.id}`)}>
                                <h2>{category.category + category.id}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
           

            
        </>
    );

       
}

export default SubCategories;
