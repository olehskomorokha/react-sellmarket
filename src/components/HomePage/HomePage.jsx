import React from 'react';
import Header from '../Headers/Header'
import './CSS/HomePage.css'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import PostsSection from './PostsSection';
import ProfileSection from './ProfileSection';
import {Modal, Button} from 'react-bootstrap';
import Settings from './Settings';

const HomePage = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () =>{
        setShow(false)  
    }
    const handleClickLogout = () => {
        setShow(true);
    }
    
    const [userNick, setUserNick] = useState("");
    const [userAdress, setUserAdress] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const token = localStorage.getItem("token");
    const [activeSection, setActiveSection] = useState('posts');
    const [activeButton, setActiveButton] = useState('posts');
    const [posts, setUserPosts] = useState([]);
    const [user, setUserInfo] = useState([]);
    const getUserProducts = async () => {
        try{
            const url = `https://localhost:7118/api/Product/GetUserPosts`;
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
        }
        catch (error){
            console.log(error);
        }
    }
    const getUserInfo = async () => {
        try{
            const url = `https://localhost:7118/api/User/getUserInfo`;
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
            
            setUserNick(data.nickName || "");
            setUserAdress(data.address || "");
            setUserPhone(data.phoneNumber || "");
            setUserInfo(data);
        }
        catch (error){
            console.log(error);
        }

    }

    const addUserAddress = async () =>{
        let userContactModel = {
            nickName: userNick,
            adress: userAdress,
            phone: userPhone
        }
        try{
            const url = `https://localhost:7118/api/User/AddUserAddress`;
            const response = await fetch(url,  {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userContactModel)
                }
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            localStorage.setItem('activeSection', 'profile');
            window.location.reload();
            setIsEditing(false);
            
            
            console.log(data);
        }
        catch (error){
            console.log(error);
        }

    }
    const handleSectionChange = (section) => {
        setActiveSection(section);
        setActiveButton(section);
        localStorage.setItem('activeSection', section);
    };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('uk-UA', options);
    };
    const logout = () =>{
        localStorage.removeItem('token');
        navigate('/');
    }
    useEffect(() => {
        getUserProducts();
        getUserInfo();
        // Відновити активну секцію після перезавантаження
        const savedSection = localStorage.getItem('activeSection');
        if (savedSection) {
            setActiveSection(savedSection);
            setActiveButton(savedSection);
        }
        }, []);
   
    
    const handleContactForm = () => {
        setIsEditing((prev) => !prev);
    }
    return (
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Розлогінитись</Modal.Title>
            </Modal.Header>
            <Modal.Body>Впевнені що хочите вийти?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={logout}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>

        <Header />
        <div className='home-page'>
           <h1>Профіль</h1>
           <header className='header2'>
            
            <button id="myPost" className={activeButton === 'posts' ? 'active-btn' : 'nav-button'} onClick={() => handleSectionChange('posts')}>Мої оголошення</button>
            <button id="Profile" className={activeButton === 'profile' ? 'active-btn' : 'nav-button'} onClick={() => handleSectionChange('profile')}>Профіль</button>
            <button id="ProfileSettings" className={activeSection === 'ProfileSettings' ? 'active-btn' : 'nav-button'} onClick={() => handleSectionChange('ProfileSettings')}>Налаштування</button>
            <button id="Pay" className='nav-button'>Оплата</button>
            
           <button id="logout-btn" onClick={handleClickLogout}>Вийти</button>
           </header>
           
           <div className='home-page'>
                {activeSection === 'posts' && <PostsSection posts={posts} formatDate={formatDate} handleClose={handleClose}/>}
                {activeSection === 'profile' && (
                    <ProfileSection
                        user={user}
                        isEditing={isEditing}
                        handleContactForm={handleContactForm}
                        setUserNick={setUserNick}
                        setUserAdress={setUserAdress}
                        setUserPhone={setUserPhone}
                        userNick={userNick}
                        userAdress={userAdress}
                        userPhone={userPhone}
                        addUserAddress={addUserAddress}
                    />
                )}
                {activeSection === 'ProfileSettings' && 
                    <Settings />
                }
            </div>

        </div>
        </>
        
    );
};

export default HomePage;