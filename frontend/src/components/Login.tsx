import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import '../styles/Login.css';

interface LoginValues {
    email: string;
    password: string;
}

export const Login: React.FC = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState<LoginValues>({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false');
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:3000/login', values);

            if (res.data.statusCode === 200) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('user-fullName', res.data.name);
                localStorage.setItem('isAdmin', res.data.is_admin ? 'true' : 'false');
                localStorage.setItem('user-id', res.data.user_id);
                setIsLoggedIn(true);
                navigate('/progress');
                setValues({ email: '', password: '' });
            } else {
                setError('No Account Found');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred during login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow" style={{ width: '25rem' }}>
                <div className="card-body">
                    <h3 className="text-center mb-4">Log In</h3>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input 
                                name='email'
                                type="email" 
                                className="form-control" 
                                placeholder="Enter email" 
                                required
                                value={values.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                                name='password'
                                type={showPassword ? "text" : "password"}
                                className="form-control" 
                                placeholder="Enter password" 
                                minLength={4} 
                                required
                                value={values.password}
                                onChange={handleChange}
                            />
                            <button 
                                type="button" 
                                onClick={togglePasswordVisibility} 
                                className="btn btn-secondary mt-2"
                                style={{ width: '100%' }}
                            >
                                {showPassword ? "Hide" : "Show"} Password
                            </button>
                        </div>
                        <Button variant="primary" type="submit" className="w-100 mb-3" disabled={loading}>
                            {loading ? 'Logging In...' : 'Log In'}
                        </Button>
                        <div className="text-center">
                            <span>Don't have an account?</span>
                            <br />
                            <a href="/register" className="text-primary">
                                Register now
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
