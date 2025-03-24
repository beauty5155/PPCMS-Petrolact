// import React from "react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import $ from "jquery";

function AccountManage() {

  let navigate = useNavigate();

  const [accountAdd, setAccount] = useState({
    date: '',
    b_qty: '',
    b_rate: '',
    s_qty: '',
    s_rate: ''
  })

  const { date, b_qty, b_rate, s_qty, s_rate } = accountAdd;

  const [errorMessage, setErrorMessage] = useState({});
  const errMsg = {};

  const handleChange = e => {
    setAccount({ ...accountAdd, [e.target.name]: e.target.value });
    setErrorMessage({ ...errorMessage, [e.target.name]: '' });
  }

  const validate = (accountAdd) => {

    if (!accountAdd.date.trim()) {
      errMsg.date = 'Please enter Date';
      // setErrorMessage({ ...errorMessage, 'name': 'Please enter Name'});
      return false;
    }

    const b_qty_pattern = /^([0-9])*$/;
    if (!accountAdd.b_qty.trim()) {
      errMsg.b_qty = 'Please enter B Qty';
      return false;
    } else if (b_qty_pattern.test(accountAdd.b_qty) === false) {
      errMsg.b_qty = "Only numbers are allowed";
      return false;
    } else if (accountAdd.b_qty.length < 1) {
      errMsg.b_qty = 'Please enter minimum 1 characters';
      return false;
    } else if (accountAdd.b_qty.length > 5) {
      errMsg.b_qty = 'B Qty cannot exceed 5 characters';
      return false;
    }

    const b_rate_pattern = /^([0-9])*$/;
    if (!accountAdd.b_rate.trim()) {
      errMsg.b_rate = 'Please enter B Rate';
      return false;
    } else if (b_rate_pattern.test(accountAdd.b_rate) === false) {
      errMsg.b_rate = "Only numbers are allowed";
      return false;
    } else if (accountAdd.b_rate.length < 1) {
      errMsg.b_rate = 'Please enter minimum 1 characters';
      return false;
    } else if (accountAdd.b_rate.length > 5) {
      errMsg.b_rate = 'B Rate cannot exceed 5 characters';
      return false;
    }

    const s_qty_pattern = /^([0-9])*$/;
    if (!accountAdd.s_qty.trim()) {
      errMsg.s_qty = 'Please enter Sold Qty';
      return false;
    } else if (s_qty_pattern.test(accountAdd.s_qty) === false) {
      errMsg.s_qty = "Only numbers are allowed";
      return false;
    } else if (accountAdd.s_qty.length < 1) {
      errMsg.s_qty = 'Please enter minimum 1 characters';
      return false;
    } else if (accountAdd.s_qty.length > 5) {
      errMsg.s_qty = 'S Qty cannot exceed 5 characters';
      return false;
    }

    const s_rate_pattern = /^([0-9])*$/;
    if (!accountAdd.s_rate.trim()) {
      errMsg.s_rate = 'Please enter Sold Rate';
      return false;
    } else if (s_rate_pattern.test(accountAdd.s_rate) === false) {
      errMsg.s_rate = "Only numbers are allowed";
      return false;
    } else if (accountAdd.s_rate.length < 1) {
      errMsg.s_rate = 'Please enter minimum 1 characters';
      return false;
    } else if (accountAdd.s_rate.length > 5) {
      errMsg.s_rate = 'B Qty cannot exceed 5 characters';
      return false;
    }

    return true;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate(accountAdd) === true) {
      axios.post(process.env.REACT_APP_API_HOST + "/account", accountAdd)
        .then(response => {
          console.log(response)
        })
      navigate('/account')
    }
    else {
      setErrorMessage(errMsg);
    }
  }

// $(function () {
//     $('#datepicker').datepicker();
//   });


//   $(function () {
//     $('#picker').datetimepicker();
// });


  return (
    <>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"></link>
    {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css"></link> */}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"></script> */}
{/* <script src ="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>   */}
{/* <script src ="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js"></script>   */}
{/* <script src ="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.7.14/js/bootstrap-datetimepicker.min.js"></script>   */}
{/* <link rel ="stylesheet" href ="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" />   */}
{/* <link rel ="stylesheet" href ="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.7.14/css/bootstrap-datetimepicker.min.css" />  */}
      <form onSubmit={e => onSubmit(e)}>
        <div className="container-fluid">
          <div className="content-section">
            <h2 className="page-title">Account </h2><br></br>
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                <label>Date<small className="text-danger"> *</small></label>
                {/* <input type='text' name="date" className="form-control" placeholder="yyyy-mm-dd"
                  maxLength="25" value={date} onChange={e => handleChange(e)} /> */}
                <div className="input-group date" id="datepicker">
                    <input type="text" name="date" className="form-control" id="date" value={date} onChange={e => handleChange(e)} />
                    <span className="input-group-append">
                      <span className="input-group-text bg-light d-block">
                        <i className="fa fa-calendar"></i>
                      </span>
                    </span>
                  </div>
                  <span className="text-danger">{errorMessage.date}</span>

                {/* <div className='input-group date' id='picker'>
                  <input type='text' name="date" className="form-control" id="date" value={date} onChange={e => handleChange(e)} />
                  <span className="input-group-addon">
                    <span className="glyphicon glyphicon-calendar"></span>
                  </span>
                </div>
                <span className="text-danger">{errorMessage.date}</span> */}

              </div>

              <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                <label>B QTY<small className="text-danger"> *</small></label>
                <input type='text' name="b_qty" className="form-control" maxLength="10" value={b_qty} onChange={e => handleChange(e)} />
                <span className="text-danger">{errorMessage.b_qty}</span>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                <label>B Rate<small className="text-danger"> *</small></label>
                <input type='text' name="b_rate" className="form-control" maxLength="8" value={b_rate} onChange={e => handleChange(e)} />
                <span className="text-danger">{errorMessage.b_rate}</span>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                <label>Sold Qty<small className="text-danger"> *</small></label>
                <input type='text' name="s_qty" className="form-control" maxLength="10" value={s_qty} onChange={e => handleChange(e)} />
                <span className="text-danger">{errorMessage.s_qty}</span>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                <label>Sold Rate<small className="text-danger"> *</small></label>
                <input type='text' name="s_rate" className="form-control" maxLength="10" value={s_rate} onChange={e => handleChange(e)} />
                <span className="text-danger">{errorMessage.s_rate}</span>
              </div>
            </div>

            <div className="row">
              <div className="col-12 text-end">
                <input type="button" className="btn btn-primary me-3 mb-3" name='Save_Add'
                  value='Save and Add' />
                <input type="submit" className="btn btn-primary me-3 mb-3" name='Save' value='Save' />
                <input type="button" className="btn btn-danger me-3 mb-3" name='cancel' value='Cancel' onClick={() => window.location.href = '/account'} />
              </div>
            </div>
          </div>
        </div>
      </form>

    </>
  )
}
export default AccountManage;