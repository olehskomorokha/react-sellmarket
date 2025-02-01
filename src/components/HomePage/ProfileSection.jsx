import React from 'react';
import './CSS/HomePage.css';
// google map apis
import Autocomplete from "react-google-autocomplete";

const ProfileSection = ({
    user,
    userNick,
    userAdress,
    userPhone,
    isEditing,
    setUserNick,
    setUserAdress,
    setUserPhone,
    handleContactForm,
    addUserAddress,
}) => {
  return (
    <div className="profile">
            <div className="user-Avatar-info">
                <img
                    src={'https://api.dicebear.com/9.x/adventurer/svg?seed=Alex'}
                    alt="Аватар користувача"
                    className="avatar"
                />

                <div className="user-info">
                    <h3>Основна інформація:</h3>
                    <label htmlFor="username">Ім'я</label>
                    <h4>{user.firstName}</h4>

                    <label htmlFor="userLastname">Прізвище</label>
                    <h4>{user.lastName}</h4>

                    <label htmlFor="userEmail">Email</label>
                    <h4>{user.userEmail}</h4>
                </div>
            </div>

            <div className="user-contact-info">
                <h3>Контактна інформація</h3>

                <div className="contact-info" style={{ display: isEditing ? "none" : "" }}>
                    <button id="render-btn" onClick={handleContactForm}>Редагувати</button>
                    <div>
                        <label htmlFor="nickName">Нікнейм</label><br />
                        <h4>{user.nickName}</h4>
                    </div>
                    <div>
                        <label htmlFor="place">Місцерозташування</label><br />
                        <h4>{user.address}</h4>
                    </div>
                    <div>
                        <label htmlFor="phone-number">Номер телефону</label><br />
                        <h4>{user.phoneNumber}</h4>
                    </div>
                </div>

                <div className="contact-info-form" style={{ display: isEditing ? "" : "none" }}>
                    <form>
                        <div>
                            <label htmlFor="nickName">Нікнейм</label><br />
                            <input
                                id="nickName"
                                type="text"
                                placeholder="Введіть нікнейм"
                                value={userNick}
                                onChange={(e) => setUserNick(e.target.value)}
                            /><br />
                        </div>
                        <div>
                            <label htmlFor="place">Місцерозташування</label><br />
                            <Autocomplete
                                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                                onPlaceSelected={(place) => console.log(place)}
                                onChange={(e) => setUserAdress(e.target.value)}
                                value={userAdress}
                            />
                        </div>
                        <div>
                            <label htmlFor="phone-number">Номер телефону</label><br />
                            <input
                                id="phone-number"
                                type="tel"
                                placeholder="+380"
                                value={userPhone}
                                onChange={(e) => setUserPhone(e.target.value)}
                                required
                                maxLength={12}
                            />
                        </div>
                    </form>
                    <button className="discard-changes-button" type="button" onClick={handleContactForm}>
                        Скасувати
                    </button>
                    <button className="save-button" type="button" onClick={addUserAddress}>
                        Зберегти
                    </button>
                </div>
            </div>
        </div>
  )
}

export default ProfileSection;