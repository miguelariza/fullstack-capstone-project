import React, { useEffect, useState } from 'react';
import './LoginPage.css';
// Task 1. Import url config
import { urlConfig } from '../../config';
// Task 2. Import useAppContext
import { useAppContext } from '../../context/AuthContext';
// Task 3. Import useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ success, setSuccess ] = useState(false);
    const [ error, setError ] = useState(null);

    // Task 4. State for incorrect password
    const [incorrect, setIncorrect] = useState('');
    
    // Task 5. Create local vars for:
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();
    const bearerToken = sessionStorage.getItem('token');

    // Task 6. Verify if bearer token has a value
    useEffect(() => {
        if(bearerToken && bearerToken.trim().length > 0) {
            navigate('/app');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!email || !password) {
            setIncorrect("Missing information. Please fill in all fields");
            setTimeout(() => {
                setIncorrect("");
              }, 2000);
        }

        setError('');

        try {

            const loginForm = {
                email: email,
                password: password
            };

            let url = `${urlConfig.backendUrl}/api/auth/login`;
            // Task 7,8,9. Set post, headers, and body
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearerToken ? `Bearer ${bearerToken}` : '', // Include Bearer token if available
                },
                body: JSON.stringify(loginForm)
            });
            // Task 9. Access data in json format
            const data = await response.json();
            console.log(data);
            if(!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || 'Login failed. Check your approach.')
            }
            console.log(data.user.firstName);
            const token = data.token;
            if(!token) {
                throw new Error('Authentication failed: Token value is empty.');
            }
            // Task 10. Set user details in session storage
            const user = data.user;
            if (token) {
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('name', user.firstName);
                sessionStorage.setItem('email', user.email);
                setIsLoggedIn(true);
                navigate('/app');
            } else {
                document.getElementById('email').value = "";
                document.getElementById('password').value = "";
                setIncorrect("Wrong password. Try again.");
                setTimeout(() => {
                    setIncorrect("");
                  }, 2000);
            }

        } catch(error) {
            console.log('We have a problem.');
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
                                        type='email'
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

                                {/* Sign in button */}
                                <button type="button" className="btn btn-primary w-100 mb-3" onClick={handleLogin}>Sign in</button>
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