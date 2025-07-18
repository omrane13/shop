import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";


function Login({ setIsAuthenticated }) {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        
        if (!email || !password) {
            return handleError('Email and password are required');
        }

        try {
            const response = await fetch("http://localhost:8000/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo),
            });


           const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message || 'Login failed');
                }
            

            //const { success, message, jwtToken} = result;
            //console.log(result)
            if (result.success && result.token) {
                handleSuccess(result.message);
                localStorage.setItem('token', result.token);
                localStorage.setItem('loggedInUser', result.user.name);
                setIsAuthenticated(true);
                navigate('/home'); 
            } else {
                handleError(result.message || 'Login failed');
            }
        } catch (err) {
            handleError(err.message || 'An error occurred during login');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        onChange={handleChange}
                        type="email"
                        name="email"
                        autoFocus
                        placeholder="Enter your email.."
                        value={loginInfo.email}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Enter your password.."
                        value={loginInfo.password}
                    />
                </div>
                <button type="submit">Login</button>
                <span>Don't have an account? <Link to="/signup">Signup</Link></span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;