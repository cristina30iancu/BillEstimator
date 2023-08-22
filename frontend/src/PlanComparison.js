import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import CurrencyInput from "react-currency-input-field";

export const PlanComparison = ({ setPlanComparisons, costs }) => {
  const [total, setTotal] = useState();
  const [rows, setRows] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const planComparisonData = [
    "Monthly Plan Lines",
    "Monthly Carrier Plans",
    "Monthly Device",
    "Total Mobile Protection/Features",
    "Accessories",
    "Monthly Credits",
    "Trade-in Credits",
  ];

  useEffect(() => {
    const planRows = [];
    let i = 0;
    for (let comparison of planComparisonData) {
      let obj = { comparison, newPlan: parseFloat(costs[i]), submitted: false, oldPlan: 0, differences: -parseFloat(costs[i]).toFixed(2) };
      planRows.push(obj);
      i++;
    }
    setRows(planRows);
    const sumFinalCost = planRows.reduce(
      (total, row) => parseFloat(total) + (parseFloat(row.differences) || 0),
      0
    );
    setTotal(parseFloat(sumFinalCost).toFixed(2));
    setPlanComparisons(planRows)
  }, []);

  useEffect(() => {
    console.log('again')
    if (rows.length > 0) {
      const updatedRows = rows.map((row, i) => ({
        ...row,
        newPlan: (i == 3 || i == 4) ? row.newPlan : parseFloat(costs[i]),
        oldPlan: row.oldPlan,
        differences: ((row.oldPlan ?? 0) - parseFloat(costs[i]).toFixed(2))
      }));
      console.log(updatedRows)
      setRows(updatedRows);
      setPlanComparisons(updatedRows)
      const sumFinalCost = updatedRows.reduce((total, row) => parseFloat(total) + (parseFloat(row.differences) || 0), 0);
      setTotal(parseFloat(sumFinalCost).toFixed(2));
    }
  }, [costs]);

  const handleCurrencyInputChange = (val, name, index) => {
    let oldPlan = rows[index].oldPlan ?? 0;
    let newPlan = rows[index].newPlan ?? 0;
    let comparison = rows[index].comparison ?? planComparisonData[0];
    let diff = 0;
    if (name === "oldPlan") {
      diff = val - newPlan;
    } else if (name === "newPlan") {
      diff = oldPlan - val;
    }
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      [name]: parseFloat(val),
      ["differences"]: parseFloat(diff).toFixed(2),
      ["comparison"]: comparison,
    };
    setRows(updatedRows);
    setPlanComparisons(updatedRows)
  };

  const handleEditRow = index => {
    setEditingIndex(index);
  };

  const handleSubmit = () => {
    for (let row of rows) {
      if (row.oldPlan && row.newPlan) {
        row.submitted = true;
      }
    }
    setEditingIndex(-1);
    setRows([...rows]);
    const sumFinalCost = rows.reduce(
      (total, row) => parseFloat(total) + (parseFloat(row.differences) || 0), 0);
    setTotal(parseFloat(sumFinalCost).toFixed(2));
    setPlanComparisons(rows);
  };

  const renderRow = (row, index) => {
    return (
      <div key={index} className="row mx-1  exclude-from-print">
        <div className="col-md-6 border-end border-dark">
          <div className="row mb-3">
            <div className="col-md-6 border-end">
              <p>{row[`comparison`] || ""} </p>
            </div>
            <div className="col-md-3 border-end">
              <CurrencyInput
                placeholder="$0.00"
                className="form-control requiredInput"
                name="oldPlan"
                value={row["oldPlan"] || ""}
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
              {row["comparison"] !== "Total Mobile Protection/Features" &&
                row["comparison"] !== "Accessories" ? (
                <p className="ml-1">${row["newPlan"] || "0.00"}</p>
              ) : (
                <CurrencyInput
                  placeholder="$0.00"
                  className={"" + (row["comparison"] !== "Total Mobile Protection/Features" &&
                    row["comparison"] !== "Accessories") ? "form-control mr-2 requiredInput" : ""}
                  name="newPlan"
                  value={row["newPlan"] || ""}
                  decimalsLimit={2}
                  prefix="$"
                  disabled={
                    row["comparison"] !== "Total Mobile Protection/Features" &&
                    row["comparison"] !== "Accessories"
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
              <p className="ml-1">${row["differences"] || "0.00"}</p>
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
            <div className="col-md-6 border-end ">
              <span>{row[`comparison`]}</span>
              <FontAwesomeIcon
                className="ml-5 exclude-from-print"
                onClick={() => handleEditRow(index)}
                icon={faEdit}
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
      <div className="row mt-5" style={{ backgroundColor: "#E5E5E5" }}>
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
