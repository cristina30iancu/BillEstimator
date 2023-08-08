import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


export const CarrierForm = () => {
    const [rows, setRows] = useState([{}]);
    const [editingIndex, setEditingIndex] = useState(-1);

    const handleDeleteRow = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[index] = {
            ...updatedRows[index],
            [name]: value
        };
        setRows(updatedRows);
    };

    const handleAddRow = () => {
        setRows([...rows, {}]);
    };

    const handleEditRow = (index) => {
        setEditingIndex(index);
    };

    const handleSubmit = () => {
        const isFormValid = rows.every(row => (
            row.select && row.quantity && row.cost && row.discounts && row.finalCost
        ));
        if (!isFormValid) {
            alert('Please fill in all fields before submitting.');
            return;
        }
        for (let row of rows) {
            row.submitted = true
        }
        setEditingIndex(-1);
        setRows([...rows]);
    };

    const renderRow = (row, index) => {
        return (
            <div key={index} className="form-row px-2 d-flex justify-content-between align-items-center">
                <div className="form-group col-md-3">
                    <select
                        id={`select`}
                        className="form-select exclude-from-print"
                        name={`select`}
                        value={row[`select`] || ''}
                        required
                        onChange={(e) => handleInputChange(e, index)}
                    >
                        <option>Select</option>
                        <option>Select</option>
                    </select>
                </div>
                <div className="form-group col-md-1">
                    <select
                        id={`quantity`}
                        className="form-select exclude-from-print"
                        name={`quantity`}
                        value={row[`quantity`] || ''}
                        required
                        onChange={(e) => handleInputChange(e, index)}
                    >
                        <option>Select</option>
                        <option>Select</option>
                    </select>
                </div>
                <div className="form-group col-md-1">
                    <input
                        id={`cost`}
                        className="form-control exclude-from-print"
                        name={`cost`}
                        value={row[`cost`] || ''}
                        onChange={(e) => handleInputChange(e, index)}
                        type='number'
                        required
                    >
                    </input>
                </div>
                <div className="form-group col-md-1">
                    <input
                        id={`discounts`}
                        className="form-control exclude-from-print"
                        name={`discounts`}
                        value={row[`discounts`] || ''}
                        type='number'
                        required
                        onChange={(e) => handleInputChange(e, index)}
                    >
                        {/* Options for discounts select */}
                    </input>
                </div>
                <div className="form-group col-md-2">
                    <input
                        id={`finalCost`}
                        className="form-control exclude-from-print"
                        name={`finalCost`}
                        value={row[`finalCost`] || ''}
                        onChange={(e) => handleInputChange(e, index)}
                        type='number'
                        required
                    >
                        {/* Options for final cost select */}
                    </input>
                </div>
                {index == 0 ? <>
                    <div class="form-group col-md-1">
                        <button className="form-select my-submit h-100 offset-md-4 exclude-from-print" onClick={handleSubmit}>Submit</button>
                    </div>
                    <div class="form-group col-md-1 exclude-from-print">
                        <button className="btn add-btn h-100" onClick={handleAddRow}>Add <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.78564 13.9712C3.40814 13.9712 0.660645 11.2237 0.660645 7.84619C0.660645 4.46869 3.40814 1.72119 6.78564 1.72119C10.1631 1.72119 12.9106 4.46869 12.9106 7.84619C12.9106 11.2237 10.1631 13.9712 6.78564 13.9712ZM6.78564 2.59619C3.88939 2.59619 1.53564 4.94994 1.53564 7.84619C1.53564 10.7424 3.88939 13.0962 6.78564 13.0962C9.68189 13.0962 12.0356 10.7424 12.0356 7.84619C12.0356 4.94994 9.68189 2.59619 6.78564 2.59619Z" fill="#5F5F5F" />
                            <path d="M6.78564 10.9087C6.54064 10.9087 6.34814 10.7162 6.34814 10.4712V5.22119C6.34814 4.97619 6.54064 4.78369 6.78564 4.78369C7.03064 4.78369 7.22314 4.97619 7.22314 5.22119V10.4712C7.22314 10.7162 7.03064 10.9087 6.78564 10.9087Z" fill="#5F5F5F" />
                            <path d="M9.41064 8.28369H4.16064C3.91564 8.28369 3.72314 8.09119 3.72314 7.84619C3.72314 7.60119 3.91564 7.40869 4.16064 7.40869H9.41064C9.65564 7.40869 9.84814 7.60119 9.84814 7.84619C9.84814 8.09119 9.65564 8.28369 9.41064 8.28369Z" fill="#5F5F5F" />
                        </svg>
                        </button>
                    </div>
                </> : <>
                    <div class="form-group col-md-1">
                    </div>
                    <div class="form-group col-md-1">
                    </div>
                </>}
            </div>
        )
    }

    const renderSubmitted = (row, index) => {
        return (
            <div key={index} className="form-row px-3 d-flex justify-content-between align-items-center">
                <div className="form-group col-md-3">
                    <div className="row d-flex justify-content-between">
                        <div className="col-md-6">
                            <p>{row[`select`]}</p>
                        </div>
                        <div className="col-md-6 text-right exclude-from-print">
                            <FontAwesomeIcon className='mr-2' onClick={() => handleEditRow(index)} icon={faEdit} />
                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteRow(index)} />
                        </div>
                    </div>
                </div>
                <div className="form-group col-md-1">
                    <p>{row[`quantity`]}</p>
                </div>
                <div className="form-group col-md-1">
                    <p>{row[`cost`]}</p>
                </div>
                <div className="form-group col-md-1">
                    <p>{row[`discounts`]}</p>
                </div>
                <div className="form-group col-md-2">
                    <p>{row[`finalCost`]}</p>
                </div>
                {index == 0 ? <>
                    <div class="form-group col-md-1">
                        <button className="form-select my-submit h-100 offset-md-4 exclude-from-print" onClick={handleSubmit}>Submit</button>
                    </div>
                    <div class="form-group col-md-1">
                        <button className="btn add-btn h-100 exclude-from-print" onClick={handleAddRow}>Add <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.78564 13.9712C3.40814 13.9712 0.660645 11.2237 0.660645 7.84619C0.660645 4.46869 3.40814 1.72119 6.78564 1.72119C10.1631 1.72119 12.9106 4.46869 12.9106 7.84619C12.9106 11.2237 10.1631 13.9712 6.78564 13.9712ZM6.78564 2.59619C3.88939 2.59619 1.53564 4.94994 1.53564 7.84619C1.53564 10.7424 3.88939 13.0962 6.78564 13.0962C9.68189 13.0962 12.0356 10.7424 12.0356 7.84619C12.0356 4.94994 9.68189 2.59619 6.78564 2.59619Z" fill="#5F5F5F" />
                            <path d="M6.78564 10.9087C6.54064 10.9087 6.34814 10.7162 6.34814 10.4712V5.22119C6.34814 4.97619 6.54064 4.78369 6.78564 4.78369C7.03064 4.78369 7.22314 4.97619 7.22314 5.22119V10.4712C7.22314 10.7162 7.03064 10.9087 6.78564 10.9087Z" fill="#5F5F5F" />
                            <path d="M9.41064 8.28369H4.16064C3.91564 8.28369 3.72314 8.09119 3.72314 7.84619C3.72314 7.60119 3.91564 7.40869 4.16064 7.40869H9.41064C9.65564 7.40869 9.84814 7.60119 9.84814 7.84619C9.84814 8.09119 9.65564 8.28369 9.41064 8.28369Z" fill="#5F5F5F" />
                        </svg>
                        </button>
                    </div>
                </> : <>
                    <div class="form-group col-md-1">
                    </div>
                    <div class="form-group col-md-1">
                    </div>
                </>}
            </div>
        )
    }
    return (
        <>
            <div className='row mx-1' style={{ borderTop: '1px solid black' }}>
                <p className='mt-3 font-weight-bold'>Carrier Plans</p> <br></br>
            </div>
            <div className="form-row mx-1 p-1 d-flex justify-content-between align-items-center">
                <div className="form-group col-md-3">
                    <label className='control-label' htmlFor={`select`}>Select Device Plans</label>
                </div>
                <div className="form-group col-md-1">
                    <label className='control-label' htmlFor={`quantity`}>Quantity</label>
                </div>
                <div className="form-group col-md-1">
                    <label className='control-label' htmlFor={`cost`}>Cost/Month</label>
                </div>
                <div className="form-group col-md-1">
                    <label className='control-label' htmlFor={`discounts`}>Discounts</label>
                </div>
                <div className="form-group col-md-2">
                    <label className='control-label' htmlFor={`finalCost`}>Final Cost/Month</label>
                </div>
                <div class="form-group col-md-1">
                </div>
                <div class="form-group col-md-1">
                </div>
            </div>
            {rows.map((row, index) => (
                (editingIndex === index || !row.submitted) ? renderRow(row, index) : renderSubmitted(row, index)
            ))}
            <div className="row">
                <div className="col-md-2 offset-md-9">
                    <div className="form-group">
                        <label htmlFor="inputField">Total Carrier Plan Cost</label>
                        <input readOnly type="number" className="form-control" id="inputField" />
                    </div>
                </div>
            </div>
        </>
    )
}