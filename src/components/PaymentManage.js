import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { useParams } from "react-router-dom";

function PaymentManage() {
  const [paymentList, setPayment] = useState([])
  const { cid } = useParams();

  const [getCustomerForID, setCustomerForID] = useState({
    cid: '',
    name: '',
    phone: '',
    address: '',
    joining_date: '',
    balance: '',
    max_value: ''
  })

  const { name, phone, address, joining_date, balance, max_value } = getCustomerForID;

  useEffect(() => {
    async function loadCustomer() {
      let result = ''
      await axios({
        url: "http://localhost:8080/customer/" + cid,
        method: 'get',
      }).then(response => {
        console.log(response);
        console.log(response.data);
        result = response.data.customer
      })
      console.log(result)
      setCustomerForID(result)
    };
    loadCustomer();
    getCustomerList();
    getPaymentList();
  }, [cid])

  const handleChange = e => {
    setCustomerForID({ ...getCustomerForID, [e.target.name]: e.target.value });
  };

  const onClick = e => {
    setPaymentAdd(({
      date: "",
      paid_amount: ""
    }))
  }

  const [customerList, setCustomer] = useState([])
  // useEffect(() => {
  //   getCustomerList();
  // }, [])

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

  const [paymentAdd, setPaymentAdd] = useState({
    cid: cid,
    date: '',
    paid_amount: ''
  })

  const { date, paid_amount } = paymentAdd;

  const [errorMessage, setErrorMessage] = useState({});
  const errMsg = {};

  const handleChangePayment = e => {
    setPaymentAdd({ ...paymentAdd, [e.target.name]: e.target.value });
    setErrorMessage({ ...errorMessage, [e.target.name]: '' });
  }


  const validate = (paymentAdd) => {

    if (!paymentAdd.date.trim()) {
      errMsg.date = 'Please enter Date';
      // setErrorMessage({ ...errorMessage, 'name': 'Please enter Name'});
      return false;
    }

    const paid_amount_pattern = /^([0-9])*$/;
    if (!paymentAdd.paid_amount.trim()) {
      errMsg.paid_amount = 'Please enter B Qty';
      return false;
    } else if (paid_amount_pattern.test(paymentAdd.paid_amount) === false) {
      errMsg.paid_amount = "Only numbers are allowed";
      return false;
    } else if (paymentAdd.paid_amount.length < 1) {
      errMsg.paid_amount = 'Please enter minimum 1 characters';
      return false;
    } else if (paymentAdd.paid_amount.length > 5) {
      errMsg.paid_amount = 'B Qty cannot exceed 5 characters';
      return false;
    }

    return true;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate(paymentAdd) === true) {
      axios.post(process.env.REACT_APP_API_HOST + "/payment", paymentAdd)
        .then(response => {
          console.log(response)
        })
      // navigate('/payment')
    }
    else {
      setErrorMessage(errMsg);
    }
  }

  // useEffect(() => {
  //   getPaymentList();
  // }, [])

  async function getPaymentList() {
    let result = ''
    await axios({
      url: "http://localhost:8080/payment",
      method: 'get',
      params: { 'flag': 'PAYMENT_W_CID', 'cid': paymentAdd.cid }
    }).then(response => {
      console.log(response);
      console.log(response.data);
      result = response.data.payment
    })
    console.log(result)
    setPayment(result)
  };

  // const getPaymentList = async (cid) => {
  //   let result = ''
  //   await axios({
  //     url: "http://localhost:8080/payment",
  //     method: 'get',
  //     params: { 'flag': 'PAYMENT_W_CID', 'cid': paymentAdd.cid }
  //   }).then((resp) => {
  //     console.log(resp);
  //     console.log(resp.data);
  //     result = resp.data.payment
  //   })
  //   setPayment(result)
  // }



  $(function () {
    setTimeout(function () {
      $('#paymentList').DataTable();
    }, 100);
  });

  return (
    <>
      <div className="container-fluid">
        <div className="content-section">
          <form>
            <h2 className="page-title">
              Details
              <NavLink to="/customerAdd" className="btn-save" style={{ float: "right", marginRight: "5px"  }}> Allow </NavLink> 
              <NavLink to="/payment" className="btn btn-danger" style={{ float: "right", marginRight: "5px" }}> Back </NavLink>             
            </h2>

            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                <label>Name<small className="text-danger"> *</small></label>
                <input type='text' name="name" className="form-control" maxLength="100" value={name} onChange={e => handleChange(e)} disabled />
              </div>

              <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                <label>Phone<small className="text-danger"> *</small></label>
                <input type='text' name="phone" className="form-control" maxLength="15" value={phone} onChange={e => handleChange(e)} disabled />
              </div>

              <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                <label>Balance<small className="text-danger"> *</small></label>
                <input type='text' name="balance" className="form-control" maxLength="12" value={balance} onChange={e => handleChange(e)} disabled />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                <label>Joining Date<small className="text-danger"> *</small></label>
                <input type='text' name="joining_date" className="form-control" placeholder="yyyy-mm-dd" maxLength="100"
                  value={joining_date} onChange={e => handleChange(e)} disabled />
              </div>
              <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                <label>Max Value<small className="text-danger"> *</small></label>
                <input type='text' name="max_value" className="form-control" maxLength="10"
                  value={max_value} onChange={e => handleChange(e)} disabled />
              </div>

              <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                <label>Address<small className="text-danger"> *</small></label>
                <textarea name="address" className="form-control" rows="4" cols="50" maxLength="100"
                  value={address} onChange={e => handleChange(e)} disabled>
                </textarea>
              </div>

            </div>
          </form>

  {/* <!-- --------------------------------------------------------------------------------
    ---------------------------------------------------------------------------------- --> */}

          <form onSubmit={e => onSubmit(e)}>
            <h2 className="page-title">
              Received Amount
            </h2><br></br><br></br>

            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                <label>Name <small className="text-danger"> *</small></label>
                {/* <input type='text' className="form-control" maxLength="25" name="cid"
                value={cid} onChange={e => handleChangePayment(e)} /> */}
                <select className="form-control" name="cid" value={cid} onChange={e => handleChangePayment(e.target.value)} disabled>
                  <option value="">--Select Customer--</option>
                  {customerList.map((item) =>
                    <option key={item.cid} value={item.cid}>{item.name} ({item.cid})</option>
                  )}
                </select>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                <label>Date<small className="text-danger"> *</small></label>
                <input type='text' name="date" className="form-control" placeholder="yyyy-mm-dd" maxLength="25"
                  value={date} onChange={e => handleChangePayment(e)} />
                <span className="text-danger">{errorMessage.date}</span>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-4 mb-5">
                <label>Paid Amount<small className="text-danger"> *</small></label>
                <input type='text' name="paid_amount" className="form-control" maxLength="10"
                  value={paid_amount} onChange={e => handleChangePayment(e)} />
                <span className="text-danger">{errorMessage.paid_amount}</span>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2">
                <br></br>
                <input type="submit" className="btn btn-primary me-3 mb-3" name='Save' value='Save' />
                <input type="button" className="btn btn-danger me-3 mb-3" name='Cancel' value='Cancel' onClick={e => onClick(e)} />
              </div>

            </div>
          </form>

          {/* <!-- -=========================================================================================================
============================================================================================================= --> */}


          <h2 className="page-title">Amount Received Details</h2><br></br><br></br>
          <table className="display" style={{ width: "100%" }} cellSpacing="0" id="paymentList">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Date</th>
                <th>Paid Amount</th>
              </tr>
            </thead>
            <tbody>
              {paymentList.map((item) =>
                <tr key={item.pid}>
                  <td>{item.cid}</td>
                  <td>{item.date}</td>
                  <td>{item.paid_amount}</td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>
    </>
  )
}
export default PaymentManage;