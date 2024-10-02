import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditCompanyList.css'
const EditCompany = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const { register, handleSubmit, setValue ,formState: { errors }} = useForm(); 

    useEffect(() => {
        fetchCompanyDetails();
    }, []);

    const fetchCompanyDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:4500/companylist/${id}`); 
            const { companyName, companyAddress } = response.data;
            setValue('companyName', companyName); 
            setValue('companyAddress', companyAddress); 
            navigate('/list');
        } catch (error) {
            console.error('Error fetching company details:', error);
        }
    };

    const onSubmit = async (data) => {
        try {
            await axios.put(`http://localhost:4500/companylist/${id}`, data); 
            navigate('/list'); 
        } catch (error) {
            console.error('Error updating company:', error);
        }
    };

    return (
        <div className="edit-company-container">
            <h2>Edit Company</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="companyName">Company Name:</label>
                    <input
                        type="text"
                        id="companyName"
                        {...register('companyName', { required: 'Company name is required' })} 
                    />
                    {errors.companyName && <p>{errors.companyName.message}</p>}
                </div>
                <div>
                    <label htmlFor="companyAddress">Company Address:</label>
                    <input
                        type="text"
                        id="companyAddress"
                        {...register('companyAddress', { required: 'Company address is required' })} 
                    />
                    {errors.companyAddress && <p>{errors.companyAddress.message}</p>}
                </div>
                <button type="submit">Update Company</button>
                <button type="button" onClick={() => navigate('/list')}>Cancel</button>
            </form>
        </div>
    );
};

export default EditCompany;
