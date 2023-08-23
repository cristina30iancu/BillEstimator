import React, { useEffect, useState } from "react";
import { SERVER_URL } from "./config";

function PasswordPage({ setPasswordVerified }) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [reset, setReset] = useState(false);
    const [message, setMessage] = useState("")

    const checkPassword = async () => {
        const res = await fetch(SERVER_URL + "/api/hashed-password",{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldPassword }),
        });
        const data = await res.json();
        if(res.ok){
            setPasswordVerified(true);
        } else setMessage(data) 
    };

    const handleReset = async () => {
        const res = await fetch(SERVER_URL + "/api/reset-password", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldPassword, newPassword }),
        });
        const data = await res.json();
        if (res.ok) {
            setPasswordVerified(true);
        } else setMessage(data)
    };

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleSubmit = async () => {
        checkPassword();
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-5 rounded">
                <h2 className="mb-4">Password Protected Page</h2>
                <p className="text-danger">{message}</p>                       
                <div className="form-row px-2 d-flex justify-content-center align-items-center">
                    <div className="form-group d-flex justify-content-center align-items-center">
                        <label className="form-label mr-2" htmlFor="oldPasswordField">
                            Password:
                        </label>
                        <input onChange={handleOldPasswordChange} value={oldPassword} type="password" className="form-control mr-2" />
                    </div>
                </div>
                {reset && <div className="form-row px-2 d-flex justify-content-center align-items-center">
                    <div className="form-group d-flex justify-content-center align-items-center">
                        <label className="form-label mr-2" htmlFor="newPasswordField">
                            New Password:
                        </label>
                        <input onChange={handleNewPasswordChange} value={newPassword} type="password" className="form-control mr-2" />

                    </div>
                </div>}
                <div className="form-group d-flex justify-content-center align-items-center mt-3">
                    {!reset && <button className="btn btn-danger mr-5" onClick={() => setReset(true)}>
                        Reset
                    </button>}
                    {reset && <button className="btn btn-success mr-2" onClick={handleReset}>
                        Submit
                    </button>}
                    {reset && <button className="btn btn-danger mr-2" onClick={() => setReset(false)}>
                        Cancel
                    </button>}
                   {!reset &&  <button className="btn btn-primary" onClick={handleSubmit}>
                        Submit
                    </button> }
                </div>
            </div>
        </div>
    );
}

export default PasswordPage;