
// import React from "react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function SalesManage() {

	let navigate = useNavigate();

	const [salesAdd, setSales] = useState({
		cid: '',
		date: '',
		rate: '',
		quantity: '',
		total_amount: '',
		paid_amount: '',
		balance_amount: ''
	})

	const { cid, date, rate, quantity, total_amount, paid_amount, balance_amount } = salesAdd;

	const [errorMessage, setErrorMessage] = useState({});
	const errMsg = {};

	const handleChange = e => {
		setSales({ ...salesAdd, [e.target.name]: e.target.value });
		setErrorMessage({ ...errorMessage, [e.target.name]: '' });
	}


    const validate = (salesAdd) => {

        const cid_pattern = /^([A-Za-z-.])*$/;
        if (!salesAdd.cid.trim()) {
            errMsg.cid = 'Please enter Customer ID';
            return false;
        } else if (cid_pattern.test(salesAdd.cid) === false) {
            errMsg.cid = "Only numbers are allowed";
            return false;
        } else if (salesAdd.cid.length < 1) {
            errMsg.cid = 'Please enter minimum 1 characters';
            return false;
        } else if (salesAdd.cid.length > 5) {
            errMsg.cid = 'Customer ID cannot exceed 5 characters';
            return false;
        }

        // const date_pattern = /^([0-9-])*$/;
        if (!salesAdd.date.trim()) {
            errMsg.date = 'Please enter Date';
            return false;
        } 
		// else if (date_pattern.test(salesAdd.date) === false) {
        //     errMsg.date = "Only numbers are allowed";
        //     return false;
        // } else if (salesAdd.date.length < 10) {
        //     errMsg.date = 'Please enter correct date Number';
        //     return false;
        // } else if (salesAdd.date.length > 11) {
        //     errMsg.date = 'Date cannot exceed 5 characters';
        //     return false;
        // }

        const rate_pattern = /^([0-9])*$/;
        if (!salesAdd.rate.trim()) {
            errMsg.rate = 'Please enter Rate';
            return false;
        } else if (rate_pattern.test(salesAdd.rate) === false) {
            errMsg.rate = "Only numbers are allowed";
            return false;
        } else if (salesAdd.rate.length < 1) {
            errMsg.rate = 'Please enter minimum 1 characters';
            return false;
        } else if (salesAdd.rate.length > 5) {
            errMsg.rate = 'Rate cannot exceed 5 characters';
            return false;
        }

        const quantity_pattern = /^([0-9])*$/;
        if (!salesAdd.quantity.trim()) {
            errMsg.quantity = 'Please enter Quantity';
            return false;
        } else if (quantity_pattern.test(salesAdd.quantity) === false) {
            errMsg.quantity = "Only numbers are allowed";
            return false;
        } else if (salesAdd.quantity.length < 1) {
            errMsg.quantity = 'Please enter minimum 1 characters';
            return false;
        } else if (salesAdd.quantity.length > 5) {
            errMsg.quantity = 'Quantity cannot exceed 5 characters';
            return false;
        }

        const total_amount_pattern = /^([0-9])*$/;
        if (!salesAdd.total_amount.trim()) {
            errMsg.total_amount = 'Please enter Max Value';
            return false;
        } else if (total_amount_pattern.test(salesAdd.total_amount) === false) {
            errMsg.total_amount = "Only numbers are allowed";
            return false;
        } else if (salesAdd.total_amount.length < 1) {
            errMsg.total_amount = 'Please enter minimum 1 characters';
            return false;
        } else if (salesAdd.total_amount.length > 5) {
            errMsg.total_amount = 'Max Value cannot exceed 5 characters';
            return false;
        }

		const paid_amount_pattern = /^([0-9])*$/;
        if (!salesAdd.paid_amount.trim()) {
            errMsg.paid_amount = 'Please enter Paid Amount';
            return false;
        } else if (paid_amount_pattern.test(salesAdd.paid_amount) === false) {
            errMsg.paid_amount = "Only numbers are allowed";
            return false;
        } else if (salesAdd.paid_amount.length < 1) {
            errMsg.paid_amount = 'Please enter minimum 1 characters';
            return false;
        } else if (salesAdd.paid_amount.length > 5) {
            errMsg.paid_amount = 'Paid Amount cannot exceed 5 characters';
            return false;
        }

        const balance_amount_pattern = /^([0-9])*$/;
        if (!salesAdd.balance_amount.trim()) {
            errMsg.balance_amount = 'Please enter Balance Amount';
            return false;
        } else if (balance_amount_pattern.test(salesAdd.balance_amount) === false) {
            errMsg.balance_amount = "Only numbers are allowed";
            return false;
        } else if (salesAdd.balance_amount.length < 1) {
            errMsg.balance_amount = 'Please enter minimum 1 characters';
            return false;
        } else if (salesAdd.balance_amount.length > 5) {
            errMsg.balance_amount = 'Balance Amount cannot exceed 5 characters';
            return false;
        }
		
        return true;
    }


	const onSubmit = (e) => {
		e.preventDefault();
		if (validate(salesAdd) === true) {
			axios.post(process.env.REACT_APP_API_HOST + "/sales", salesAdd)
				.then(response => {
					console.log(response)
				})
			navigate('/sales')
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
						<h2 className="page-title">Make Bills.</h2><br></br>

						<div className="row">
							<div className="col-lg-3 col-md-4 col-sm-4 mb-5">
								<label>Date<small className="text-danger"> *</small></label>
								<input type='text' name="date" className="form-control" placeholder="yyyy-mm-dd" maxLength="25" value={date} onChange={e => handleChange(e)} />
								<span className="text-danger">{errorMessage.date}</span>
							</div>

							<div className="col-lg-3 col-md-4 col-sm-4 mb-5">
								<label>Customer ID<small className="text-danger"> *</small></label>
								<input type='text' name="cid" className="form-control" maxLength="10" value={cid} onChange={e => handleChange(e)} />
								<span className="text-danger">{errorMessage.cid}</span>
							</div>

							<div className="col-lg-3 col-md-4 col-sm-4 mb-5">
								<label>Rate<small className="text-danger"> *</small></label>
								<input type='text' name="rate" className="form-control" maxLength="8" value={rate} onChange={e => handleChange(e)} />
								<span className="text-danger">{errorMessage.rate}</span>
							</div>

							<div className="col-lg-3 col-md-4 col-sm-4 mb-5">
								<label>Quantity<small className="text-danger"> *</small></label>
								<input type='text' name="quantity" className="form-control" maxLength="12" value={quantity} onChange={e => handleChange(e)} />
								<span className="text-danger">{errorMessage.quantity}</span>
							</div>

						</div>

						<div className="row">
							<div className="col-lg-3 col-md-4 col-sm-4 mb-5">
								<label>Total Amount<small className="text-danger"> *</small></label>
								<input type='text' name="total_amount" className="form-control" maxLength="10" value={total_amount} onChange={e => handleChange(e)} />
							</div>

							<div className="col-lg-3 col-md-4 col-sm-4 mb-5">
								<label>Paid Amount<small className="text-danger"> *</small></label>
								<input type='text' name="paid_amount" className="form-control" maxLength="10" value={paid_amount} onChange={e => handleChange(e)} />
								<span className="text-danger">{errorMessage.paid_amount}</span>
							</div>

							<div className="col-lg-3 col-md-4 col-sm-4 mb-5">
								<label>Balance Amount<small className="text-danger"> *</small></label>
								<input type='text' name="balance_amount" className="form-control" maxLength="10" value={balance_amount} onChange={e => handleChange(e)} />
								<span className="text-danger">{errorMessage.balance_amount}</span>
							</div>

						</div>

						<div className="row">
							<div className="col-12 text-end">
								<input type="button" className="btn btn-primary me-3 mb-3" name='Save_Add' value='Save and Add' />
								<input type="submit" className="btn btn-primary me-3 mb-3" name='Save' value='Save' />
								<input type="button" className="btn btn-danger mr-3 mb-3" name='cancel' value='Cancel' onClick={() => window.location.href = '/sales'} />
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	)
}
export default SalesManage;