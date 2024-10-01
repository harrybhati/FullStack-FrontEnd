import React, { useState, useEffect } from 'react';
import './CompanyList.css'; // Create a CSS file for styling
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls

const CompanyList = () => {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch companies when the component mounts
    useEffect(() => {
        fetchCompanies();
    }, []);

    // Fetch companies from the server
    const fetchCompanies = async () => {
        try {
            const response = await axios.get('http://localhost:4500/companylist');
            console.log('Response Data:', response.data); // Check the structure
            setCompanies(response.data || []); // Set data directly
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.clear("user");
        navigate('/login');
    };

    // Handle create company action
    const handleCreate = () => {
        navigate('/CreateCompany');
    };

    // Handle edit company
    const handleEdit = (id) => {
        console.log("Navigating to edit company:", id);
        navigate(`/edit-company/${id}`); // Navigate to the edit page with the company ID
    };

    // Handle delete company
    const handleDelete = async (id) => {
        console.log("Deleting company with id:", id);
        try {
            await axios.delete(`http://localhost:4500/companylist/${id}`); // Assuming delete endpoint
            setCompanies(companies.filter(company => company._id !== id)); // Update local state after deletion
        } catch (error) {
            console.error('Error deleting company:', error);
        }
    };

    return (
        <div className="company-list-container">
            <h2>Company List</h2>
            <table>
                <thead>
                    <tr>
                        <th>SNo.</th>
                        <th>Company Name</th>
                        
                        <th>Company Address</th>
                        <th>CreatedBy</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.length > 0 ? (
                        companies.map((company, index) => (
                            <tr key={company._id}>
                                <td>{index + 1}</td>
                                <td>{company.companyName}</td>
                                
                                
                                <td>{company.companyAddress}</td>
                                <td>{company.role}</td>
                                <td>
                                    <button className="edit-button" onClick={() => handleEdit(company._id)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDelete(company._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No companies found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleCreate}>Create Company</button>
        </div>
    );
};

export default CompanyList;
