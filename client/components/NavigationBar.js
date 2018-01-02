import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { logout } from '../actions/authActions';

class NavigationBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;


    const userLinks = (
      <ul className="navbar navbar-nav navbar-right list-group">
        <li className="list-group-item">
          <a href="#" onClick={this.logout.bind(this)}>Logout</a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar navbar-nav navbar-right list-group">
        <li>
          <Link to="signup" className="list-group-item">SignUp</Link>
        </li>
        <li>
          <Link to="login" className="list-group-item">Login</Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              Logo
            </Link>
          </div>
          <div className="collapse navbar-collapse" />
            {isAuthenticated ? userLinks : guestLinks}
          </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
