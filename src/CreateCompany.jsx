import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'; 
import './CreateCompany.css';
import { useNavigate } from 'react-router-dom';

const CreateCompany = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const auth = localStorage.getItem("user");
    let UserRole = '';
    let username = '';

    if (auth) {
        const user = JSON.parse(auth);  
        UserRole = user.role; 
        username = user.username;  
    }
     
    const onSubmit = async (data) => {
        try {
            const userData = {
                username: username,
                role: UserRole,
                companyName: data.companyName,
                companyAddress: data.companyAddress,
                status: UserRole === 'IT_USER_NORMAL' ? 'pending' : 'approved', 
            };

            const response = await axios.post('http://localhost:4500/user/company', userData);

            if (UserRole === "IT_ADMIN") {
                navigate('/list');
            } else {
                alert("Company created. Awaiting admin approval.");
                navigate('/userCompany');
            }   
        } catch (error) {
            console.error('Error creating company:', error);
        }
    };

    const handleCancel = () => {
        navigate('/userCompany');
    };

    return (
        <div className="create-company-container">
            <h2>Create Company</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="companyName">Company Name:</label>
                    <input
                        id="companyName"
                        type="text"
                        {...register('companyName', { required: 'Company name is required' })}
                    />
                    {errors.companyName && <p className="error">{errors.companyName.message}</p>}
                </div>
                <div>
                    <label htmlFor="companyAddress">Company Address:</label>
                    <input
                        id="companyAddress"
                        type="text"
                        {...register('companyAddress', { required: 'Company address is required' })}
                    />
                    {errors.companyAddress && <p className="error">{errors.companyAddress.message}</p>}
                </div>
                <div className="button-container">
                    <button type="submit" className="save-button">Save</button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button> 
                </div>
            </form>
        </div>
    );
};

export default CreateCompany;
