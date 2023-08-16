import React, { useState } from 'react';

function PasswordPage({ setPasswordVerified }) {
    const [password, setPassword] = useState('');
    const correctPassword = 'your_password';

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        if (password === correctPassword) {
            setPasswordVerified(true);
        } else {
            alert('Incorrect password. Please try again.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-5 rounded">
                <h2 className="mb-4">Password Protected Page</h2>
                <div className="form-row px-2 d-flex justify-content-center align-items-center">
                    <div className="form-group d-flex justify-content-center align-items-center">
                        <label className="form-label mr-2" htmlFor="inputField">
                            Password:
                        </label>
                        <input onChange={handlePasswordChange} type="password" className="form-control mr-2" />
                        <button className='btn btn-primary' onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PasswordPage;
