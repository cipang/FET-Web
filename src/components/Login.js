import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Card, Form, Checkbox, Input } from 'antd';
import { connect } from 'react-redux';
import { onLogin, startAsync } from '../actions';
import './login.css';


class Login extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.startAsync();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      if (err) {
        console.log('Error ', values);
        return;
      } else {
        this.props.onLogin(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    // Todo: responsive margin top
    return(
      <Card>
        <Form  className="login-form" onSubmit={this.handleSubmit} >
          <Form.Item label="Email" className="adjust-margin">
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="Password" className="adjust-margin">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!' }],
            })(
              <Input type="password" />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              loading={ this.props.async.loading }
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

const mapStateToProps = state => ({ async: state.async });

export default connect(
                  mapStateToProps,
                  { onLogin, startAsync }
               )(Form.create()(Login));
