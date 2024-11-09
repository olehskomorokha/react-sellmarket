import React from 'react';
import './CreatPoster.css'
import { useEffect } from 'react';
import { useState } from 'react';
import Header from '../Headers/Header';
// google map apis

import { library } from '@fortawesome/fontawesome-svg-core';

import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faImage);

const CreatPoster = () => {

    const [filterText, setFilterText] = useState('');

    const [imageElements, setImageElements] = useState([null, null, null, null]);

    const onInputImageChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const updatedImages = [...imageElements];
            updatedImages[index] = imageUrl;
            setImageElements(updatedImages);
        }
    };
    const removeImage = (index) => {
        const updatedImages = [...imageElements];
        updatedImages[index] = null;
        setImageElements(updatedImages);
    };
    const loadCategories = async () => {
        const url = "https://localhost:7118/api/Product/GetAllSubcategory";
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
        const url = "https://localhost:7118/api/Product/addProduct";
        const jwtToken = localStorage.getItem('token'); 
        try {
            const formData = new FormData();
            formData.append('title', document.getElementById('title').value);
            formData.append('description', document.getElementById('description').value);
            formData.append('category', filterText);
            formData.append('price', document.getElementById('price').value);

            const images = document.querySelectorAll('.image');
            for (let i = 0; i < images.length; i++) {
                if (images[i].files[0]) {
                    formData.append('files', images[i].files[0]);
                }
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
            
            alert('Product added successfully!');
        }
        catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);
    // google map api
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
                    <h3>Виберіть Фото:</h3>
                    <p>Перше фото буде на заставці</p>
                    
                    {imageElements.map((image, index) => (
                        <div key={index}>
                            {image ? (<><img src={image} className="label-image" alt={`Uploaded ${index + 1}`} onClick={() => removeImage(index)}  />
                                    <FontAwesomeIcon icon={faTrash}  className="delete-icon" onClick={() => removeImage(index)} />
                                    </>) :  
                                    (<label htmlFor={`image${index + 1}`}> <FontAwesomeIcon icon={faImage} /> </label>)}
                            <input
                                type="file"
                                id={`image${index + 1}`}
                                className="image"
                                name="image"
                                onChange={(e) => onInputImageChange(e, index)}
                                
                            />
                            </div>
                    ))}
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

                <div className='location'>
                    <label htmlFor="address">Місцезнаходження:</label>
                    <br />
                        <input type="text" name="address" id="address-input" />
                </div>
               
                <button type="submit" onClick={addProduct}>Створити</button>

            </div>
            
        </div>
    );
};

export default CreatPoster;