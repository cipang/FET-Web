import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './Header.css';

class Header extends React.Component {
  render() {
    return (

      <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-light" id="main-nav">
        <div className="container">
          <a className="navbar-brand" href="/">FET-Web</a>
          <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
          </div>
        </div>
      </nav>
    );
  }
}

export default connect()(Header);
