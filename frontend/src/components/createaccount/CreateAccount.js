import React from 'react';
import './CreateAccount.css';

const CreateAccount = ({ onClose, loginPopupOpen }) => {
    return (
        <div className='create-account-overlay'>
            <div className='create-account-popup'>
                <button className='close-button' onClick={onClose}>×</button>
                <h2>Create Account</h2>
                <form>
                    <input type="text" placeholder="Full Name"/>
                    <input type="date" placeholder="Date of birth"/>
                    <input type="text" placeholder="Username" required/>
                    <input type="email" placeholder="Email" required/>
                    <input type="password" placeholder="Password" required/>
                    <input type="password" placeholder="Confirm Password" required/>
                    <button type="submit">Create Account</button>
                </form>
                <div className='signup-section'>
                    <p>Already have an account?</p>
                    <button className='login-button' onClick={() => {onClose(); loginPopupOpen();}}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount