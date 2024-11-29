import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../styles/Register.css'

interface RegisterValues {
    name: string;
    lastName: string;
    email: string;
    password: string;
}

export const Register: React.FC = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState<RegisterValues>({
        name: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3000/register', values);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user-email', values.email);
            localStorage.setItem('user-fullName', values.name + " " + values.lastName);
            navigate('/progress'); 

            setValues({ name: '', lastName: '', email: '', password: '' });
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.status === 400) {
                    alert(err.response.data);
                } else {
                    console.error(err);
                }
            } else {
                console.error(err);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow" style={{ width: '25rem' }}>
                <div className="card-body">
                    <h3 className="text-center mb-4">Register</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                required
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter first name"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                required
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter last name"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                required
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                required
                                name="password"
                                minLength={4}
                                type={showPassword ? "text" : "password"}
                                value={values.password}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter password"
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
                        <Button variant="primary" type="submit" className="w-100 mb-3">
                            Register
                        </Button>
                        <div className="text-center">
                            <span>Already a member?</span>
                            <br />
                            <a href="/login" className="text-primary">
                                Log in
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
