import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { NavLink } from "react-router-dom";
import axios from "axios";
// import $ from "jquery";

function Payment() {

    const [customer, setSelectedCustomer] = useState({
        cid: '',
        // name: ''
    })

    const { cid } = customer;

    const [customerList, setCustomer] = useState([])

    useEffect(() => {
        getCustomerList();
    }, [])

    async function getCustomerList() {
        let result = ''
        await axios({
            url: "http://localhost:8080/customer",
            method: 'get',
        }).then(response => {
            console.log(response);
            console.log(response.data);
            result = response.data.contact
        })
        console.log(result)
        setCustomer(result)
    };


    // useEffect(() => {
    //     async function getCustomerList() {
    //         let result = ''
    //         await axios({
    //             url: "http://localhost:8080/customer",
    //             method: 'get',
    //         }).then(response => {
    //             console.log(response);
    //             console.log(response.data);
    //             result = response.data.contact
    //         })
    //         console.log(result)
    //         setCustomer(result)
    //     };
    //     getCustomerList();
    // }, [cid])


    return (
        <>
            <Layout>
                <form>
                    <div className="container-fluid">
                        <div className="content-section">
                            <h2 className="page-title">Payment</h2><br></br><br></br>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                                    <label>Enter Customer ID<small className="text-danger"> *</small></label>
                                    <select className="form-control" name="cid" value={cid} onChange={e => setSelectedCustomer(e.target.value)}>
                                        <option value="">--Select Customer--</option>
                                        {customerList.map((item) =>
                                            <option key={item.cid} value={item.cid} >{item.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-2">
                                    <br></br>
                                    <NavLink className="btn-save" title="GetDetails" to={`/paymentAdd/${customer}`} >
                                        Get Details</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Layout>
        </>
    )
}
export default Payment;