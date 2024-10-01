import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const { role } = JSON.parse(user);
            // Redirect based on the user's role
            if (role === 'IT_USER_NORMAL') {
                navigate('/userCompany');
            } else {
                navigate('/list');
            }
        }
    }, [navigate]);
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:4500/login', data);
            const UserRole = response.data.role;
            
            if (UserRole === "IT_USER_NORMAL") { 
                const userData = {username: data.username, role: UserRole };
                localStorage.setItem('user', JSON.stringify(userData)); 
                navigate('/userCompany');
            } 
            else{
                const userData = {username: data.username, role: UserRole };
                localStorage.setItem('user', JSON.stringify(userData)); 
                navigate('/list');
            }
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
        
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        {...register('username', { required: 'Username is required' })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <button type="submit">Login</button>
            </form>
            <p style={{ color: "black", fontSize: "20px" }}> Don't have an account? <Link to='/'>Sign Up</Link></p>
        </div>
    );
};

export default LoginPage;
