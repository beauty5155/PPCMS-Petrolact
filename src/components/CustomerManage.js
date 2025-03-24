import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function CustomerManage() {

    const [customerAdd, setCustomer] = useState({
        name: '',
        phone: '',
        password: '',
        address: '',
        balance: '',
        max_value: ''
    })

    let navigate = useNavigate();
    const { name, phone, password, address, balance, max_value } = customerAdd;

    const [errorMessage, setErrorMessage] = useState({});
    const errMsg = {};

    const handleChange = e => {
        setCustomer({ ...customerAdd, [e.target.name]: e.target.value });
        setErrorMessage({ ...errorMessage, [e.target.name]: '' });
    }

    const validate = (customerAdd) => {

        const name_pattern = /^([A-Za-z-. ])*$/;
        if (!customerAdd.name.trim()) {
            errMsg.name = 'Please enter Name';
            return false;
        } else if (name_pattern.test(customerAdd.name) === false) {
            errMsg.name = "Only alphabets - and .  are allowed";
            return false;
        } else if (customerAdd.name.length < 1) {
            errMsg.name = 'Please enter minimum 1 characters';
            return false;
        } else if (customerAdd.name.length > 50) {
            errMsg.name = 'Name cannot exceed 50 characters';
            return false;
        }

        const phone_pattern = /^([0-9-])*$/;
        if (!customerAdd.phone.trim()) {
            errMsg.phone = 'Please enter Phone';
            return false;
        } else if (phone_pattern.test(customerAdd.phone) === false) {
            errMsg.phone = "Only numbers are allowed";
            return false;
        } else if (customerAdd.phone.length < 10) {
            errMsg.phone = 'Please enter correct Phone Number';
            return false;
        } else if (customerAdd.phone.length > 11) {
            errMsg.phone = 'Phone cannot exceed 11 characters';
            return false;
        }

        const password_pattern = /^([a-zA-Z0-9])*$/;
        if (!customerAdd.password.trim()) {
            errMsg.password = 'Please enter password';
            return false;
        }
        // else if (customerAdd.password.length !== 10) {
        //   errMsg.password = "Please enter valid password";
        //   return false;
        // }
        else if (password_pattern.test(customerAdd.password) === false) {
            errMsg.password = "Only numbers are allowed";
            return false;
        }

        const balance_pattern = /^([0-9])*$/;
        if (!customerAdd.balance.trim()) {
            errMsg.balance = 'Please enter Balance';
            return false;
        } else if (balance_pattern.test(customerAdd.balance) === false) {
            errMsg.balance = "Only numbers are allowed";
            return false;
        } else if (customerAdd.balance.length < 1) {
            errMsg.balance = 'Please enter minimum 1 characters';
            return false;
        } else if (customerAdd.balance.length > 5) {
            errMsg.balance = 'Balance cannot exceed 5 characters';
            return false;
        }

        const max_value_pattern = /^([0-9])*$/;
        if (!customerAdd.max_value.trim()) {
            errMsg.max_value = 'Please enter Max Value';
            return false;
        } else if (max_value_pattern.test(customerAdd.max_value) === false) {
            errMsg.max_value = "Only numbers are allowed";
            return false;
        } else if (customerAdd.max_value.length < 1) {
            errMsg.max_value = 'Please enter minimum 1 characters';
            return false;
        } else if (customerAdd.max_value.length > 5) {
            errMsg.max_value = 'Max Value cannot exceed 5 characters';
            return false;
        }

        const address_pattern = /^([a-zA-Z0-9-_., ])*$/;
        if (!customerAdd.address.trim()) {
            errMsg.address = 'Please enter Address';
            return false;
        } else if (address_pattern.test(customerAdd.address) === false) {
            errMsg.address = "Only alphabets numbers - _ . and , are allowed";
            return false;
        } else if (customerAdd.address.length < 1) {
            errMsg.address = 'Please enter minimum 1 characters';
            return false;
        } else if (customerAdd.address.length > 100) {
            errMsg.address = 'Address cannot exceed 100 characters';
            return false;
        }

        return true;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (validate(customerAdd) === true) {
            axios.post(process.env.REACT_APP_API_HOST + "/customer", customerAdd)
                .then(response => {
                    console.log(response)
                })
            navigate('/customer')
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
                        <h2 className="page-title"> Customer </h2><br></br>

                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                                <label>Name<small className="text-danger"> *</small></label>
                                <input type='text' name="name" className="form-control" maxLength="100" value={name}
                                    onChange={e => handleChange(e)} />
                                <span className="text-danger">{errorMessage.name}</span>
                            </div>

                            <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                                <label>Phone<small className="text-danger"> *</small></label>
                                <input type='text' name="phone" className="form-control" maxLength="10" value={phone}
                                    onChange={e => handleChange(e)} />
                                <span className="text-danger">{errorMessage.phone}</span>
                            </div>

                            <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                                <label>Password<small className="text-danger"> *</small></label>
                                <input type='text' name="password" className="form-control" minLength="5" maxLength="12"
                                    value={password} onChange={e => handleChange(e)} />
                                <span className="text-danger">{errorMessage.password}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                                <label>Balance<small className="text-danger"> *</small></label>
                                <input type='text' name="balance" className="form-control" maxLength="12" value={balance}
                                    onChange={e => handleChange(e)} />
                                <span className="text-danger">{errorMessage.balance}</span>
                            </div>

                            <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                                <label>Max Value<small className="text-danger"> *</small></label>
                                <input type='text' name="max_value" className="form-control" maxLength="10" value={max_value}
                                    onChange={e => handleChange(e)} />
                                <span className="text-danger">{errorMessage.max_value}</span>
                            </div>

                            <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                                <label>Address<small className="text-danger"> *</small></label>
                                <textarea className="form-control" name="address" rows="4" cols="50" maxLength="100"
                                    value={address} onChange={e => handleChange(e)} ></textarea>
                                <span className="text-danger">{errorMessage.address}</span>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-12 text-end">
                                <input type="button" className="btn btn-primary me-3 mb-3" name='Save_Add' value='Save and Add' />
                                <input type="submit" className="btn btn-primary me-3 mb-3" name='Save' value='Save' />
                                <input type="button" className="btn btn-danger me-3 mb-3" name='cancel' value='Cancel' onClick={() => window.location.href = '/customer'} />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CustomerManage;