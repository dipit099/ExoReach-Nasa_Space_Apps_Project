import React, { useState } from 'react';
import './CreateAccount.css';

const CreateAccount = ({ onClose, loginPopupOpen }) => {
    
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            fullName,
            dateOfBirth,
            username,
            email,
            password,
            confirmPassword
        });

        onClose();
    };

    return (
        <div className='create-account-overlay'>
            <div className='create-account-popup'>
                <button className='close-button' onClick={onClose}>×</button>
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value.trimStart())}
                        onBlur={() => setFullName(fullName.trim())}
                    />
                    <input
                        type="date"
                        placeholder="Date of birth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.trimStart())}
                        onBlur={() => setUsername(username.trim())}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Create Account</button>
                </form>
                <div className='signup-section'>
                    <p>Already have an account?</p>
                    <button className='login-button' onClick={() => { onClose(); loginPopupOpen(); }}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;
