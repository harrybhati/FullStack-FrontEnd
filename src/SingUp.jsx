// SignupPage.js
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './SignupPage.css';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const { role } = JSON.parse(user);
           
            if (role === 'IT_USER_NORMAL') {
                navigate('/userCompany');
            } else {
                navigate('/list');
            }
        }
    }, [navigate]);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:4500/register', data);
            if (response.data.redirectUrl) {
                
                const userData = {
                    name: data.name,
                    username: data.username,
                    role: data.role,  
                };

                localStorage.setItem('user', JSON.stringify(userData)); 
                navigate(response.data.redirectUrl); 
            } 
        } catch (error) {
            console.log(error);
            alert("Internal Server Error");
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input id="name" type="text" {...register('name', { required: 'Name is required' })} />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input id="username" type="text" {...register('username', {
                        required: 'Username is required',
                        minLength: {
                            value: 5,
                            message: 'Username must be at least 5 characters long'
                        }
                    })} />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>
                <div>
                    <label htmlFor="role">Role:</label>
                    <select id="role" {...register('role', { required: 'Role is required' })}>
                        <option value="">Select Role</option>
                        <option value="IT_ADMIN">Admin</option>
                        <option value="IT_USER_NORMAL">User</option>
                    </select>
                    {errors.role && <p>{errors.role.message}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" {...register('email', { required: 'Email is required' })} />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" {...register('password', { 
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters long'
                        }
                    })} />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div>
                    <label htmlFor="mobile">Mobile:</label>
                    <input id="mobile" type="text" {...register('mobile', { 
                        required: 'Mobile is required',
                        minLength: {
                            value: 10,
                            message: 'Mobile number must be exactly 10 digits long'
                        },
                        maxLength: {
                            value: 10,
                            message: 'Mobile number must be exactly 10 digits long'
                        },
                        pattern: {
                            value: /^[0-9]+$/,
                            message: 'Mobile number must be numeric'
                        }
                    })} />
                    {errors.mobile && <p>{errors.mobile.message}</p>}
                </div>
                <button type="submit">Signup</button>
            </form>
            <p style={{ color: "black", fontSize: "20px" }}>
                Already registered user <Link to='/login'>Login</Link>
            </p>    
        </div>
    );
};

export default SignupPage;
