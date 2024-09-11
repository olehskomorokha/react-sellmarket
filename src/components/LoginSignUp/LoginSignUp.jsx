import './LoginSignUp.css'

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import { useState } from 'react'

const LoginSingUp = () => {
    const [action, setAction] = useState("Login");
    return(
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                {action==="Login"?<div></div>:
                    <>
                    <div className='input'>
                        <img src={user_icon} alt=""></img>
                        <input type="text" placeholder='name'></input>
                    </div>
                    <div className='input'>
                        <img src={user_icon} alt=""></img>
                        <input type="text" placeholder='surname'></input>
                    </div> 
                    </>
                }
                <div className='input'>
                    <img src={email_icon} alt=""></img>
                    <input type="email" placeholder='email'></input>
                </div>
                <div className='input'>
                    <img src={password_icon} alt=""></img>
                    <input type="password" placeholder='password'></input>
                </div>
            </div>
            {action==="Sign Up"?<div></div>:
                <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
            }
            <div className='submit-container'>
                <div className={action ==="Login"?"submit gray":"submit"} onClick={() => {setAction("Sign Up")}}>Sign Up</div>
                <div className={action ==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>

            </div>
        </div>
    )
}

export default LoginSingUp