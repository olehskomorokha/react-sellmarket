import '../index.css';
const Header = () =>{
    const jwtToken = localStorage.getItem('jwtToken'); // Check for the token
    return (
        <div class="Header">
            <div class="buttons">
            <button id="addProduct-button">Додати оголошення</button>
                {jwtToken ? (
                    // If JWT token exists, show profile button
                    <button id="Home-button">Мій профіль</button>
                ) : (
                    // If no JWT token, show login/registration button
                    <button id="login-button">Логін/Регестрація</button>
                )}
            </div>
        </div>
    )
}
export default Header