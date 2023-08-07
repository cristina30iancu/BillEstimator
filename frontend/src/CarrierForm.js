import { useEffec, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


export const CarrierForm = () => {
    const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState({
        // Initialize your form data properties here
    });

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[index][name] = value;
        setRows(updatedRows);
    };

    const handleAddRow = () => {
        setRows([...rows, {}]);
    };

    const handleSubmit = () => {
        // Handle form submission and update state accordingly
    };
    return (
        <>
            <div className='row mx-1' style={{ borderTop: '1px solid black' }}>
                <p className='mt-3 font-weight-bold'>Carrier Plans</p> <br></br>
            </div>
            <div class="form-row p-2 d-flex justify-content-between align-items-center">
                <div class="form-group col-md-3">
                    <label className='control-label' htmlFor="select4">Select Device Plans</label>
                    <select id="select4" className="form-select">
                    </select>
                    <div class="row d-flex justify-content-between">
                        <div class="col-md-6">
                            <p>Sync Up Drive</p>
                        </div>
                        <div class="col-md-6 text-right">
                            <FontAwesomeIcon className='mr-2' icon={faEdit} />
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </div>
                    </div>


                </div>
                <div class="form-group col-md-1">
                    <label className='control-label' htmlFor="select5">Quantity</label>
                    <select id="select5" className="form-select">
                    </select>
                    <p>1</p>
                </div>
                <div class="form-group col-md-1">
                    <label className='control-label' htmlFor="select6">Cost/Month</label>
                    <select id="select6" className="form-select">
                    </select>
                    <p>$20.00</p>
                </div>
                <div class="form-group col-md-1">
                    <label className='control-label' htmlFor="select7">Discounts</label>
                    <select id="select7" className="form-select">
                    </select>
                    <p>$20.00</p>
                </div>
                <div class="form-group col-md-2">
                    <label className='control-label' htmlFor="select8">Final Cost/Month</label>
                    <select id="select8" className="form-select">
                    </select>
                    <p>$20.00</p>
                </div>
                <div class="form-group col-md-1">
                    <label className='control-label' htmlFor="select8"> </label><br></br>
                    <button className="form-select my-submit h-100 offset-md-4">Submit</button>
                    <p className='text-light'> .</p>
                </div>
                <div class="form-group col-md-1">
                    <label className='control-label' htmlFor="select8"></label><br></br>
                    <button className="btn add-btn h-100">Add <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.78564 13.9712C3.40814 13.9712 0.660645 11.2237 0.660645 7.84619C0.660645 4.46869 3.40814 1.72119 6.78564 1.72119C10.1631 1.72119 12.9106 4.46869 12.9106 7.84619C12.9106 11.2237 10.1631 13.9712 6.78564 13.9712ZM6.78564 2.59619C3.88939 2.59619 1.53564 4.94994 1.53564 7.84619C1.53564 10.7424 3.88939 13.0962 6.78564 13.0962C9.68189 13.0962 12.0356 10.7424 12.0356 7.84619C12.0356 4.94994 9.68189 2.59619 6.78564 2.59619Z" fill="#5F5F5F" />
                        <path d="M6.78564 10.9087C6.54064 10.9087 6.34814 10.7162 6.34814 10.4712V5.22119C6.34814 4.97619 6.54064 4.78369 6.78564 4.78369C7.03064 4.78369 7.22314 4.97619 7.22314 5.22119V10.4712C7.22314 10.7162 7.03064 10.9087 6.78564 10.9087Z" fill="#5F5F5F" />
                        <path d="M9.41064 8.28369H4.16064C3.91564 8.28369 3.72314 8.09119 3.72314 7.84619C3.72314 7.60119 3.91564 7.40869 4.16064 7.40869H9.41064C9.65564 7.40869 9.84814 7.60119 9.84814 7.84619C9.84814 8.09119 9.65564 8.28369 9.41064 8.28369Z" fill="#5F5F5F" />
                    </svg>
                    </button>
                    <p className='text-light'> .</p>
                </div>
            </div>
            <div className="row" style={{ marginTop: '-30px' }}>
                <div className="col-md-2 offset-md-10">
                    <div className="form-group">
                        <label htmlFor="inputField">Total Carrier Plan Cost</label>
                        <input type="text" className="form-control" id="inputField" />
                    </div>
                </div>
            </div>
        </>
    )
}