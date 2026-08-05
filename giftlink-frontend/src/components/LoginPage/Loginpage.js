import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log("Login invoked.");
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
                                    <h2 className="h3 fw-semibold text-dark">Sign in</h2>
                                    <p className="text-secondary-emphasis small">Enter your credentials to log in.</p>
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
                                <a href="#" type="submit" onClick={handleLogin} className='btn btn-primary'>Register</a>
                            
                                {/* footnote with link */}
                                <div className="form-footnote text-center small text-secondary mt-2">
                                    New here? <a href='/app/register'>Register here</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;