import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import './Login.css'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';


function Login() {
  let navigate = useNavigate();
  const [loginForm, setLoginInfo] = useState({
    name: "",
    password: "",
  });

  const { name, password } = loginForm;

  const [errorMessage, setErrorMessage] = useState({});
  const errMsg = {};

  // const [error, setError] = useState({
  //   refid : 0,
  //   ec : 0,
  //   message : '',
  //   status_code : 200
  // });

  // const { refid, ec, message, status_code } = error;

  const [errInfo, setErrInfo] = useState({});
  const errorInfoMsg = {};

  const handleChange = e => {
    setLoginInfo({ ...loginForm, [e.target.name]: e.target.value });
    setErrorMessage({ ...errorMessage, [e.target.name]: '' });
    setErrInfo({ ...errInfo, [e.target.name]: '' });
  }

  const validate = (loginForm) => {
    const name_pattern = /^([a-zA-Z-. ])*$/;
    if (!loginForm.name.trim()) {
      errMsg.name = 'Please enter Name';
      return false;
    } else if (name_pattern.test(loginForm.name) === false) {
      errMsg.name = "Only alphabets - and . are allowed";
      return false;
    }
    else if (loginForm.name.length < 2) {
      errMsg.name = 'Please enter minimum 2 characters';
      return false;
    } else if (loginForm.name.length > 50) {
      errMsg.name = 'Name cannot exceed 50 characters';
      return false;
    }

    const password_pattern = /^([a-zA-Z0-9])*$/;
    if (!loginForm.password.trim()) {
      errMsg.password = 'Please enter password';
      return false;
    }
    // else if (loginForm.password.length !== 10) {
    //   errMsg.password = "Please enter valid password";
    //   return false;
    // }
    else if (password_pattern.test(loginForm.password) === false) {
      errMsg.password = "Only numbers are allowed";
      return false;
    }

    return true;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate(loginForm) === true) {
      axios.post("http://localhost:8080/userlogin", loginForm)
        .then(response => {
          console.log(response);
          console.log(response.data[0].errinfo);

          if (response.data[0].errinfo.status_code === 200) {
            errorInfoMsg.message = '';
            navigate('/dashboard');
          }
          else {
            errorInfoMsg.message = response.data[0].errinfo.message;
            setErrInfo(errorInfoMsg);
          }
        })
      // setLoginInfo(({
      //   name: "",
      //   password: ""}))
    }
    else {
      console.log(errorMessage);
      setErrorMessage(errMsg);
      setErrInfo(errorInfoMsg);
    }
  }

  return (
    <>
      {/* 
            <div className="login">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <div className="login-section">

              <form onSubmit={e => onSubmit(e)} >
                <div className="title">LOGIN @</div>
                <div className="mb-4">
                  <div className="input-group login-input">
                    <input type="text" className="form-control" placeholder="Name" name="name" required autoComplete=""
                      value={loginForm.name} onChange={e => handleChange(e)} />
                  </div>
                  <span className="text-danger">{errorMessage.name}</span>
                </div>

                <div className="mb-4">
                  <div className="input-group login-input">
                    <input type="password" className="form-control" placeholder="Password" name="password" maxLength="10"
                      autoComplete="" value={loginForm.password} onChange={e => handleChange(e)} />
                  </div>
                  <span className="text-danger">{errorMessage.password}</span>
                </div>

                <div className="mb-4">
                  <NavLink className="login-link" id="forgotpassword">
                    Forgot your password?</NavLink>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn-login" id="loginbtn" onClick={() => window.location.href = '/home'}> Login</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
      </div>
 
      */}

      <div className="container">
        <div className="row no-gutters">
          <div className="col-lg-4">
            <div className="login" id="login-section">
              <span className="text-danger">{errInfo.message}</span>
              <form onSubmit={e => onSubmit(e)} className="login-main">
                <div className="title">LOGIN @</div>

                <div className="mb-4">
                  <div className="input-group mb-4">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input type="text" name="name" className="form-control" placeholder="Name" id="name"
                      value={name} onChange={e => handleChange(e)} />
                  </div>
                  <span className="text-danger">{errorMessage.name}</span>
                </div>
                <div className="input-group mb-4">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input type="password" name="password" className="form-control" placeholder="Password" id="password"
                    value={password} onChange={e => handleChange(e)} />
                </div>

                <div className="mb-4">
                  <NavLink className="login-link" id="forgotpassword">
                    Forgot your password?</NavLink>
                </div>
                <button type="submit" className="btn-login" id="loginbtn">
                  Login
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>

    </>
  )
}
export default Login;