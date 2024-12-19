import React from 'react';
import './css/Menu.css';
const Menu = () => {
    return (
        <div className="Menu">
            <h1>Меню</h1>
            <div className='menu-list'>
                <button id='MainPage'> Головна </button>
                <button id='catalog'> Каталог</button>
                <button id='productWithDiscount'>Товари з знижкою</button>
                <button id='productWithDiscount'>Новинки</button>
                <button id='productWithDiscount'>Повернення та обмін</button>
                <button id='productWithDiscount'>Доставка та оплата</button>
                <button id='productWithDiscount'>Контакти</button>
                <button id='productWithDiscount'>Відгуки</button>
            </div>
        </div>
    )
}

export default Menu;