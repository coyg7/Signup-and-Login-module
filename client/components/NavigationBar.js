import React from "react";
import { Link } from "react-router";

export default () => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">
            Logo
          </Link>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="navbar navbar-nav navbar-right">
            <li>
              <Link to="signup">SignUp</Link>
            </li>
            <li>
              <Link to="login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
