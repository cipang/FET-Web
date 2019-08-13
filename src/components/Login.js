import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AppLayout from './layouts/AppLayout';
import { Button, Card, Form, Icon, Input, Row } from 'antd';
import { connect } from 'react-redux';
import { onLogin, startAsync } from '../actions';
import './login.css';


class Login extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = (e) => {
      e.preventDefault();
      props.startAsync();
      props.form.validateFields((err, values) => {
        console.log('Received values of form: ', values);
        if (err) {
          console.log('Error ', values);
          formIsValid = false;
          return;
        } else {
          props.onLogin(values);
        }
      });
    };
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const emailIcon = <Icon
                        type="mail"
                        style={{ color: 'rgba(0,0,0,.25)'}}
                      />;
    const passwordIcon = <Icon
                        type="lock"
                        style={{ color: 'rgba(0,0,0,.25)'}}
                      />;
    // Todo: responsive margin top
    return(
      <AppLayout>
        <div className="container login-section"  style={{ width: 450 }}>
          <Card title="Account Login">
            <Form  className="login-form" onSubmit = {this.handleSubmit} >
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your email!' }],
                })(
                  <Input prefix={emailIcon} size="large"  placeholder="email" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your password!' }],
                })(
                  <Input prefix={passwordIcon} size="large" type="password" placeholder="password" />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                  loading={ this.props.async.loading }
                >
                  Log in
                </Button>
              </Form.Item>
              Or <Link to="/register">register now!</Link>
            </Form>
          </Card>
        </div>
      </AppLayout>
    );
  }
}

const mapStateToProps = state => ({ async: state.async });

export default connect(
                  mapStateToProps,
                  { onLogin, startAsync }
               )(Form.create()(Login));
