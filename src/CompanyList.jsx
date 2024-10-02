import React, { useState, useEffect } from 'react';
import './CompanyList.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const CompanyList = () => {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get('http://localhost:4500/companylist');
            setCompanies(response.data || []); 
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    const handleLogout = () => {
        localStorage.clear("user");
        navigate('/login');
    };

    const handleCreate = () => {
        navigate('/CreateCompany');
    };

    const handleEdit = (id) => {
        console.log("Navigating to edit company:", id);
        navigate(`/edit/${id}`); 
    };

    
    const handleDelete = async (id) => {
        console.log("Deleting company with id:", id);
        try {
            await axios.delete(`http://localhost:4500/companylist/${id}`); // Delete from the backend
            
            fetchCompanies();
        } catch (error) {
            console.error('Error deleting company:', error);
        }
    };

    
    const handleApprove = async (id) => {
        try {
            await axios.patch(`http://localhost:4500/companylist/${id}/approve`); // Update the status
            
            fetchCompanies(); 
        } catch (error) {
            console.error('Error approving company:', error);
        }
    };

   
    const filteredCompanies = companies.filter(company =>
        company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        company.companyAddress.toLowerCase().includes(searchTerm.toLowerCase()) || 
        company.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="company-list-container">
            <h2>Company List</h2>
            
            <input
                type="text"
                placeholder="Search by company name, address, or created by..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="search-input"
            />
            <table>
                <thead>
                    <tr>
                        <th>SNo.</th>
                        <th>Company Name</th>
                        <th>Company Address</th>
                        <th>Created By</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCompanies.length > 0 ? (
                        filteredCompanies.map((company, index) => (
                            <tr key={company._id}>
                                <td>{index + 1}</td>
                                <td>{company.companyName}</td>
                                <td>{company.companyAddress}</td>
                                <td>{company.role}</td>
                                <td>
                                    <button className="edit-button" onClick={() => handleEdit(company._id)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDelete(company._id)}>Delete</button>
                                    {company.status === 'pending' ? (
                                        <button className="approve-button" onClick={() => handleApprove(company._id)}>
                                            Approve
                                        </button>
                                    ) : (
                                        <span>Approved</span> 
                                    )}
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
