import React from 'react';
import AppLayout from './layouts/AppLayout';
import Login from "./Login";
import Register from "./Register";
import { Button, Card, Row, Col, Tabs, Typography } from 'antd';
import { connect } from 'react-redux';
import './Auth.css';

class Auth extends React.Component {

  componentDidUpdate() {
    if(this.props.loggedIn){
      this.props.history.push("/listTimetables");
    };
  }

  render() {
    return (
      <AppLayout>
        <div className="container login-section">
          <Card>
            <Row gutter={24}>
              <Col span={16}>
                <Typography.Title>Online Timetable Generator</Typography.Title>
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi iure fugit, ut at! Corporis dolores iusto natus nobis quas dolorem accusantium beatae distinctio, necessitatibus ullam consequatur nemo accusamus, totam autem.</span>
              </Col>
              <Col span={8}>
                <Tabs type="card">
                  <Tabs.TabPane tab={<div className="auth-tab">Sign in</div>} key="1">
                    <Login/>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab={<div className="auth-tab">Register</div>} key="2">
                    <Register/>
                  </Tabs.TabPane>
                </Tabs>
              </Col>
            </Row>
          </Card>
        </div>
      </AppLayout>
    );
  }
}

const mapStateToProps = state => ({ loggedIn:state.auth.loggedIn });


export default connect(mapStateToProps, {})(Auth);
