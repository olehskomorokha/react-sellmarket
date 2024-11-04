import React from 'react';
import '../Main/Main.css';
import './CreatPoster.css'
import { useEffect } from 'react';
import { useState } from 'react';
import Header from '../Headers/Header';
const CreatPoster = () => {

    const [filterText, setFilterText] = useState('');

    const loadCategories = async () => {
        const url = "https://localhost:44383/api/Product/GetAllSubcategory";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            
            const categorySelect = document.getElementById('category');
            categorySelect.innerHTML = '';
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id; 
                option.textContent = category.category; 
                categorySelect.appendChild(option);
            });
            console.log(data.id);

            
        }
        catch (error) {
            console.error(error.message);
        }
        
    };
    const handleInputChange = (e) => {
        console.log("before "+filterText);
        setFilterText(e.target.value);
        console.log(e.target.value);
    
        //onFilterChange(e.target.value);
    };
    const addProduct = async () => {
        const url = "https://localhost:44383/api/Product/addProduct";
        const images = document.getElementById('image').files;
        const jwtToken = localStorage.getItem('token'); 
        try {
            const formData = new FormData();
            formData.append('title', document.getElementById('title').value);
            formData.append('description', document.getElementById('description').value);
            formData.append('category', filterText);
            formData.append('price', document.getElementById('price').value);
            for (let i = 0; i < images.length; i++) {
                formData.append('files', images[i]);
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            
            const data = await response.json();
            alert('Product added successfully!');
        }
        catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);
    return (
        <div className='CreatPoster'>
            <Header></Header>
            <div className='parameters'>
                <h1>Створити оголошення</h1>
                <div className='name-category'>
                    <label htmlFor="title">Вкажіть назву товару:</label>
                    <br />
                    <input type="text" id="title" name="title" placeholder="Наприклад, сподове вудилище Shimano x1" />
                    <br />
                    <label htmlFor="category">Категорія:</label>
                    <br />
                    <select id="category" onChange={handleInputChange}>
                    </select>
                </div>

                <div className='photo'>
                    <label htmlFor="image">Фото:</label>
                    <br />
                    <input type="file" id="image" name="image" />
                    <input type="file" id="image" name="image" />
                    <input type="file" id="image" name="image" />
                    <input type="file" id="image" name="image" />
                    <input type="file" id="image" name="image" />
                </div>

                <div className='description'>
                    <label htmlFor="description">Опис:</label>
                    <br />
                    <textarea id="description" name="description" placeholder='Придумайте, що ви хотіли би дізнатися з оголошення. І додайте це в опис'></textarea>
                </div>

                <div className='price'>
                    <label htmlFor="price">Ціна за 1 шт.</label>
                    <br />
                    <input type="text" name="price" id="price" />
                </div>
               
                <button type="submit" onClick={addProduct}>Створити</button>

            </div>
            
        </div>
    );
};

export default CreatPoster;