import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { SERVER_URL } from './config';

function ImportPage() {
    const [passwordVerified, setPasswordVerified] = useState(true); // Assuming verified for the sake of example
    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('')
    const [isLoading, setLoading] = useState(false);


    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.name.endsWith('.xlsm')) {
            setFile(selectedFile);
        } else {
            alert('Please choose a valid .xlsm file.');
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            const responseDelete = await fetch(SERVER_URL + '/api/plans/', {
                method: 'DELETE'
            });
            const dataDelete = await responseDelete.json();
            if (responseDelete.ok) setMessage(dataDelete.message)
            else setMessage(dataDelete.error)
        } catch (error) {
            console.error('Erorr: ' + error)
        } finally {
            setLoading(false);
        }
    }
    const handleAddPlans = async () => {
        try {
            const fd = new FormData();
            fd.append('file', file, file.name);
            setLoading(true);

            const response = await fetch(SERVER_URL + '/api/plans/', {
                method: 'POST',
                body: fd,
            });
            const data = await response.json();
            if (response.ok) setMessage(data.message)
            else setMessage(data.error)
        } catch (error) {
            console.error('Erorr: ' + error)
        } finally {
            setLoading(false);
        }
    }
    const handleAddBenefits = async () => {
        try {
            const fd = new FormData();
            fd.append('file', file, file.name);
            setLoading(true);
            const response2 = await fetch(SERVER_URL + '/api/benefits/', {
                method: 'POST',
                body: fd,
            });
            const data2 = await response2.json();
            if (response2.ok) setMessage(data2.message)
            else setMessage(data2.error)

        } catch (error) {
            console.error('Erorr: ' + error)
        } finally {
            setLoading(false);
        }
    }
    const handleSubmit = async () => {
        await handleDelete()
       await handleAddPlans()
      await  handleAddBenefits()
    }

    const handleDeleteButtonClick = () => {
        setShowModal(true);
    };

    const handleDeleteConfirm = () => {
        setShowModal(false);
    };

    const handleDeleteCancel = () => {
        setShowModal(false);
    };

    if (!passwordVerified) {
        return <Link to="/password" />;
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-5 rounded">
                <h2 className="mb-4">Import Data for T-Chart</h2>
                {isLoading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p>Loading...</p>
                    </div>
                ) : (
                    <div className='mb-3'>{message}</div>
                )}
                <div className="form-row px-2 d-flex justify-content-center align-items-center">
                    <div className="form-group d-flex justify-content-center align-items-center">
                        <label className="form-label mr-2" htmlFor="inputField">
                            Import excel file
                        </label>
                        <input onChange={handleFileChange} type="file" accept='.xlsm' className="form-control mr-2" />
                        <button disabled={!file} className='btn btn-primary mr-2' onClick={handleSubmit}>
                            Submit
                        </button>
                        <button className='btn btn-danger' onClick={handleDeleteButtonClick}>
                            Delete all data
                        </button>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={handleDeleteCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete all data?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteCancel}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ImportPage;
