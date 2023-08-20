import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import CurrencyInput from 'react-currency-input-field';

export const ApprovedDevicesForm = ({setTotalDiscount, setDownPayment, setTotalApprovedDevicesCost}) => {
    const [rows, setRows] = useState([{}]);
    const [total, setTotal] = useState()
    const [editingIndex, setEditingIndex] = useState(-1);

    const handleDeleteRow = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

    const handleInputChange = (e, index) => {
        let cost = rows[index].cost ?? 0
        let finalCost = rows[index].finalCost ?? 0
        let discounts = rows[index].discounts ?? 0
        const { name, value } = e.target;
        if (name === 'quantity') {
            if (cost) {
                finalCost = cost * value - discounts
            }
        }
        const updatedRows = [...rows];
        updatedRows[index] = {
            ...updatedRows[index],
            [name]: value
        };
        setRows(updatedRows);
    };

    const handleCurrencyInputChange = (value, name, index) => {
        let cost = rows[index].cost ?? 0
        let finalCost = rows[index].finalCost ?? 0
        let costMonth = rows[index].costMonth ?? 0
        let downPayment = rows[index].downPayment ?? 0
        let quantity = rows[index].quantity ?? 1
        value = value ?? 0
        if (name === 'cost') {
            costMonth = ((value * quantity - downPayment) / 24)
        }
        if (name === 'downPayment') {
            costMonth = (cost * quantity - value) / 24
        }
        if (name === 'discounts') {
            finalCost = costMonth - value
        }
        const updatedRows = [...rows];
        updatedRows[index] = {
            ...updatedRows[index],
            [name]: value,
            ['costMonth']: parseFloat(costMonth).toFixed(2),
            ['finalCost']: parseFloat(finalCost).toFixed(2),
            ['quantity']: quantity
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
        for (let row of rows) {
            if (row.select && row.quantity && row.cost && row.discounts && row.downPayment && row.costMonth)
                row.submitted = true
        }
        setEditingIndex(-1);
        setRows([...rows]);
        const sumFinalCost = rows.reduce((total, row) => parseFloat(total) + (parseFloat(row.finalCost) || 0), 0);
        setTotal(parseFloat(sumFinalCost).toFixed(2))
        const sumFinalDisc = rows.reduce((total, row) => parseFloat(total) + (parseFloat(row.discounts) || 0), 0);
        setTotalDiscount(parseFloat(sumFinalDisc).toFixed(2))
        const sumDownPayment = rows.reduce((total, row) => parseFloat(total) + (parseFloat(row.downPayment) || 0), 0);
        setDownPayment(parseFloat(sumDownPayment).toFixed(2))
        setTotalApprovedDevicesCost(parseFloat(sumFinalCost).toFixed(2))
    };

    const renderRow = (row, index) => {
        return (
            <div key={index} className="exclude-from-print form-row px-2 d-flex justify-content-between align-items-center exclude-from-print">
                <div className="form-group col-md-3 exclude-from-print">
                    <input
                        id={`select`}
                        className="form-control"
                        name={`select`}
                        value={row[`select`] || ''}
                        required
                        onChange={(e) => handleInputChange(e, index)}
                    >
                    </input>
                </div>
                <div className="form-group col-md-1 exclude-from-print">
                    <CurrencyInput
                        id={`cost`}
                        className="form-control"
                        name={`cost`}
                        value={row[`cost`] || ''}
                        required
                        onValueChange={(value, name) => handleCurrencyInputChange(value, name, index)} placeholder="$0.00"
                        decimalsLimit={2} prefix="$" decimalSeparator="." groupSeparator=","
                    />
                </div>
                <div className="form-group col-md-1 exclude-from-print">
                    <CurrencyInput
                        id={`downPayment`}
                        className="form-control"
                        name={`downPayment`}
                        value={row[`downPayment`] || ''}
                        required
                        onValueChange={(value, name) => handleCurrencyInputChange(value, name, index)} placeholder="$0.00"
                        decimalsLimit={2} prefix="$" decimalSeparator="." groupSeparator=","
                    />
                </div>
                <div className="form-group col-md-1 exclude-from-print">
                    <select id={`quantity`}
                        className="form-select"
                        name={`quantity`}
                        value={row[`quantity`] || '1'}
                        required
                        defaultValue={1}
                        onChange={(e) => handleInputChange(e, index)}>
                        {Array.from({ length: 10 }, (_, index) => (
                            <option key={index + 1} value={index + 1}>
                                {index + 1}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group col-md-1 exclude-from-print">
                    <CurrencyInput
                        id={`costMonth`}
                        className="form-control"
                        name={`costMonth`}
                        value={row[`costMonth`] || ''}
                        required
                        disabled placeholder="$0.00"
                        decimalsLimit={2} prefix="$" decimalSeparator="." groupSeparator=","
                    />
                </div>
                <div className="form-group col-md-1 exclude-from-print">
                    <CurrencyInput
                        id={`discounts`}
                        className="form-control"
                        name={`discounts`}
                        value={row[`discounts`] || ''}
                        required
                        onValueChange={(value, name) => handleCurrencyInputChange(value, name, index)} placeholder="$0.00"
                        decimalsLimit={2} prefix="$" decimalSeparator="." groupSeparator=","
                    />
                </div>
                <div className="form-group col-md-1 exclude-from-print">
                    <CurrencyInput
                        id={`finalCost`} className="form-control"
                        name={`finalCost`} value={row[`finalCost`] || ''} placeholder="$0.00"
                        decimalsLimit={2} prefix="$" disabled decimalSeparator="." groupSeparator=","
                    />
                </div>
                {index == 0 ? <>
                    <div class="form-group col-md-1">
                        <button className="form-select my-submit h-100 exclude-from-print" onClick={handleSubmit}>Submit</button>
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
                    <p>${row[`cost`]}</p>
                </div>
                <div className="form-group col-md-1">
                    <p>${row[`downPayment`]}</p>
                </div>
                <div className="form-group col-md-1">
                    <p>{row[`quantity`]}</p>
                </div>
                <div className="form-group col-md-1">
                    <p>${row[`costMonth`]}</p>
                </div>
                <div className="form-group col-md-1">
                    <p>${row[`discounts`]}</p>
                </div>
                <div className="form-group col-md-1">
                    <p>${row[`finalCost`]}</p>
                </div>
                {index == 0 ? <>
                    <div class="form-group col-md-1">
                        <button className="form-select my-submit h-100 exclude-from-print" onClick={handleSubmit}>Submit</button>
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
                <p className='mt-3 font-weight-bold'>Approved Devices</p> <br></br>
            </div>
            <div className="form-row mx-1 p-1 d-flex justify-content-between align-items-center">
                <div className="form-group col-md-3">
                    <label className='control-label' htmlFor={`select`}>Select Devices</label>
                </div>
                <div className="form-group col-md-1">
                    <label className='control-label' htmlFor={`cost`}>Cost</label>
                </div>
                <div className="form-group col-md-1">
                    <label className='control-label' htmlFor={`downPayment`}>Down Payment</label>
                </div>
                <div className="form-group col-md-1">
                    <label className='control-label' htmlFor={`quantity`}>Quantity</label>
                </div>
                <div className="form-group col-md-1">
                    <label className='control-label' htmlFor={`costMonth`}>Cost/Month</label>
                </div>
                <div className="form-group col-md-1">
                    <label className='control-label' htmlFor={`discounts`}>Discounts</label>
                </div>
                <div className="form-group col-md-1">
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
                        <label htmlFor="inputField">Total Devices Cost</label>
                        <CurrencyInput placeholder="$0.00" value={total} className='form-control'
                            decimalsLimit={2} prefix="$" disabled decimalSeparator="." groupSeparator=","
                        />
                    </div>
                </div>
            </div>
        </>
    )
}