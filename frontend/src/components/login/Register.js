import React, { useState } from 'react';
import './Register.css';  
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SERVER_URL from '../../config/SERVER_URL';

const Register = ({ onClose, loginPopupOpen }) => {
    
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState(''); 


const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
        fullName,
        dateOfBirth,
        username,
        email,
        password,
        confirmPassword,
        gender 
    };

    if(password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
    }

    try {
        const response = await axios.post(`${SERVER_URL}/register`, userData);
        console.log('Registration successful:', response.data);       
        onClose();
        toast.success('Registration successful');
        toast.success('Please login to continue');
    } catch (error) {
        if (error.response) {
            console.error('Registration error:', error.response.data.message);
            toast.error(`Error: ${error.response.data.message}`);
        } else if (error.request) {
            console.error('No response received:', error.request);
            toast.error('Please provide unique username and email');
        } else {
            console.error('Error in setup:', error.message);
            toast.error(`Error: ${error.message}`);
        }
    }
   
};


    return (
        <div className='register-overlay'>
            <div className='register-popup'>
                {/* Close button with X icon */}
                <button className='register-close-button' onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                <div className='register-two-div'>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value.trimStart())}
                        onBlur={() => setFullName(fullName.trim())}
                    />
                   
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.trimStart())}
                        onBlur={() => setUsername(username.trim())}                       
                        required
                        className="register-input-username"
                    />
                      </div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                  
                    <div className='register-two-div'>
                    <input
                        type="date"
                        placeholder="Date of birth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />

                    {/* Gender Dropdown */}
                    <select 
                        value={gender} 
                        onChange={(e) => setGender(e.target.value)} 
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Female">Rather not say</option>
                    </select>
                    </div>
                    <div className='register-two-div'>
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
                    </div>
                    <br />
                    <button className='register-button' type="submit">Register</button>  
                </form>
                <div className='register-signup-section'>
                    <p>Already have an account?
                    <button className='register-login-button' onClick={() => { onClose(); loginPopupOpen(); }}>Log in</button></p>
                </div>
            </div>
        </div>
    );
}

export default Register;
