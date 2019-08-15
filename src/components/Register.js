import React from 'react';
import AppLayout from './layouts/AppLayout';
import BottomNav from './commons/BottomNav';
import { Card, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { updateFieldAuth, onRegister, startAsync } from '../actions';

class Register extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.handleSubmit = (e) => {
      e.preventDefault();
      props.startAsync();
      props.form.validateFields((err, values) => {
        console.log('Received values of form: ', values);
        if (err) {
          console.log('Error ', values);
          return;
        } else {
          props.onRegister(values);
        }
      });
    };

    this.compareToFirstPassword = (rule, value, callback) => {
      const { form } = props;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    };

    this.validateToNextPassword = (rule, value, callback) => {
      const { form } = props;
      if (value && props.auth.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };

    this.handleConfirmBlur = (e) => {
      const { value } = e.target;
      props.updateFieldAuth("confirmDirty", props.auth.confirmDirty || !!value);
    };

  }


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 16 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 32 },
        sm: { span: 18 },
      },
    };

    return (
      <AppLayout>
        <div className="container login-section">
          <Card title = "Register an account">
            <Form {...formItemLayout}>
            <Form.Item label="E-mail">
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
            <Form.Item label="Password" hasFeedback>
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
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  }, {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            </Form>
            <Form.Item>
              <BottomNav
                loading = {this.props.async.loading}
                goBackButtonText = {'Cancel'}
                goNextButtonText = {'Register'}
                goNext = {this.handleSubmit}
              />
            </Form.Item>
          </Card>
        </div>
      </AppLayout>
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
