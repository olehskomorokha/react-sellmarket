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
                <div className='product' key={product.id}>
                    <img src={formImage(product.img)} alt={product.title} />
                    <h1>{product.title}</h1>
                    <h2>Опубліковано {formatDate(product.dateOfPublish)}</h2>
                    <p><strong>{product.price} грн</strong></p>
                </div>
            ))}
        </div>
    );
};

export default Products;