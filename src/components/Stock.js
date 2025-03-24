import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
// import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import $ from "jquery";

function Stock() {
  const [stockList, setStock] = useState([])

  useEffect(() => {
    getStockList();
  }, [])

  async function getStockList() {
    let result = ''
    await axios({
      url: "http://localhost:8080/stock",
      method: 'get',
    }).then(response => {
      console.log(response);
      console.log(response.data);
      result = response.data.stock
    })

    console.log(result)
    setStock(result)
  };

  $(function () {
    setTimeout(function () {
      $('#stockList').DataTable();
    }, 100);
  });

  return (
    <>
    
      <Layout>
        <div className="container-fluid">
          <div className="content-section">
            <h2 className="page-title">Stock List
              <div className="page-action">
              <Link to="/stockAdd" className="btn-save" style={{ float: 'right' }}>Add Stock</Link>
              </div>
            </h2><br></br><br></br>

            <form >
              <div className="table-responsive">
                <table className="display" style={{ width: '100%' }} cellSpacing="0" id="stockList">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Morning Reading</th>
                      <th>Evening Reading</th>
                      <th>Purchase Qty.</th>
                      <th>Remaining Qty.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockList.map((item) =>
                      <tr key={item.order_id}>
                        <td>{item.date}</td>
                        <td>{item.m_reading}</td>
                        <td>{item.e_reading}</td>
                        <td>{item.purchase_qty}</td>
                        <td>{item.remaining_qty}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}
export default Stock;