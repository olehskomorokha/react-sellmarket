import React from 'react';
import '../Main.css';
import { useState, useEffect } from 'react';
const Products = () => {
   
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const response = await fetch('https://localhost:44383/api/Product/GetProducts');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('uk-UA', options);
    };
    const formImage = (str) => {
        return str.split(',')[0];
    };

    return (
        <div className='products'>
            {products.map((product) => (
                <div className='product-card' key={product.id}>
                    <img src={formImage(product.img)} alt={product.title} />
                    <h2>{product.title}</h2>
                    <h3>Опубліковано {formatDate(product.dateOfPublish)}</h3>
                    <div className='product-div'>
                        <p>{product.price} грн</p>
                        <button className='buy-Btn'>Купити</button>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default Products;