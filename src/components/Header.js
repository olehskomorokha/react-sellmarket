import { Link } from 'react-router-dom';
import '../index.css';
const Header = () =>{
    const jwtToken = localStorage.getItem('jwtToken'); // Check for the token
    return (
        <div class="Header">
            <div class="buttons">
            <button id="addProduct-button">Додати оголошення</button>
                {jwtToken ? (
                    // If JWT token exists, show profile button
                    <button>Мій профіль</button>
                ) : (
                    // If no JWT token, show login/registration button
                    <Link to="/login" className='button'>
                        Логін/Регестрація
                    </Link>
                )}
            </div>
        </div>
    )
}
export default Header