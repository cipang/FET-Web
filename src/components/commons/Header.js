import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './Header.css';

class Header extends React.Component {

  renderLogin() {
    if (this.props.auth.loggedIn) {
      return(
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/"><div className="nav-link">Home</div></Link>
          </li>
          <li className="nav-item dropdown">
            <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {this.props.auth.user.email}
            </div>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to="/profile"><div className="dropdown-item">Account</div></Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={this.props.logout} >Logout</button>
            </div>
          </li>
          <li className="nav-item">
            <div className="btn btn-primary">Make An Appointment</div>
          </li>
        </ul>
      )
    }

    return(
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/"><div className="nav-link">Home</div></Link>
        </li>
        <li className="nav-item">
          <Link to="/login"><div className="nav-link">Login</div></Link>
        </li>
      </ul>
    )
  }

  render() {
    return (

      <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-light" id="main-nav">
        <div className="container">
          <a className="navbar-brand" href="/">FET-Web</a>
          <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            {this.renderLogin()}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, {})(Header);
