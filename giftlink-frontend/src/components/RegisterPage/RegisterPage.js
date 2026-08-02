import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Insert API or Auth login
        console.log('Form data submitted', formData);
    };

    return (
        <div className='card'>
            <h2 className='card-title'>Create an account</h2>
            <form onSubmit={handleSubmit}>
                {/* First Name */}
                <div className='form-group'>
                    <label htmlFor='firstName'>First Name</label>
                    <input
                        className='form-control form-control-lg'
                        type='text'
                        id='firstName'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Last Name */}
                <div className='form-group'>
                    <label htmlFor='lastName'>Last Name</label>
                    <input
                        className="form-control form-control-lg"
                        type='text'
                        id='lastName'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Email */}
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                        className='form-control form-control-lg'
                        type='text'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Password */}
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        className='form-control form-control-lg'
                        type='text'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Submit button */}
                <a href="#" type="submit" className='btn btn-primary'>Register</a>
            </form>
        </div>
    );
};

export default RegisterPage;