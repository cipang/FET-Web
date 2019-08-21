import React from 'react';
import BottomNav from './commons/BottomNav';
import { Card, Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { updateFieldAuth, onRegister, startAsync } from '../actions';

class Register extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.startAsync();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      if (err) {
        console.log('Error ', values);
        return;
      } else {
        this.props.onRegister(values);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.props.auth.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.props.updateFieldAuth("confirmDirty", this.props.auth.confirmDirty || !!value);
  };


  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Card>
        <Form onSubmit={this.handleSubmit} >
          <Form.Item label="Email" className="adjust-margin">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                }, {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item hasFeedback label="Password" className="adjust-margin">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                }, {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item hasFeedback label="Confirm Password" className="adjust-margin">
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                }, {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur}/>)}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              loading={this.props.async.loading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  async: state.async
});

export default connect(
                  mapStateToProps,
                  { updateFieldAuth, onRegister, startAsync }
               )(Form.create()(Register));
