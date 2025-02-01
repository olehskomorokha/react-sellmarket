import React from 'react';
import './CSS/Settings.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [PhoneisOpen, setPhoneIsOpen] = useState(false);
    const [EmailisOpen, setEmailIsOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const togglePhoneSection = () => {
      setPhoneIsOpen(!PhoneisOpen);
    };
    const toggleEmailSection = () => {
      setEmailIsOpen(!EmailisOpen);
    }
    const handlePhoneNumber = async () => {
      try{
        const url = `https://localhost:7118/api/User/UpdateUserSettings`
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({phoneNumber: phoneNumber })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      }
      catch (error){
        console.log(error)
      }
      setPhoneIsOpen(false);
    }
    const handleUserEmail = async () => {
        try{
          const url = `https://localhost:7118/api/User/UpdateUserSettings`
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userEmail: email})
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          localStorage.removeItem('token');
          navigate('/login');
        }
        catch (error){
          console.log(error)
        }
        setEmailIsOpen(false);
      };
  return (
    <div className="ProfileSettings">
      <div className="toggle-container">
        <div className="toggle-header" onClick={togglePhoneSection}>
          <span>Змінити номер</span>
          <span>{PhoneisOpen ? "▲" : "▼"}</span>
        </div>
        {PhoneisOpen && (
          <div className="toggle-body">
            <label className="toggle-label">Новий телефон</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="toggle-input"
            />
            <button onClick={handlePhoneNumber} className="toggle-button">
              Зберегти
            </button>
          </div>
        )}
      </div>
      <div className="toggle-container">
        <div className="toggle-header" onClick={toggleEmailSection}>
          <span>Змінити Email</span>
          <span>{EmailisOpen ? "▲" : "▼"}</span>
        </div>
        {EmailisOpen && (
          <div className="toggle-body">
            <label className="toggle-label">Новий email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="toggle-input"
            />
            <button onClick={handleUserEmail} className="toggle-button">
              Зберегти
            </button>
          </div>
        )}
      </div>    
    </div>
    
  );
}


export default Settings;