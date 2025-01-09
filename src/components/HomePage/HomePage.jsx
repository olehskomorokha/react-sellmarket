import React from 'react';
import Header from '../Headers/Header'
import './CSS/HomePage.css'
import { useState, useEffect } from 'react';
const HomePage = () => {
    const token = localStorage.getItem("token");
    const [activeSection, setActiveSection] = useState('posts');
    const [activeButton, setActiveButton] = useState('posts');
    const [posts, setUserPosts] = useState([]);
    const [user, setUserInfo] = useState([]);
    const getUserProducts = async () => {
        try{
            const url = `https://localhost:44383/api/Product/GetUserPosts`;
            const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUserPosts(data);
            console.log(data);
        }
        catch (error){
            console.log(error);
        }
    }
    const getUserInfo = async () => {
        try{
            
            const url = `https://localhost:44383/api/User/getUserInfo`;
            const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUserInfo(data);
            console.log(data);
        }
        catch (error){
            console.log(error);
        }

    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('uk-UA', options);
    };

     useEffect(() => {
        getUserProducts();
        getUserInfo();
        }, []);
    return (
        <>
        <Header />
        <div className='home-page'>
           <h1>Профіль</h1>
           <header className='header2'>
            
            <button id="myPost" className={activeButton === 'posts' ? 'active-btn' : 'nav-button'} onClick={() => {setActiveSection('posts'); setActiveButton('posts')}}>Мої оголошення</button>
            <button id="Profile" className={activeButton === 'profile' ? 'active-btn' : 'nav-button'} onClick={() => {setActiveSection('profile'); setActiveButton('profile')}}>Профіль</button>
            <button id="ProfileSettings" className='nav-button'>Налаштування</button>
            <button id="Pay" className='nav-button'>Оплата</button>
           </header>
           
           <div className={activeSection === 'posts' ? 'posts' : 'hidden'}>
            {posts.map((post) => (
                <div className='post-card' key={post.id}>
                    <img src={post.img} alt={post.title} />
                    <h2>{post.title}</h2>
                    <h3>Опубліковано {formatDate(post.dateOfPublish)}</h3>
                    <div className='post-div'>
                        <p>{post.price} грн</p>
                        <button className='delete-Btn'>Видалити</button>
                    </div>
                </div>
                ))}
            </div>
            <div className={activeSection === 'profile' ? 'profile' : 'hidden'}>
                <img
                    src={'https://api.dicebear.com/9.x/adventurer/svg?seed=Alex'}
                    alt="Аватар користувача"
                    className="avatar"
                />

                <div className='user-info'>
                    <h3>Основна інформація:</h3>
                    <h4>Імя: <strong>{user.firstName}</strong></h4>
                    <h4>Фамілія: <strong>{user.lastName}</strong></h4>
                    <h4>Email: <strong>{user.userEmail}</strong></h4>
                </div>
            </div>
        </div>
        </>
        
    );
};

export default HomePage;