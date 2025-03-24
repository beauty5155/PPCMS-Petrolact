// import React from "react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function StockManage() {

  let navigate = useNavigate();

  const [stockAdd, setStock] = useState({
    date: '',
    m_reading: '',
    e_reading: '',
    purchase_qty: '',
    remaining_qty: ''
  })

  const { date, m_reading, e_reading, purchase_qty, remaining_qty } = stockAdd;

  const [errorMessage, setErrorMessage] = useState({});
  const errMsg = {};

  const handleChange = e => {
    setStock({ ...stockAdd, [e.target.name]: e.target.value });
    setErrorMessage({ ...errorMessage, [e.target.name]: '' });
  }

  const validate = (accountAdd) => {

  if (!stockAdd.date.trim()) {
    errMsg.date = 'Please enter Date';
    // setErrorMessage({ ...errorMessage, 'name': 'Please enter Name'});
    return false;
  }

  const m_reading_pattern = /^([0-9])*$/;
  if (!stockAdd.m_reading.trim()) {
    errMsg.m_reading = 'Please enter M Reading';
    return false;
  } else if (m_reading_pattern.test(stockAdd.m_reading) === false) {
    errMsg.m_reading = "Only numbers are allowed";
    return false;
  }  else if (stockAdd.m_reading.length < 1) {
    errMsg.m_reading = 'Please enter minimum 1 characters';
    return false;
  } else if (stockAdd.m_reading.length > 5) {
    errMsg.m_reading = 'M Reading cannot exceed 5 characters';
    return false;
  }

  const e_reading_pattern = /^([0-9])*$/;
  if (!stockAdd.e_reading.trim()) {
    errMsg.e_reading = 'Please enter E Reading';
    return false;
  } else if (e_reading_pattern.test(stockAdd.e_reading) === false) {
    errMsg.e_reading = "Only numbers are allowed";
    return false;
  } else if (stockAdd.e_reading.length < 1) {
    errMsg.e_reading = 'Please enter minimum 1 characters';
    return false;
  } else if (stockAdd.e_reading.length > 5) {
    errMsg.e_reading = 'E Reading cannot exceed 5 characters';
    return false;
  }

  const purchase_qty_pattern = /^([0-9])*$/;
  if (!stockAdd.purchase_qty.trim()) {
    errMsg.purchase_qty = 'Please enter Sold Qty';
    return false;
  } else if (purchase_qty_pattern.test(stockAdd.purchase_qty) === false) {
    errMsg.purchase_qty = "Only numbers are allowed";
    return false;
  } else if (stockAdd.purchase_qty.length < 1) {
    errMsg.purchase_qty = 'Please enter minimum 1 characters';
    return false;
  } else if (stockAdd.purchase_qty.length > 5) {
    errMsg.purchase_qty = 'S Qty cannot exceed 5 characters';
    return false;
  }
  
  const remaining_qty_pattern = /^([0-9])*$/;
  if (!stockAdd.remaining_qty.trim()) {
    errMsg.remaining_qty = 'Please enter Sold Rate';
    return false;
  } else if (remaining_qty_pattern.test(stockAdd.remaining_qty) === false) {
    errMsg.remaining_qty = "Only numbers are allowed";
    return false;
  }  else if (stockAdd.remaining_qty.length < 1) {
    errMsg.remaining_qty = 'Please enter minimum 1 characters';
    return false;
  } else if (stockAdd.remaining_qty.length > 5) {
    errMsg.remaining_qty = 'B Qty cannot exceed 5 characters';
    return false;
  }
  
  return true;
}

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate(stockAdd) === true) {
    axios.post(process.env.REACT_APP_API_HOST + "/stock", stockAdd)
      .then(response => {
        console.log(response)
      })
    navigate('/stock')
  }
  else {
    setErrorMessage(errMsg);
  }
}

  return (
    <>
      <form onSubmit={e => onSubmit(e)}>
        <div className="container-fluid">
          <div className="content-section">
            <h2 className="page-title">
              Stock
            </h2><br></br>

            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                <label>Date<small className="text-danger"> *</small></label>
                <input type='text' name="date" className="form-control" placeholder="yyyy-mm-dd" maxLength="25" value={date} onChange={e => handleChange(e)} />
                <span className="text-danger">{errorMessage.date}</span>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                <label>Morning Reading<small className="text-danger"> *</small></label>
                <input type='text' name="m_reading" className="form-control" maxLength="10" value={m_reading} onChange={e => handleChange(e)} />
                <span className="text-danger">{errorMessage.m_reading}</span>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                <label>Evening Reading<small className="text-danger"> *</small></label>
                <input type='text' name="e_reading" className="form-control" maxLength="8" value={e_reading} onChange={e => handleChange(e)} />
                <span className="text-danger">{errorMessage.e_reading}</span>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                <label>Purchase Qty.<small className="text-danger"> *</small></label>
                <input type='text' name="purchase_qty" className="form-control" maxLength="12" value={purchase_qty} onChange={e => handleChange(e)} />
                <span className="text-danger">{errorMessage.purchase_qty}</span>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                <label>Remaining Qty.<small className="text-danger"> *</small></label>
                <input type='text' name="remaining_qty" className="form-control" maxLength="10" value={remaining_qty} onChange={e => handleChange(e)} />
                <span className="text-danger">{errorMessage.remaining_qty}</span>
              </div>

            </div>

            <div className="row">
              <div className="col-12 text-end">
                <input type="button" className="btn btn-primary me-3 mb-3" name='Save_Add' value='Save and Add' />
                <input type="submit" className="btn btn-primary me-3 mb-3" name='Save' value='Save' />
                <input type="button" className="btn btn-danger me-3 mb-3" name='Cancel' value='Cancel' onClick={() => window.location.href = '/stock'} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
export default StockManage;