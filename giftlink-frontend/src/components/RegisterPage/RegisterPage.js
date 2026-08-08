import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ loading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();

    const handleRegister = async () => {
        e.preventDefault();

        setError('');
        setIsLoading(true);

        const registerForm = {
            firstName: setFirstName,
            lastName: setLastName,
            email: setEmail,
            password: setPassword
        };

        try {
            //Step 1: Implement API call
            let url = `${urlConfig.backendUrl}/api/auth/register`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerForm)
            });

            const data = await JSON.response();
            if(!response) {
                throw new Error(data.error || 'Failed to register. Check your approach.')
            }

            console.log('Point on the board! User registered:', data.user);
            //Step 2: Access data, login, set the AuthContext and set user details
            if(data.token) {
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('name', firstName);
                sessionStorage.setItem('email', data.email);
                setIsLoggedIn(true);
                navigate('/app');
            }

        } catch(error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid my-5">
            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
                <div className="col-md-4">
                    <div className='card product-card'>
                        <div className="card-body">
                            <form className='d-flex flex-column gap-3'>
                                {/* Heading and subtitle */}
                                <div className="mb-1">
                                    <h2 className="h3 fw-semibold text-dark">Create your account</h2>
                                    <p className="text-secondary-emphasis small">Join our community in just a few steps.</p>
                                </div>

                                {/* First Name */}
                                <div className='form-group'>
                                    <label htmlFor='firstName'>First Name</label>
                                    <input
                                        className='form-control form-control-lg'
                                        type='text'
                                        placeholder="Enter your first name"
                                        id='firstName'
                                        name='firstName'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Last Name */}
                                <div className='form-group'>
                                    <label htmlFor='lastName'>Last Name</label>
                                    <input
                                        className="form-control form-control-lg"
                                        type='text'
                                        placeholder="Enter your last name"
                                        id='lastName'
                                        name='lastName'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className='form-group'>
                                    <label htmlFor='email'>Email</label>
                                    <input
                                        className='form-control form-control-lg'
                                        type='text'
                                        placeholder="Enter your email"
                                        id='email'
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input
                                        className='form-control form-control-lg'
                                        type='text'
                                        placeholder="Enter your password"
                                        id='password'
                                        name='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Submit button */}
                                <a href="#" type="submit" onClick={handleRegister} className='btn btn-primary'>Register</a>
                            
                                {/* footnote with link */}
                                <div className="form-footnote text-center small text-secondary mt-2">
                                    Already a member? <a href='/app/login'>Login</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;