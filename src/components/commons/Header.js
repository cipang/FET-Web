import React from "react";
import { connect } from 'react-redux';
import { Layout, Menu, Typography } from 'antd';
import { Link } from "react-router-dom";
import { logout,
         updateFieldAuth,
         onNewTimetable,
         updateFieldListTimetable
       } from '../../actions';
import './Header.css';

class Header extends React.Component {

  handleHeaderChange = (e) => { this.props.updateFieldAuth("headerPos", e.key); }

  handleNewTimeTable = () => {this.props.onNewTimetable();}

  handleRefreshListTimetables = () => {
    this.props.updateFieldListTimetable("showTimetable", false);
  }

  render() {
    const { loggedIn, user, headerPos } = this.props.auth;

    return (
      <Layout.Header className="header" >
        <Typography.Title className="logo" level={3}>FET-Web</Typography.Title>
        <Menu
          mode="horizontal"
          selectedKeys={[headerPos.toString()]}
          style={{ lineHeight: '64px', float:'right' }}
          onClick={this.handleHeaderChange}
        >
          <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
          {loggedIn?
            <Menu.SubMenu title= {user.email}>
              <Menu.Item key="listTimetables" onClick={this.handleRefreshListTimetables}>
                <Link to="/listTimetables">View All Timetables</Link>
              </Menu.Item>
              <Menu.Item key="logout" onClick={this.props.logout}>Logout</Menu.Item>
            </Menu.SubMenu>
            :<Menu.Item key="2"><Link to="/signIn">Login</Link></Menu.Item>}
          {loggedIn?
            <Menu.Item key="2" onClick={this.handleNewTimeTable }>
              <Link to="/newTimetable">Make a timeable</Link>
            </Menu.Item>
            :null}

        </Menu>
      </Layout.Header>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect( mapStateToProps,
                        { logout,
                          updateFieldAuth,
                          onNewTimetable,
                          updateFieldListTimetable }
                      )(Header);
