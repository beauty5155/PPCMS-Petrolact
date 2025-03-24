import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import './Header.css';

function Header() {

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light landing">
          <div className="container">
            <NavLink className="navbar-brand">
              <img src={require("../assets/logo3.jpg")} alt="Bootstrap" width="170" height="95" />
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ml-auto">
                {/* <li className="nav-item active">
                  <Link to="/home" className="nav-link active" >Home</Link>
                </li> */}
                <li className="nav-item">
                  <Link to="/customer" className="nav-link">Reg Customer</Link>
                </li>
                <li className="nav-item active">
                  <Link to="/account" className="nav-link">Account</Link>
                </li>
                <li className="nav-item">
                  <Link to="/stock" className="nav-link">Stock</Link>
                </li>
                <li className="nav-item">
                  <Link to="/sales" className="nav-link">Sales</Link>
                </li>
                <li className="nav-item">
                  <Link to="/payment" className="nav-link">Received Amt.(Payment)</Link>
                </li>
              </ul>
            </div>
            <div>
                <Link to="/" className="btn-save" > Logout</Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
export default Header;