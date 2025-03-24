import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";

function Customer() {
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

    $(function () {
        setTimeout(function () {
            $('#customerList').DataTable();
        }, 100);
    });

    return (
        <>
            <Layout>
                <div className="container-fluid">
                    <div className="content-section">
                        {/* <NavLink type="button" to="/accountAdd" className="btn btn-primary" style={{ float: 'right' }}>Add Customer</NavLink>
                        <h2 className="page-title">List of Customer</h2><br></br><br></br> */}
                        <h2 className="page-title"> List of Customers
                            <NavLink to="/customerAdd" className="btn-save" style={{ float: 'right' }}> Add Customer</NavLink>
                        </h2><br></br><br></br>
                        <table className="display" id="customerList" style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th>Cid</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Joining Date</th>
                                    <th>Balance</th>
                                    <th>Max Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerList.map((item) =>
                                    <tr key={item.cid}>
                                        <td>{item.cid}</td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.joining_date}</td>
                                        <td>{item.balance}</td>
                                        <td>{item.max_value}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </>
    )
}
export default Customer;