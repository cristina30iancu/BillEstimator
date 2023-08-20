import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import CurrencyInput from 'react-currency-input-field';

export const PlanComparison = ({ setPlanComparisons, costs }) => {
  const [total, setTotal] = useState();
  const [rows, setRows] = useState([{}]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const planComparisonData = [
    'Monthly Plan Lines',
    'Monthly Carrier Plans',
    'Monthly Device',
    'Total Mobile Protection/Features',
    'Accessories',
    'Monthly Credits',
    'Trade-in Credits',
  ];

  useEffect(() => {
    const planRows = []; let i = 0;
    for (let comparison of planComparisonData) {
      let obj = { comparison, newPlan: parseFloat(costs[i]) };
      planRows.push(obj);
      i++;
    }
    setRows(planRows);
    console.log(planRows )
  }, costs);

  const handleDeleteRow = index => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleInputChange = (e, index) => {
    let cost = rows[index].cost ?? 0;
    let finalCost = rows[index].finalCost ?? 0;
    let discounts = rows[index].discounts ?? 0;
    const { name, value } = e.target;
    if (name === 'quantity') {
      if (cost) {
        finalCost = cost * value - discounts;
      }
    }
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      [name]: value,
      ['finalCost']: parseFloat(finalCost).toFixed(2),
    };
    setRows(updatedRows);
  };

  const handleCurrencyInputChange = (val, name, index) => {
    let oldPlan = rows[index].oldPlan ?? 0;
    let newPlan = rows[index].newPlan ?? 0;
    let comparison = rows[index].comparison ?? planComparisonData[0];
    let diff = 0;

    if (name === 'oldPlan') {
      diff = val - newPlan;
    } else if (name === 'newPlan') {
      diff = oldPlan - val;
    }
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      [name]: val,
      ['differences']: diff,
      ['comparison']: comparison,
    };
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, {}]);
  };

  const handleEditRow = index => {
    setEditingIndex(index);
  };

  const handleSubmit = () => {
    for (let row of rows) {
      if (row.comparison && row.oldPlan && row.newPlan) {
        row.submitted = true;
      }
    }
    setEditingIndex(-1);
    setRows([...rows]);
    const sumFinalCost = rows.reduce(
      (total, row) => parseFloat(total) + (parseFloat(row.differences) || 0),
      0
    );
    setTotal(parseFloat(sumFinalCost).toFixed(2));
    setPlanComparisons(rows);
  };

  const renderRow = (row, index) => {
    return (
      <div key={index} className="row mx-1  exclude-from-print">
        <div className="col-md-6 border-end border-dark">
          <div className="row mb-3">
            <div className="col-md-6 border-end">
              <p>{row[`comparison`] || ''} </p>
            </div>
            <div className="col-md-3 border-end">
              <CurrencyInput
                placeholder="$0.00"
                className="form-control"
                name="oldPlan"
                value={row['oldPlan'] || ''}
                onValueChange={(value, name) =>
                  handleCurrencyInputChange(value, name, index)
                }
                decimalsLimit={2}
                prefix="$"
                decimalSeparator="."
                groupSeparator=","
              />
            </div>
            <div className="col-md-3 border-end">
              {row['comparison'] !== 'Total Mobile Protection/Features' &&
              row['comparison'] !== 'Accessories' ? (
                <p className='ml-1'>${row['newPlan'] || '0.00'}</p>
              ) : (
                <CurrencyInput
                  placeholder="$0.00"
                  className="form-control mr-2"
                  name="newPlan"
                  value={row['newPlan'] || ''}
                  decimalsLimit={2}
                  prefix="$"
                  disabled={
                    row['comparison'] !== 'Total Mobile Protection/Features' &&
                    row['comparison'] !== 'Accessories'
                  }
                  decimalSeparator="."
                  groupSeparator=","
                  onValueChange={(value, name) =>
                    handleCurrencyInputChange(value, name, index)
                  }
                />
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="row mb-3">
            <div className="col-md-2">
            <p className='ml-1'>${row['differences'] || '0.00'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSubmitted = (row, index) => {
    return (
      <div key={index} className="row mx-1">
        <div className="col-md-6 border-end border-dark">
          <div className="row">
            <div className="col-md-6 border-end">
              <span>{row[`comparison`]}</span>
              <FontAwesomeIcon
                className="ml-5"
                onClick={() => handleEditRow(index)}
                icon={faEdit}
              />
              <FontAwesomeIcon
                className="ml-2"
                icon={faTrashAlt}
                onClick={() => handleDeleteRow(index)}
              />
            </div>
            <div className="col-md-3 border-end">
              <p>${row[`oldPlan`]}</p>
            </div>
            <div className="col-md-3">
              <p>${row[`newPlan`]}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-2">
              <p>${row[`differences`]}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }; 

  return (
    <>
      <div className="row mt-5" style={{ backgroundColor: '#E5E5E5' }}>
        <p className="m-1 font-weight-bold">PLANS COMPARISON</p>
      </div>
      <div className="row mx-1">
        <div className="col-md-6 border-end border-dark">
          <div className="row mt-3">
            <div className="col-md-6">
              <label className="control-label">Select Comparison</label>
            </div>
            <div className="col-md-3">
              <label className="control-label">Old Plan</label>
            </div>
            <div className="col-md-3">
              <label className="control-label">New Plan</label>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="row">
            <div className="col-md-2">
              <p className="mt-3">Differences</p>
            </div>
            <div className="col-md-2 offset-md-6 exclude-from-print mt-3">
              <div className="form-group">
                <button
                  className="form-select my-submit h-100"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="col-md-2 exclude-from-print mt-3">
              <div className="form-group">
                <button
                  className="btn add-btn h-100 w-100"
                  onClick={handleAddRow}
                >
                  Add{' '}
                  <svg
                    width="13"
                    height="15"
                    viewBox="0 0 13 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.78564 13.9712C3.40814 13.9712 0.660645 11.2237 0.660645 7.84619C0.660645 4.46869 3.40814 1.72119 6.78564 1.72119C10.1631 1.72119 12.9106 4.46869 12.9106 7.84619C12.9106 11.2237 10.1631 13.9712 6.78564 13.9712ZM6.78564 2.59619C3.88939 2.59619 1.53564 4.94994 1.53564 7.84619C1.53564 10.7424 3.88939 13.0962 6.78564 13.0962C9.68189 13.0962 12.0356 10.7424 12.0356 7.84619C12.0356 4.94994 9.68189 2.59619 6.78564 2.59619Z"
                      fill="#5F5F5F"
                    />
                    <path
                      d="M6.78564 10.9087C6.54064 10.9087 6.34814 10.7162 6.34814 10.4712V5.22119C6.34814 4.97619 6.54064 4.78369 6.78564 4.78369C7.03064 4.78369 7.22314 4.97619 7.22314 5.22119V10.4712C7.22314 10.7162 7.03064 10.9087 6.78564 10.9087Z"
                      fill="#5F5F5F"
                    />
                    <path
                      d="M9.41064 8.28369H4.16064C3.91564 8.28369 3.72314 8.09119 3.72314 7.84619C3.72314 7.60119 3.91564 7.40869 4.16064 7.40869H9.41064C9.65564 7.40869 9.84814 7.60119 9.84814 7.84619C9.84814 8.09119 9.65564 8.28369 9.41064 8.28369Z"
                      fill="#5F5F5F"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {rows.map((row, index) =>
        editingIndex === index || !row.submitted
          ? renderRow(row, index)
          : renderSubmitted(row, index)
      )}
      <div className="row">
        <div className="col-md-3 offset-md-9">
          <div className="form-group">
            <label htmlFor="inputField">Total Plan Differences</label>
            <CurrencyInput
              placeholder="$0.00"
              className="form-control"
              disabled
              value={total}
              decimalsLimit={2}
              prefix="$"
              decimalSeparator="."
              groupSeparator=","
            />
          </div>
        </div>
      </div>
    </>
  );
};
