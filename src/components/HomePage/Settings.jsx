import React from 'react';
import './CSS/Settings.css';
import { useState } from "react";

const Settings = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const toggleSection = () => {
        setIsOpen(!isOpen);
    };
    const handleSave = () => {
        console.log("Новий номер телефону:", phoneNumber);
        // Додайте тут логіку для збереження номера
        setIsOpen(false); // Закрити секцію після збереження
      };
  return (
    <div className="ProfileSettings">
<div className="toggle-container">
      <div className="toggle-header" onClick={toggleSection}>
        <span>Змінити номер</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="toggle-body">
          <label className="toggle-label">Новий телефон</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="toggle-input"
          />
          <button onClick={handleSave} className="toggle-button">
            Зберегти
          </button>
        </div>
      )}
    </div>
    </div>
  );
}


export default Settings;