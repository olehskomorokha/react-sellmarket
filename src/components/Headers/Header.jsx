import { Link } from 'react-router-dom';
import '../Main/Main.css';
const Header = () =>{
    const jwtToken = localStorage.getItem('token'); // Check for the token
    return (
        <div className="Header">
            <div className="buttons">
            
                <Link to="/create-poster" className="button">
                    Додати оголошення
                </Link>
                {jwtToken ? (
                    // If JWT token exists, show profile button                    
                    <Link to="/HomePage" className="button">
                        Мій профіль
                    </Link>
                ) : (
                    // If no JWT token, show login/registration button
                    <Link to="/login" className="button">
                        Логін/Регестрація
                    </Link>
                )}
            </div>
        </div>
    )
}
export default Header