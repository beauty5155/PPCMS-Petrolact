import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

function Account() {
  const [accountList, setAccount] = useState([]);

  useEffect(() => {
    getAccountList();
  }, [])

  async function getAccountList() {
    let result = ''
    await axios({
      url: "http://localhost:8080/account",
      method: 'get',
    }).then(response => {
      console.log(response);
      console.log(response.data);
      result = response.data.account;
    })

    console.log(result)
    setAccount(result)
  };

  return (
    <>
    <Layout>
   <div className="container-fluid">
        <div className="content-section">
          <NavLink type="button" to="/accountAdd" className="btn-save" style={{ float: 'right' }}>Add Account</NavLink>
          <h2 className="page-title">List of Account</h2><br></br><br></br>

          <table className="display" id="accountList" width="100%">
            <thead>
              <tr>
                <th>Date</th>
                <th>Bought Qty.</th>
                <th>Bought Rate</th>
                <th>Bought Total</th>
                <th>Sold Qty</th>
                <th>Sold Rate</th>
                <th>Sold Total</th>
                <th>Remaining Qty</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody>
              {accountList.map((item) =>
                <tr key={item.aid}>
                  <td>{item.date}</td>
                  <td>{item.b_qty}</td>
                  <td>{item.b_rate}</td>
                  <td>{item.b_total}</td>
                  <td>{item.s_qty}</td>
                  <td>{item.s_rate}</td>
                  <td>{item.s_total}</td>
                  <td>{item.r_qty}</td>
                  <td>{item.profit}</td>
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
export default Account;