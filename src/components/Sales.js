import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";

function Sales() {
  const [salesList, setSales] = useState([])

  useEffect(() => {
    getSalesList();
  }, [])

  async function getSalesList() {
    let result = ''
    await axios({
      url: "http://localhost:8080/sales",
      method: 'get',
    }).then(response => {
      console.log(response);
      console.log(response.data);
      result = response.data.sales
    })

    console.log(result)
    setSales(result)
  };

  $(function () {
    setTimeout(function () {
      $('#salesList').DataTable();
    }, 100);
  });


  return (
    <>
      <Layout>
        <div className="container-fluid">
          <div className="content-section">
            {/* <NavLink type="button" to="/salesAdd" className="btn btn-primary" style={{ float: 'right' }}>Add Sales</NavLink> */}
            <h2 className="page-title">List of Sales
              <NavLink type="button" to="/salesAdd" className="btn btn-primary" style={{ float: 'right' }}>Add Sales</NavLink>
            </h2><br></br><br></br>
            <table className="display" id="salesList">
              <thead>
                <tr>
                  <th>Cid</th>
                  <th>Bill No.</th>
                  <th>Date</th>
                  <th>Rate</th>
                  <th>Quantity</th>
                  <th>Total Amt.</th>
                  <th>Paid Amt.</th>
                  <th>Balance Amt</th>
                </tr>
              </thead>
              <tbody>
                {salesList.map((item) =>
                  <tr key={item.bill_no}>
                    <td>{item.cid}</td>
                    <td>{item.bill_no}</td>
                    <td>{item.date}</td>
                    <td>{item.rate}</td>
                    <td>{item.quantity}</td>
                    <td>{item.total_amount}</td>
                    <td>{item.paid_amount}</td>
                    <td>{item.balance_amount}</td>
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
export default Sales;