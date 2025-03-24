import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import Header from './components/Header';
import Login from './components/Login'
import Home from './components/Home';
import Customer from './components/Customer';
import CustomerManage from './components/CustomerManage';
import Account from './components/Account';
import AccountManage from './components/AccountManage';
import Stock from './components/Stock';
import StockManage from './components/StockManage';
import Sales from './components/Sales';
import SalesManage from './components/SalesManage';
import Payment from './components/Payment';
import PaymentManage from './components/PaymentManage';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
// import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
// import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
// import "ag-grid-community/styles/ag-theme-quartz.css";

function App() {

  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/customer' element={<Customer />}></Route>
          <Route path='/customerAdd' element={<CustomerManage />}></Route>
          <Route path='/customerAdd/:cid' element={<CustomerManage />}></Route>
          <Route path='/account' element={<Account />}></Route>
          <Route path='/accountAdd' element={<AccountManage />}></Route>
          <Route path='/stock' element={<Stock />}></Route>
          <Route path='/stockAdd' element={<StockManage />}></Route>
          <Route path='/sales' element={<Sales />}></Route>
          <Route path='/salesAdd' element={<SalesManage />}></Route>
          <Route path='/payment' element={<Payment />}></Route>
          <Route path='/paymentAdd/:cid' element={<PaymentManage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  );
}

export default App;
