import { useEffec, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { CarrierForm } from './CarrierForm';


export const Eestimator = () => {
    return (<>
        <div className='container-fluid' style={{ margin: 0 }}>
            <div class="form-inline">
                <div class="form-group mb-2">
                    <label className='quote mt-3 mr-3'>CUSTOMER QUOTE</label>
                </div>
                <div class="form-group mb-2">
                    <label className='control-label mr-2' htmlFor="input1">Customer Name</label>
                    <input type="text" id="input1" />
                </div>
                <div class="form-group mx-sm-3 mb-2">
                    <label className='control-label mr-2' htmlFor="input2">Customer Loyalty</label>
                    <input type="text" id="input2" />
                </div>
                <div class="form-group mx-sm-3 mb-2">
                    <label className='control-label' htmlFor="input3">
                        Years with T-Mobile
                        <span style={{ fontSize: '0.7rem' }}> [Add on Upgrades only]</span>
                    </label>
                    <input type="number" id="input3" />
                </div>
            </div>
            <div className='second form-row p-1 d-flex justify-content-between'>
                <div className='form-group col-lg-2  mt-2'>
                    <label className='control-label' htmlFor="select1">Plan</label>
                    <select id='select1' className='form-select'>
                        <option>Magenta</option>
                    </select>
                </div>

                <div className='form-group  col-lg-2 mt-2'>
                    <label className='control-label ' htmlFor="select2">Base Plan # of Lines</label>
                    <select id='select2' className='form-select'>
                        <option>1</option>
                    </select>
                </div>

                <div className='form-group col-lg-3 mt-2'>
                    <label className='control-label ' htmlFor="select3">Plan Type</label>
                    <select id='select3' className='form-select'>
                        <option>Choose a plan</option>
                    </select>
                </div>
                <div className='form-group col-lg-2 mt-2 '>
                    <label className='control-label ' htmlFor="input4">Plan Monthly Cost</label>
                    <input className='form-control w-25' type="number" id="input4" />
                </div>
                <div className='form-group col-lg-2 mt-2 d-flex justify-content-center align-items-end'>
                    <button className='refresh'>
                        <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 6.11565C12.3166 4.79582 11.7043 3.5729 10.7575 2.63528C9.81066 1.69765 8.58182 1.09734 7.26025 0.926819C5.93869 0.756295 4.59772 1.02502 3.4439 1.69159C2.29009 2.35816 1.38744 3.38561 0.875 4.61565M0.5 1.61566V4.61565H3.5M0.5 7.61565C0.683419 8.93549 1.2957 10.1584 2.24252 11.096C3.18934 12.0337 4.41818 12.634 5.73975 12.8045C7.06131 12.975 8.40228 12.7063 9.5561 12.0397C10.7099 11.3731 11.6126 10.3457 12.125 9.11565M12.5 12.1157V9.11565H9.5" stroke="#5F5F5F" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        REFRESH
                    </button>
                </div>
                <div className='form-group col-lg-1 mt-2 d-flex justify-content-center align-items-end'>
                    <button className='print'>PRINT PREVIEW</button>
                </div>

            </div>
            <div className="row h-100 ">
                <div className="col-6 ">
                    <div className='col-12 h-100 py-2 plan-cost'>
                        <table className='table'>
                            <tbody>
                                <tr><td>Plan Monthly Cost</td><td>$120.00</td></tr>
                                <tr><td>Estimated Cost of First Bill:</td><td className='final-price'>$85.00</td></tr>
                                <tr colspan="2" className='plan-info'><td>Please note that all discounts and promos take 1-2 bill cycles before
                                    they will reflect on your bill</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-6">
                    <div className='row plan-cost'>
                        <div className='col-4 total-col d-flex justify-content-center align-items-center'>
                            <div className='text-center'>
                                <p>Total Discount</p>
                                <p className='discount'>$25.00</p>
                            </div>
                        </div>
                        <div className='col-8'>
                            <table className='table discount-col'>
                                <tbody>
                                    <tr><td>Plan Monthly Cost</td><td className='discounts'>$120.00</td></tr>
                                    <tr><td>Estimated Cost of First Bill:</td><td className='discounts'>$85.00</td></tr>
                                    <tr><td>Plan Monthly Cost</td><td className='discounts'>$120.00</td></tr>
                                    <tr><td>Estimated Cost of First Bill:</td><td className='discounts'>$85.00</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row h-100 ">
                <div className="col-6">
                    <div className='row proration-cost'>
                        <div className='col-12 h-100 py-2 proration-cost'>
                            <div className='col-12 mx-auto proration'>
                                <table className='table'>
                                    <tbody className='w-50 mx-auto'>
                                        <tr> <td className='proration' >Proration</td>
                                            <td className='text-right proration'>$10.00</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className='col-10 mx-auto'>
                                <table className='table'>
                                    <tbody className='w-50 mx-auto'>
                                        <tr><td>Days remaining in bill cycle</td><td>12 days</td></tr>
                                        <tr><td>Next Bill</td><td className='font-weight-bold'>$85.00</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6 py-2 pl-0">
                    <div className='row proration-cost'>
                        <div className='col-4 '>
                            <table className='table'>
                                <tbody>
                                    <tr> <td className='proration'>Upfront Cost</td></tr>
                                    <tr>  <td>Total Upfront Cost</td></tr>
                                    <tr>  <td className='font-weight-bold'>$25.00</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='col-8 px-3'>
                            <table className='table ml-1'>
                                <tbody>
                                    <tr><td>Plan Monthly Cost</td><td className='discounts'>$120.00</td></tr>
                                    <tr><td>Estimated Cost of First Bill:</td><td className='discounts'>$85.00</td></tr>
                                    <tr><td>Plan Monthly Cost</td><td className='discounts'>$120.00</td></tr>
                                    <tr><td>Estimated Cost of First Bill:</td><td className='discounts'>$85.00</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <CarrierForm/>
            <div className='row mx-1' style={{ borderTop: '1px solid black' }}>
                <p className='mt-3 font-weight-bold'>Approved Devices</p> <br></br>
            </div>
            <div class="form-row mx-1 p-1 d-flex justify-content-between align-items-center">
                <div class="form-group col-md-3">

                    <label className='control-label' htmlFor="select4">Select Devices</label>
                    <select id="select4" className="form-select">
                    </select>
                    <div class="row d-flex justify-content-between">
                        <div class="col-md-6">
                            <p>iPhone 14</p>
                        </div>
                        <div class="col-md-6 text-right">
                            <FontAwesomeIcon className='mr-2' icon={faEdit} />
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-1">
                    <label className='control-label' htmlFor="select5">Cost</label>
                    <select id="select5" className="form-select">
                    </select>
                    <p>1</p>
                </div>
                <div class="form-group col-md-1">
                    <label className='control-label' htmlFor="select6">Down Payment</label>
                    <select id="select6" className="form-select">
                    </select>
                    <p>$20.00</p>
                </div>
                <div class="form-group col-md-1">
                    <label className='control-label' htmlFor="select6">Quantity</label>
                    <select id="select6" className="form-select">
                    </select>
                    <p>$20.00</p>
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
                    <button className="form-select my-submit h-100">Submit</button>
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
                        <label htmlFor="inputField">Total Devices Cost</label>
                        <input type="text" className="form-control" id="inputField" />
                    </div>
                </div>
            </div>

            <div className="row mx-1" style={{ borderTop: '1px solid black' }}>
                <div className="col-md-6 border-end border-dark">
                    <p className="mt-3 font-weight-bold">Trade-In Devices</p>
                    <br />
                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="control-label" htmlFor="select4">
                                    Select Devices
                                </label>
                                <select id="select4" className="form-select">
                                    {/* Options for the select */}
                                </select>
                                <div class="row d-flex justify-content-between">
                                    <div class="col-md-6">
                                        <p>iPhone X</p>
                                    </div>
                                    <div class="col-md-6 text-right">
                                        <FontAwesomeIcon className='mr-2' icon={faEdit} />
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="cost">Trade-In Value</label>
                                <input type="text" className="form-control" id="inputField" />
                                <p>1</p>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="downPayment">Quantity</label>
                                <select id="downPayment" className="form-select">
                                    {/* Options for the select */}
                                </select>
                                <p>$20.00</p>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="quantity">Credit/Month</label>
                                <input type="text" className="form-control" id="inputField" />
                                <p>$20.00</p>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label>&nbsp;</label>
                                <br />
                                <button className="form-select my-submit h-100">Submit</button>
                                <button className="btn add-btn h-100 mt-3 w-100">
                                    Add{' '}
                                    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.78564 13.9712C3.40814 13.9712 0.660645 11.2237 0.660645 7.84619C0.660645 4.46869 3.40814 1.72119 6.78564 1.72119C10.1631 1.72119 12.9106 4.46869 12.9106 7.84619C12.9106 11.2237 10.1631 13.9712 6.78564 13.9712ZM6.78564 2.59619C3.88939 2.59619 1.53564 4.94994 1.53564 7.84619C1.53564 10.7424 3.88939 13.0962 6.78564 13.0962C9.68189 13.0962 12.0356 10.7424 12.0356 7.84619C12.0356 4.94994 9.68189 2.59619 6.78564 2.59619Z" fill="#5F5F5F" />
                                        <path d="M6.78564 10.9087C6.54064 10.9087 6.34814 10.7162 6.34814 10.4712V5.22119C6.34814 4.97619 6.54064 4.78369 6.78564 4.78369C7.03064 4.78369 7.22314 4.97619 7.22314 5.22119V10.4712C7.22314 10.7162 7.03064 10.9087 6.78564 10.9087Z" fill="#5F5F5F" />
                                        <path d="M9.41064 8.28369H4.16064C3.91564 8.28369 3.72314 8.09119 3.72314 7.84619C3.72314 7.60119 3.91564 7.40869 4.16064 7.40869H9.41064C9.65564 7.40869 9.84814 7.60119 9.84814 7.84619C9.84814 8.09119 9.65564 8.28369 9.41064 8.28369Z" fill="#5F5F5F" />
                                    </svg>
                                </button>
                                <p className="text-light">.</p>
                            </div>
                        </div>
                    </div>
                    <div className="form-inline">
                        <div className="form-group mb-2 d-flex justify-content-center align-items-center">
                            <label className="form-label mr-2" htmlFor="inputField">
                                Total Devices Cost
                            </label>
                            <input type="text" className="form-control" id="inputField" />
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <p className="mt-3">Promotional Discounts</p>
                    <br />
                    <div className="row">
                        <div className="col-md-5">
                            <div className="form-group">
                                <label className="control-label" htmlFor="select4">
                                    Select Discounts
                                </label>
                                <select id="select4" className="form-select">
                                    {/* Options for the select */}
                                </select>
                                <div class="row d-flex justify-content-between">
                                    <div class="col-md-6">
                                        <p>Autopay Discount $5/line</p>
                                    </div>
                                    <div class="col-md-6 text-right">
                                        <FontAwesomeIcon className='mr-2' icon={faEdit} />
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="cost">Discount</label>
                                <input type="text" className="form-control" id="inputField" />
                                <p>1</p>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label>&nbsp;</label>
                                <br />
                                <button className="form-select my-submit h-100">Submit</button>
                                <p className="text-light">.</p>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label>&nbsp;</label>
                                <button className="btn add-btn h-100 w-100">
                                    Add{' '}
                                    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.78564 13.9712C3.40814 13.9712 0.660645 11.2237 0.660645 7.84619C0.660645 4.46869 3.40814 1.72119 6.78564 1.72119C10.1631 1.72119 12.9106 4.46869 12.9106 7.84619C12.9106 11.2237 10.1631 13.9712 6.78564 13.9712ZM6.78564 2.59619C3.88939 2.59619 1.53564 4.94994 1.53564 7.84619C1.53564 10.7424 3.88939 13.0962 6.78564 13.0962C9.68189 13.0962 12.0356 10.7424 12.0356 7.84619C12.0356 4.94994 9.68189 2.59619 6.78564 2.59619Z" fill="#5F5F5F" />
                                        <path d="M6.78564 10.9087C6.54064 10.9087 6.34814 10.7162 6.34814 10.4712V5.22119C6.34814 4.97619 6.54064 4.78369 6.78564 4.78369C7.03064 4.78369 7.22314 4.97619 7.22314 5.22119V10.4712C7.22314 10.7162 7.03064 10.9087 6.78564 10.9087Z" fill="#5F5F5F" />
                                        <path d="M9.41064 8.28369H4.16064C3.91564 8.28369 3.72314 8.09119 3.72314 7.84619C3.72314 7.60119 3.91564 7.40869 4.16064 7.40869H9.41064C9.65564 7.40869 9.84814 7.60119 9.84814 7.84619C9.84814 8.09119 9.65564 8.28369 9.41064 8.28369Z" fill="#5F5F5F" />
                                    </svg>
                                </button>
                                <p className="text-light">.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: '-30px', marginBottom: '-20px' }}>
                        <div className="col-md-4 offset-md-8">
                            <div className="form-group">
                                <label htmlFor="inputField">Total Promotional Discounts</label>
                                <input type="text" className="form-control" id="inputField" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5" style={{ backgroundColor: '#E5E5E5' }}>
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
                            <p className='text-center mt-3'>Old Plan</p>
                            <input type='number' className='form-control' placeholder='$'></input>
                        </div>
                        <div className="col-md-3 border-end">
                            <p className='text-center mt-3'>New Plan</p>
                            <input type='number' className='form-control' placeholder='$'></input>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="row mt-2">
                        <div className='col-md-2'>
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
                                    Add{' '}
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

            <div className="row h-100 ">
                <p className='quote'>DESCRIPTION OF PLANS & BENEFITS</p>
                <div className="col-8 ">
                    <div className='col-12 h-100 py-2 benefits'>
                        <ul>
                            <li>
                                <strong>Talk and text:</strong> unlimited
                            </li>
                            <li>
                                <strong>High-speed data:</strong> unlimited data on our 5G access with compatible device & coverage area
                            </li>
                            <li>
                                <strong>Premium data:</strong> 100GB Premium Data
                            </li>
                            <li>
                                <strong>High-speed data:</strong> 15GB of high-speed mobile hotspot data included. Unlimited mobile hotspot data at max 3G speed after 15GB
                            </li>
                            <li>
                                <strong>Video streaming quality:</strong> up to 720p HD video streaming (must activate HD video streaming)
                            </li>
                            <li>
                                <strong>Autopay discount:</strong> eligible
                            </li>
                            <li>
                                <strong>Tax and fee:</strong> included
                            </li>
                            <li>
                                <strong>Entertainment:</strong> Netflix on us: basic 1-screen (requires 2+ lines of this plan). Apple TV+ on us for 6 months
                            </li>
                            <li>
                                <strong>International:</strong> Canada and Mexico included with up to 10GB of high-speed data. Simple Global (Go5G, Magenta, Advanced Experience. State Ide International Unlimited Texting
                            </li>
                            <li>
                                <strong>Travel Benefits:</strong> T-Mobile in-flight connection. AAA on us for 12 months
                            </li>
                            <li>
                                <strong>Additional Benefits:</strong> Scam Shield, Free Caller ID. Turn on Scam Block, Free PROXY by DIGITS lines
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-4">
                    <div className='col-12 h-100 py-2 details'>
                        Store Phone Number
                        <p style={{ fontSize: '14px', color: 'gray' }}>Call this number first if need help with your account</p>
                        <input className='w-100 mb-2'></input>
                        Manager Name
                        <input className='w-100 mb-2'></input>
                        <p style={{ color: '#E20074', fontWeight: 'bold' }}>Notes</p>
                        <input className='w-100 mb-2'></input>
                    </div>
                </div>
            </div>
        </div >
    </>
    )
}