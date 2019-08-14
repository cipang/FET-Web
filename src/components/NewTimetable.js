import React from 'react';
import AppLayout from './layouts/AppLayout';
import BottomNav from './commons/BottomNav';
import { Button, Card, Form, Icon, Input, Row, Col, Steps,Tooltip  } from 'antd';

class Explore extends React.Component {

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
    const current = 1;
    return (
      <AppLayout>
        <div className="container login-section">
          <Card>
            <Row gutter={24} >
              <Col span={6}>
                <Steps current={current} direction="vertical">
                  <Steps.Step title="Step 1" description="This is a description." />
                  <Steps.Step title="Step 2" description="This is a description." />
                  <Steps.Step title="Step 3" description="This is a description." />
                </Steps>
              </Col>
              <Col span={18}>
                <Card title = "New Timetable">
                  <Form {...formItemLayout}>
                    <Form.Item
                      label={
                        <span>
                          Institution Name&nbsp;
                          <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" />
                          </Tooltip>
                        </span>
                      }
                    >
                      {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                      })(<Input />)}
                    </Form.Item>
                  </Form>
                  <BottomNav
                    loading = {false}
                    goBackButtonText = {'Back'}
                    goNextButtonText = {'Next'}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </div>
      </AppLayout>
    );
  }
}

export default Form.create()(Explore);
