import React from 'react';
import Header from '../Headers/Header'
import './CSS/HomePage.css'
import { useState, useEffect } from 'react';
// google map apis
import Autocomplete from "react-google-autocomplete";

const HomePage = () => {
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

    const addUserAdress = async () =>{
        let userContactModel = {
            nickName: userNick,
            adress: userAdress,
            phone: userPhone
        }
        try{
            const url = `https://localhost:7118/api/User/addUserAdress`;
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
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('uk-UA', options);
    };

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
                <div className='user-Avatar-info'>
                    <img
                        src={'https://api.dicebear.com/9.x/adventurer/svg?seed=Alex'}
                        alt="Аватар користувача"
                        className="avatar"
                    />

                    <div className='user-info'>
                        <h3>Основна інформація:</h3>
                        <label htmlFor="username">Імя</label>
                        <h4>{user.firstName}</h4>

                        <label htmlFor="userLastname">Фамілія</label>
                        <h4>{user.lastName}</h4>

                        <label htmlFor="userEmail">Email</label>
                        <h4>{user.userEmail}</h4>
                    </div>
                </div>

                <div className='user-contact-info'>
                    <h3>Контактна інформація</h3>
                    
                    <div className='contact-info' style={{ display: isEditing ? "none" : "" }}>
                        <button id='render-btn' onClick={handleContactForm}>редагувати</button>
                        <div>
                            <label htmlFor="nickName">нікнейм</label><br />
                            <h4>{user.nickName}</h4>
                        </div>
                                
                        <div>
                            <label htmlFor='place'>Місцерозташування</label><br />
                            <h4>{user.address}</h4>
                        </div>  
                        <div>
                            <label htmlFor='phone-number'>Номер телефону</label><br />
                            <h4>{user.phoneNumber}</h4>
                        </div>
                    </div>

                    <div className='contact-info-form' style={{ display: isEditing ? "" : "none" }}>
                        <form>
                            <div>
                                <label htmlFor="nickName">нікнейм</label><br />
                                <input id='nickName' 
                                    type="text" 
                                    onChange={e => setUserNick(e.target.value)} 
                                    placeholder='введіть нікнейм'
                                    value={userNick}/> <br />
                            </div>
                                
                            <div>
                                <label htmlFor='place'>Місцерозташування</label><br />
                                <Autocomplete
                                    apiKey = {process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                                    onPlaceSelected={(place) => console.log(place)}
                                    onChange={e => setUserAdress(e.target.value)}
                                    value={userAdress}
                                    >
                                </Autocomplete>
                            </div>  
                            <div>
                                <label htmlFor='phone-number'>Номер телефону</label><br />
                                <input id='phone-number' 
                                    type='tel' 
                                    placeholder='+380' 
                                    onChange={e => setUserPhone(e.target.value)} 
                                    required 
                                    maxLength={12}
                                    value={userPhone}
                                    />
                            </div>
                        </form>
                        <button className='discard-changes-button' type='submit' onClick={handleContactForm}>Скасувати</button>
                        <button className='save-button' type='submit' onClick={addUserAdress}>Зберегти</button>
                        
                    </div>
                   
                   
                </div>
               
            </div>

        </div>
        </>
        
    );
};

export default HomePage;