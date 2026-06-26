import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth} from "../Context/AuthContext";

function Navbar() {
  // const { user, logout } = useContext(AuthContext);

  // use the custome hook of useAuth to get the data of AuthContext data 

  const {user,logout} = useAuth();

  return (
    <nav className="navbar">
      {/* <h2>My E-commerce</h2> */}
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          ShopHub
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/checkout" className="navbar-link">
            Cart
          </Link>
        </div>
        <div className="navbar-auth">
          {/* if user is not logged in then this condition works */}
          {!user ? (
            <div className="navbar-auth-links">
              <Link to="/auth" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/auth" className="btn btn-primary">
                Signup
              </Link>
            </div>
          ) : (
            <div className="navbar-user">
              <span className="navbar-greeting">Hello , {user.email}</span>
              <button className="btn btn-secondary" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
