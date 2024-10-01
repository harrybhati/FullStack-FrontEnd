import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserCompanyList.css';

const UserCompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const FetchCom = async () => {
        const auth = localStorage.getItem("user");
        let UserName = '';
        if (auth) {
            const user = JSON.parse(auth);
            UserName = user.username;
        }

        try {
            const response = await axios.get(`http://localhost:4500/companies?username=${UserName}`);
            setCompanies(response.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
            setError('Failed to fetch companies. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        FetchCom(); 
    }, []);

    const handleCreateCompany = () => {
        navigate('/CreateCompany');
    };

    const Log = () => {
        localStorage.clear("user");
        navigate('/login');
    };

    return (
        <div className="company-list-container">
            <h1>My Registered Companies</h1>
            <button onClick={handleCreateCompany} className="create-company-btn">Create New Company</button>
            <button onClick={Log}>Log Out</button>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>No data found</p>
            ) : companies.length > 0 ? (
                <table className="company-list-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Company Name</th>
                            <th>Company Address</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map((company, index) => (
                            <tr key={company.id}>
                                <td>{index + 1}</td>
                                <td>{company.companyName}</td>
                                <td>{company.companyAddress}</td>
                                <td>{company.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No companies registered yet.</p>
            )}
        </div>
    );
};

export default UserCompanyList;
