import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

export const TradeInForm = () => {
    const [rows, setRows] = useState([{}]);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [total, setTotal] = useState()

    const handleDeleteRow = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

    const handleInputChange = (e, index) => {
        let tradeIn = rows[index].tradeIn ?? 0
        let costMonth = rows[index].costMonth ?? 0
        const { name, value } = e.target;
        if (name === 'quantity') {
            if (tradeIn) {
                costMonth = tradeIn / 24 * value
            }
        }
        const updatedRows = [...rows];
        updatedRows[index] = {
            ...updatedRows[index],
            [name]: value,
            ['costMonth']: costMonth
        };
        setRows(updatedRows);
    };

    const handleCurrencyInputChange = (value, name, index) => {
        let costMonth = rows[index].costMonth ?? 0
        let quantity = rows[index].quantity ?? 1
        value = value ?? 0
        if (name === 'tradeIn') {
            costMonth = (value / 24) * quantity
        }
        const updatedRows = [...rows];
        updatedRows[index] = {
            ...updatedRows[index],
            [name]: value,
            ['costMonth']: parseFloat(costMonth).toFixed(2),
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
            if (row.select && row.quantity && row.tradeIn && row.costMonth)
                row.submitted = true
        }
        setEditingIndex(-1);
        setRows([...rows]);
        const sumFinalCost = rows.reduce((total, row) => parseFloat(total) + (parseFloat(row.costMonth) || 0), 0);
        setTotal(parseFloat(sumFinalCost).toFixed(2))
    };

    const renderRow = (row, index) => {
        return (
            <div key={index} className="exclude-from-print form-row d-flex justify-content-between align-items-center exclude-from-print">
                <div className="col-md-5 exclude-from-print">
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
                <div className="col-md-3 exclude-from-print">
                    <CurrencyInput
                        id={`tradeIn`}
                        className="form-control"
                        name={`tradeIn`}
                        value={row[`tradeIn`] || ''}
                        required
                        onValueChange={(value, name) => handleCurrencyInputChange(value, name, index)} placeholder="$0.00"
                        decimalsLimit={2} prefix="$" decimalSeparator="." groupSeparator=","
                    />
                </div>
                <div className="col-md-2 exclude-from-print">
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
                <div className="col-md-2 exclude-from-print">
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
            </div>
        )
    }

    const renderSubmitted = (row, index) => {
        return (
            <div key={index} className=" form-row  d-flex justify-content-between align-items-center">
                <div className="form-group col-md-5">
                    <span>{row[`select`]}</span>
                    <FontAwesomeIcon className='ml-4 exclude-from-print' onClick={() => handleEditRow(index)} icon={faEdit} />
                    <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteRow(index)} className="exclude-from-print ml-1" />
                </div>
                <div className="form-group col-md-3">
                    <p>${row[`tradeIn`]}</p>
                </div>
                <div className="form-group col-md-2">
                    <p>{row[`quantity`]}</p>
                </div>
                <div className="form-group col-md-2 text-center"> {/* Add 'text-center' class */}
        <p>${row[`costMonth`]}</p>
    </div>
            </div>
        )
    }

    return (
        <div className="col-md-6 border-end border-dark">
            <p className="mt-3 font-weight-bold">Trade-In Devices</p>
            <br />

            <div className="row">
                <div className="form-row d-flex justify-content-between align-items-center">
                    <div className="col-md-5">
                        <div className="form-group">
                            <label className="control-label" htmlFor="select4">
                                Select Devices
                            </label>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="tradeIn">Trade-In Value</label>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="quantity">Quantity</label>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="quantity">Credit/Month</label>
                        </div>
                    </div>
                    <div className="col-md-2 exclude-from-print">
                        <div className="form-group">
                        </div>
                    </div>
                </div>
                {rows.map((row, index) => (
                    (editingIndex === index || !row.submitted) ? renderRow(row, index) : renderSubmitted(row, index)
                ))}
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="form-label mr-2" htmlFor="inputField">
                            Total Devices Cost
                        </label>
                        <CurrencyInput placeholder="$0.00" value={total} className='form-control'
                            decimalsLimit={2} prefix="$" disabled decimalSeparator="." groupSeparator=","
                        />  </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group exclude-from-print">
                        <br></br>
                        <button className="form-select my-submit w-100" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group exclude-from-print">
                        <br></br>
                        <button className="btn add-btn w-auto" onClick={handleAddRow}>
                            Add{" "}
                            <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.78564 13.9712C3.40814 13.9712 0.660645 11.2237 0.660645 7.84619C0.660645 4.46869 3.40814 1.72119 6.78564 1.72119C10.1631 1.72119 12.9106 4.46869 12.9106 7.84619C12.9106 11.2237 10.1631 13.9712 6.78564 13.9712ZM6.78564 2.59619C3.88939 2.59619 1.53564 4.94994 1.53564 7.84619C1.53564 10.7424 3.88939 13.0962 6.78564 13.0962C9.68189 13.0962 12.0356 10.7424 12.0356 7.84619C12.0356 4.94994 9.68189 2.59619 6.78564 2.59619Z" fill="#5F5F5F" />
                                <path d="M6.78564 10.9087C6.54064 10.9087 6.34814 10.7162 6.34814 10.4712V5.22119C6.34814 4.97619 6.54064 4.78369 6.78564 4.78369C7.03064 4.78369 7.22314 4.97619 7.22314 5.22119V10.4712C7.22314 10.7162 7.03064 10.9087 6.78564 10.9087Z" fill="#5F5F5F" />
                                <path d="M9.41064 8.28369H4.16064C3.91564 8.28369 3.72314 8.09119 3.72314 7.84619C3.72314 7.60119 3.91564 7.40869 4.16064 7.40869H9.41064C9.65564 7.40869 9.84814 7.60119 9.84814 7.84619C9.84814 8.09119 9.65564 8.28369 9.41064 8.28369Z" fill="#5F5F5F" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}