import { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CarrierForm } from "./CarrierForm";
import { ApprovedDevicesForm } from "./ApprovedDevicesForm";
import { useReactToPrint } from "react-to-print";
import CurrencyInput from 'react-currency-input-field';
import { TradeInForm } from "./TradeInForm";

export const Eestimator = () => {
    const [plans, setPlans] = useState([]);
    const [lines, setLines] = useState([])
    const [planObj, setPlanObj] = useState(undefined)
    const [plan, setPlan] = useState(undefined)
    const [loyalty, setLoyalty] = useState()
    const [line, setLine] = useState()
    const [planCost, setPlanCost] = useState(0)
    const [empDiscount, setEmpDiscount] = useState(0)
    const [autoPay, setAutoPay] = useState(0)
    const [totalDiscount, setTotalDiscount] = useState(autoPay)
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    const fetchPlans = async () => {
        const res = await fetch("http://localhost:3030/api/plans");
        const data = await res.json();
        setPlans(data);
        setPlan(data[0]?._id)
        setPlanObj(data[0])
        setLine(data[0].linePrices[0]?.line)
    }

    const computeCost = () => {
        if (plan && line) {
            const selectedPlan = plans.find((p, idx) => p._id == plan)
            const selectedLine = selectedPlan?.linePrices.find((l, i) => l.line == line)

            if (selectedPlan.name == "$20 Talk & Text") {
                setPlanCost(line * 20)
                return
            }

            let previousLineMRC = 0
            if (line > 1) {
                previousLineMRC = selectedPlan?.linePrices.find((l, i) => l.line == (line - 1)).combinedMRCExisting
            }

            let combinedMRCNew = selectedLine?.combinedMRCExisting
            let combinedMRCNewWithAutoPay = selectedLine?.combinedMRCExisting - 5

            if (line > 1 && selectedLine.freeLinePromotion == "N") {
                let MRC = selectedLine?.combinedMRCExisting - previousLineMRC
                combinedMRCNew = previousLineMRC + MRC
                const calculatedValue = calculateHi(selectedLine?.combinedMRCExisting - 5, line, MRC) - (5 * (line - 1));
                console.log("c: ", calculatedValue)
                combinedMRCNewWithAutoPay = calculatedValue
                console.log("MRC ", MRC, " combinedMRCNew ", combinedMRCNew, " H ", calculatedValue, " combinedMRCNewWithAutoPay: ", combinedMRCNewWithAutoPay)
            } else if (line > 1 && selectedLine.freeLinePromotion == "Y") {
                let MRC = selectedLine?.combinedMRCExisting - previousLineMRC
                combinedMRCNew = previousLineMRC
                combinedMRCNewWithAutoPay = calculateHi(selectedLine?.combinedMRCExisting - 5, line, MRC) - (5 * (line - 1));
                console.log("MRC ", MRC, " combinedMRCNew ", combinedMRCNew, " H ", combinedMRCNewWithAutoPay, " combinedMRCNewWithAutoPay: ", combinedMRCNewWithAutoPay)
            }

            let autoPay = combinedMRCNew - combinedMRCNewWithAutoPay
            console.log("autopay ", autoPay)
            if (loyalty === "Insider") {
                let cost = (combinedMRCNew - autoPay) * 0.8 + autoPay
                setPlanCost(cost)
            } else if (loyalty === "Existing") {
                setPlanCost(selectedLine?.combinedMRCExisting)
            } else {
                setPlanCost(combinedMRCNew)
            }
            setAutoPay(autoPay)
            setTotalDiscount(autoPay)
        }
    }

    function calculateHi(startingValue, i, Di) {
        if (i === 1) {
            return startingValue;
        } else {
            const previousHi = calculateHi(startingValue, i - 1, Di);
            return previousHi;
        }
    }

    useEffect(() => {
        fetchPlans()
    }, []);

    useEffect(() => {
        computeCost()
    }, [plan, line, loyalty]);

    return (<>
        <div className="container-fluid p-5" ref={componentRef} style={{ margin: 0 }}>
            <div class="form-inline">
                <div class="form-group mb-2">
                    <label className="quote mt-3 mr-3">CUSTOMER QUOTE</label>
                </div>
                <div class="form-group mb-2">
                    <label className="control-label mr-3" htmlFor="input1">Customer Name</label>
                    <input type="text" id="input1" />
                </div>
                <div class="form-group mx-sm-3 mb-2">
                    <label className="control-label mr-3">Customer Loyalty</label>
                    <select className="loyalty" onChange={e => setLoyalty(e.target.value)} >
                        <option value="New">New</option>
                        <option value="Existing">Existing</option>
                        <option value="Insider">New [Insider]</option>
                    </select>
                </div>
                <div class="form-group mx-sm-3 mb-2">
                    <label className="control-label" htmlFor="input3">
                        Years with T-Mobile
                        <span style={{ fontSize: "0.7rem", marginRight: "15px" }}> [Add on Upgrades only]</span>
                    </label>
                    <input type="number" id="input3" style={{ width: "50px" }} />
                </div>
            </div>
            <div className="second form-row p-1 d-flex justify-content-between mt-4">
                <div className="form-group col-lg-2  mt-2">
                    <label className="control-label" htmlFor="select1">Plan</label>
                    <select id="select1" className="form-select">
                        <option>Magenta</option>
                    </select>
                </div>

                <div className="form-group  col-lg-2 mt-2">
                    <label className="control-label " htmlFor="select2">Base Plan # of Lines</label>
                    <select value={line} onChange={e => setLine(e.target.value)} id="select2" className="form-select">
                        {plan && planObj.linePrices.map((l, i) => (
                            <option key={l.line} value={l.line}>{l.line}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group col-lg-3 mt-2">
                    <label className="control-label " htmlFor="select3">Plan Type</label>
                    <select value={plan} onChange={e => { setPlan(e.target.value); setPlanObj(plans.find((p, idx) => p._id == e.target.value)) }} id="select3" className="form-select">
                        {plans.map((plan, i) => (
                            <option key={plan._id} value={plan._id}>{plan.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group col-lg-2 mt-2 ">
                    <label className="control-label " htmlFor="input4">Plan Monthly Cost</label>
                    <input value={planCost} disabled className="form-control w-25" id="input4" />
                </div>
                <div className="form-group col-lg-2 mt-2 d-flex justify-content-center align-items-end exclude-from-print">
                    <button className="refresh exclude-from-print">
                        <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 6.11565C12.3166 4.79582 11.7043 3.5729 10.7575 2.63528C9.81066 1.69765 8.58182 1.09734 7.26025 0.926819C5.93869 0.756295 4.59772 1.02502 3.4439 1.69159C2.29009 2.35816 1.38744 3.38561 0.875 4.61565M0.5 1.61566V4.61565H3.5M0.5 7.61565C0.683419 8.93549 1.2957 10.1584 2.24252 11.096C3.18934 12.0337 4.41818 12.634 5.73975 12.8045C7.06131 12.975 8.40228 12.7063 9.5561 12.0397C10.7099 11.3731 11.6126 10.3457 12.125 9.11565M12.5 12.1157V9.11565H9.5" stroke="#5F5F5F" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        REFRESH
                    </button>
                </div>
                <div className="form-group col-lg-1 mt-2 d-flex justify-content-center align-items-end">
                    <button onClick={handlePrint} className="print exclude-from-print">PRINT PREVIEW</button>
                </div>

            </div>
            <div className="row h-100 mt-3">
                <div className="col-6 ">
                    <div className="col-12 h-100 py-2 plan-cost">
                        <table className="table">
                            <tbody>
                                <tr><td>Plan Monthly Cost</td><td>$120.00</td></tr>
                                <tr><td>Estimated Cost of First Bill:</td><td className="final-price">$85.00</td></tr>
                                <tr colspan="2" className="plan-info"><td>Please note that all discounts and promos take 1-2 bill cycles before
                                    they will reflect on your bill</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row plan-cost">
                        <div className="col-4 total-col d-flex justify-content-center align-items-center">
                            <div className="text-center">
                                <p>Total Discount</p>
                                <p className="discount">$25.00</p>
                            </div>
                        </div>
                        <div className="col-8">
                            <table className="table discount-col">
                                <tbody>
                                    <tr><td>Plan Monthly Cost</td><td className="discounts">$120.00</td></tr>
                                    <tr><td>Estimated Cost of First Bill:</td><td className="discounts">$85.00</td></tr>
                                    <tr><td>Plan Monthly Cost</td><td className="discounts">$120.00</td></tr>
                                    <tr><td>Estimated Cost of First Bill:</td><td className="discounts">$85.00</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row h-100 mt-3">
                <div className="col-6">
                    <div className="row proration-cost">
                        <div className="col-12 h-100 py-2 proration-cost">
                            <div className="col-12 mx-auto proration">
                                <table className="table">
                                    <tbody className="w-50 mx-auto">
                                        <tr> <td className="proration" >Proration</td>
                                            <td className="text-right proration">$10.00</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="col-10 mx-auto">
                                <table className="table">
                                    <tbody className="w-50 mx-auto">
                                        <tr><td>Days remaining in bill cycle</td><td>12 days</td></tr>
                                        <tr><td>Next Bill</td><td className="font-weight-bold">$85.00</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6 py-2 pl-0">
                    <div className="row proration-cost">
                        <div className="col-4 ">
                            <table className="table">
                                <tbody>
                                    <tr> <td className="proration">Upfront Cost</td></tr>
                                    <tr>  <td>Total Upfront Cost</td></tr>
                                    <tr>  <td className="font-weight-bold">$25.00</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-8 px-3">
                            <table className="table ml-1">
                                <tbody>
                                    <tr><td>Plan Monthly Cost</td><td className="discounts">$120.00</td></tr>
                                    <tr><td>Estimated Cost of First Bill:</td><td className="discounts">$85.00</td></tr>
                                    <tr><td>Plan Monthly Cost</td><td className="discounts">$120.00</td></tr>
                                    <tr><td>Estimated Cost of First Bill:</td><td className="discounts">$85.00</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <CarrierForm />
            <ApprovedDevicesForm />
            <div className="row mx-1" style={{ borderTop: "1px solid black" }}>
               <TradeInForm/>

                <div className="col-md-6">
                    <p className="mt-3">Promotional Discounts</p>
                    <br />
                    <div className="row px-5">
                        <div className="col-md-7">
                            <div className="form-group">
                                <label className="control-label mb-3" htmlFor="select4">
                                    Discounts
                                </label>
                                <p>Auto Pay Discount ($5/line)</p>
                                <p className="mt-2">Employee Discount</p>
                                <p className="mt-2 font-weight-bold">Total Promotional Discounts</p>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="form-group promotional-discounts">
                                <label className="control-label mb-2" htmlFor="cost">Discount</label>
                                <CurrencyInput
                                    placeholder="$0.00" className="form-control mb-1" value={autoPay}
                                    decimalsLimit={2} prefix="$" readOnly decimalSeparator="." groupSeparator=","
                                />
                                <CurrencyInput
                                    placeholder="$0.00" className="form-control mb-1"
                                    defaultValue={0} decimalsLimit={2}
                                    prefix="$" decimalSeparator="." groupSeparator=","
                                    onValueChange={value => {
                                        if (!value) setTotalDiscount(autoPay)
                                        else setTotalDiscount(parseFloat(autoPay) + parseFloat(value))
                                    }}
                                />
                                <input readOnly value={`$${totalDiscount.toFixed(2)}`} type="text" className="form-control" id="inputField" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5" style={{ backgroundColor: "#E5E5E5" }}>
                <p className="m-1 font-weight-bold">PLANS COMPARISON</p>
            </div>
            <div className="row mx-1">
                <div className="col-md-6 border-end border-dark">
                    <div className="row">
                        <div className="col-md-6 border-end">
                            <select id="select4" className="form-select mt-3">
                                {/* Options for the select */}
                            </select>
                        </div>
                        <div className="col-md-3 border-end">
                            <p className="text-center mt-3">Old Plan</p>
                            <input type="number" className="form-control" placeholder="$"></input>
                        </div>
                        <div className="col-md-3 border-end">
                            <p className="text-center mt-3">New Plan</p>
                            <input type="number" className="form-control" placeholder="$"></input>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 exclude-from-print">
                    <div className="row mt-2">
                        <div className="col-md-2">
                            Differences
                        </div>
                        <div className="col-md-2 offset-md-6">
                            <div className="form-group">
                                <button className="form-select my-submit h-100">Submit</button>
                            </div>
                        </div>
                        <div className="col-md-2 ">
                            <div className="form-group">
                                <button className="btn add-btn h-100 w-100">
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
                    <div className="row">
                        <div className="col-md-4 offset-md-8">
                            <div className="form-group">
                                <label htmlFor="inputField">Total Plan Differences</label>
                                <input type="text" className="form-control" id="inputField" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row h-100 mt-5">
                <p className="quote">DESCRIPTION OF PLANS & BENEFITS</p>
                <div className="col-8 ">
                    <div className="col-12 h-100 py-2 benefits">
                        <ul>
                            {planObj?.benefits.map((b, idx) => (
                                <li>
                                    <strong>{b.name}:</strong> {b.benefitDetails.map((bd, i) => bd.description)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-4">
                    <div className="col-12 h-100 py-2 details">
                        Store Phone Number
                        <p style={{ fontSize: "14px", color: "gray" }}>Call this number first if need help with your account</p>
                        <input className="w-100 mb-2"></input>
                        Manager Name
                        <input className="w-100 mb-2"></input>
                        <p style={{ color: "#E20074", fontWeight: "bold" }}>Notes</p>
                        <input className="w-100 mb-2"></input>
                    </div>
                </div>
            </div>
        </div >
    </>
    )
}