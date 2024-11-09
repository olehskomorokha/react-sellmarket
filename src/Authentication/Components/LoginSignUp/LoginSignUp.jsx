import './LoginSignUp.css'
import { useNavigate } from 'react-router-dom';

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import { useState } from 'react'

const LoginSingUp = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Login");

    const submit = async () => {
        let user = {
            FirstName: document.getElementById('nameInput').value,
            LastName: document.getElementById('lastnameInput').value,
            Email: document.getElementById('emailInput').value,
            Password: document.getElementById('passwordInput').value
        };

        try {
            let response = await fetch('https://localhost:44383/api/User/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user) 
            });

            if (response.ok) {
                alert('User registered successfully');
                navigate("/");
            } else {
                console.log("Email already exists");
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error registering user');
        }
    };
    const login = async () => {
        let user = {
            Email: document.getElementById('emailInput').value,
            Password: document.getElementById('passwordInput').value
        };

        try {
            let response = await fetch('https://localhost:44383/api/User/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                let token = await response.text();
                alert('Login successful');
                
                localStorage.setItem('token', token);
                navigate("/");
            } else {
                let errorMessage = await response.text();
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error logging in');
        }
    };


    return(
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                {action === "Login" ? <div></div> :
                    <>
                        <div className='input'>
                            <img src={user_icon} alt=""></img>
                            <input type="text" placeholder='name' id="nameInput"></input>
                        </div>
                        <div className='input'>
                            <img src={user_icon} alt=""></img>
                            <input type="text" placeholder='surname' id="lastnameInput"></input>
                        </div>
                    </>
                }
                <div className='input'>
                    <img src={email_icon} alt=""></img>
                    <input type="email" placeholder='email' id="emailInput"></input>
                </div>
                <div className='input'>
                    <img src={password_icon} alt=""></img>
                    <input type="password" placeholder='password' id="passwordInput"></input>
                </div>
            </div>
            {action === "Sign Up" ? <div></div> :
                <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
            }
            <div className='submit-container'>
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
                <button id="submitBtn" type="submit" onClick={action === "Login" ? login : submit}>Submit</button>
            </div>
        </div>
    )
}

export default LoginSingUp