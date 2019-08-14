import React from "react";
import { connect } from 'react-redux';
import { Layout, Menu, Typography, Divider, Button } from 'antd';
import { Link } from "react-router-dom";
import { logout } from '../../actions';
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
    const { loggedIn, user } = this.props.auth;
    return (
      <Layout.Header className="header" >
        <Typography.Title className="logo" level={3}>FET-Web</Typography.Title>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px', float:'right' }}
        >
          <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
          <Menu.Item key="2">Explore</Menu.Item>
          {loggedIn?
            <Menu.SubMenu title= {user.email}>
              <Menu.Item key="profile">Profile</Menu.Item>
              <Menu.Item key="logout" onClick={this.props.logout}>Logout</Menu.Item>
            </Menu.SubMenu>
            :<Menu.Item key="3"><Link to="/login">Login</Link></Menu.Item>}
          {loggedIn?<Menu.Item key="3"><Link to="/newTimetable">Make a timeable</Link></Menu.Item>:null}

        </Menu>
      </Layout.Header>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Header);
