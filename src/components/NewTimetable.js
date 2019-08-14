import React from 'react';
import AppLayout from './layouts/AppLayout';
import BottomNav from './commons/BottomNav';
import { Button, Card, Form, Icon, Input, Row, Col, Steps,Tooltip  } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable } from '../actions';

class NewTimetable extends React.Component {

  constructor(props) {
    super(props);
    this.goStep0 = () => {props.updateFieldTimetable("step",0);};
    this.goStep1 = () => {props.updateFieldTimetable("step",1);};
    this.goStep2 = () => {props.updateFieldTimetable("step",2);};
    this.goStep3 = () => {props.updateFieldTimetable("step",3);};
    console.log(this.props);
  }

  renderStep0() {
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
      <Row>
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
          goBackButtonText = {'Cancel'}
          goNextButtonText = {'Next'}
          goNext= {this.goStep1}
        />
      </Row>
    );
  }

  renderStep1() {
    return (
      <Row>
        <BottomNav
          loading = {false}
          goBackButtonText = {'Back'}
          goNextButtonText = {'Next'}
          goBack= {this.goStep0}
          goNext= {this.goStep2}
        />
      </Row>
    );
  }

  renderStep2() {
    return (
      <Row>
        <BottomNav
          loading = {false}
          goBackButtonText = {'Back'}
          goNextButtonText = {'Next'}
          goBack= {this.goStep1}
          goNext= {this.goStep3}
        />
      </Row>
    );
  }

  renderSteps() {
    const { step } = this.props.timetable;
    if(step == 0){
      return this.renderStep0() ;
    } else if(step == 1){
      return this.renderStep1() ;
    } else if(step == 2){
      return this.renderStep2() ;
    }
  }

  render() {
    const current = 1;
    return (
      <AppLayout>
        <div className="container login-section">
          <Card>
            <Row gutter={24} >
              <Col span={6}>
                <Steps current={this.props.timetable.step} direction="vertical">
                  <Steps.Step title="Step 1" description="This is a description." />
                  <Steps.Step title="Step 2" description="This is a description." />
                  <Steps.Step title="Step 3" description="This is a description." />
                </Steps>
              </Col>
              <Col span={18}>
                <Card title = "New Timetable">
                   {this.renderSteps()}
                </Card>
              </Col>
            </Row>
          </Card>
        </div>
      </AppLayout>
    );
  }
}


const mapStateToProps = state => ({ timetable: state.timetable });

export default connect(
                  mapStateToProps,
                  { updateFieldTimetable }
               )(Form.create()(NewTimetable));
