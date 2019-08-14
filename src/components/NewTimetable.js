import React from 'react';
import AppLayout from './layouts/AppLayout';
import BottomNav from './commons/BottomNav';
import { Button, Card, Row, Col, Steps  } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable } from '../actions';
import Step0 from './steps/Step0';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';

class NewTimetable extends React.Component {

  renderSteps() {
    const { step } = this.props.timetable;
    if(step == 0){
      return <Step0 /> ;
    } else if(step == 1){
      return <Step1 / > ;
    } else if(step == 2){
      return <Step2 / > ;
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

export default connect( mapStateToProps, {})(NewTimetable);
