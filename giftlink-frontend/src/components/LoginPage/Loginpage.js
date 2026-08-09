import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ success, setSuccess ] = useState(true);
    const [ error, setError ] = useState(null);
    const [incorrect, setIncorrect] = useState('');
    
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();
    const bearerToken =  () => {
        const existingToken = sessionStorage.getItem('token');
        return !!(existingToken && existingToken.trim().length > 0);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if(bearerToken()) {
            setError('Action blocked: You are already logged in with a valid token.');
            navigate('/app');
            return;
        }

        try {

            const loginForm = {
                email: email,
                password: password
            };

            let url = `${urlConfig.backendUrl}/api/auth/login`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginForm)
            });

            if(!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || 'Login failed. Check your approach.')
            }

            const data = await response.json();

            const authHeader = response.headers.get('Authorization');
            if(!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new Error('Authentication failed: Missing or invalid Bearer prefix.');
            }

            const token = authHeader.substring(7).trim();
            if(!token) {
                throw new Error('Authentication failed: Token value is empty.');
            }

            const hashedPass = data.password;
            const isMatch = await bcrypt.compare(password, hashedPass);
            if(!isMatch) {
                setIncorrect("");
                throw new Error('Authentication failed: Invalid password credentials.');
            }

            sessionStorage.setItem('token', token);
            if(data.email) {
                sessionStorage.setItem('name', data.firstName);
                sessionStorage.setItem('email', data.email);
                setSuccess(true);
                setIsLoggedIn(true);
                navigate('/app');
            }

        } catch(error) {
            setError(error.message || 'An unexpected error occurred.');
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
                                        type='password'
                                        placeholder="Enter your password"
                                        id='password'
                                        name='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span style={{color:'red',height:'.5cm',display:'block',fontStyle:'italic',fontSize:'12px'}}>{incorrect}</span>
                                </div>

                                {/* Submit button */}
                                <a href="#" type="submit" onClick={handleLogin} className='btn btn-primary'>Sign in</a>
                            
                                {/* footnote with link */}
                                <div className="form-footnote text-center small text-secondary mt-2">
                                    New here? <a href='/app/register'>Register</a>
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