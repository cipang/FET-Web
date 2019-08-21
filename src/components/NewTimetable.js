import React from 'react';
import AppLayout from './layouts/AppLayout';
import { Button, Card, Row, Col, Steps  } from 'antd';
import { connect } from 'react-redux';
import { onSaveTimetable, startAsync, updateFieldTimetable, onNewTimetable, updateFieldListTimetable } from '../actions';
import Step0 from './steps/Step0';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import Step6 from './steps/Step6';
import Step7 from './steps/Step7';

class NewTimetable extends React.Component {

  constructor(props) {
    super(props);
    this.onSaveTimetable = this.saveTimetable.bind(this);
  }

  saveTimetable(e) {
    e.preventDefault();
    this.props.startAsync();
    this.props.onSaveTimetable(this.props.timetable);
  }

  componentDidMount() {
    if(!this.props.timetable){
      this.props.onNewTimetable();
    } else {
      this.props.updateFieldListTimetable("newTimetable",this.props.timetable);
    }
  }

  renderSteps() {
    const { step } = this.props.timetable;
    if(step === 0){
      return <Step0/> ;
    } else if(step === 1){
      return <Step1/> ;
    } else if(step === 2){
      return <Step2/> ;
    } else if(step === 3){
      return <Step3/> ;
    } else if(step === 4){
      return <Step4/> ;
    } else if(step === 5){
      return <Step5/> ;
    } else if(step === 6){
      return <Step6/> ;
    } else if(step === 7){
      return <Step7/> ;
    }
  }

  onChange = current => this.props.updateFieldTimetable("step", current);

  render() {
    // console.log(this.props.async.loading);
    // console.log(new Date().toLocaleString());
    return (
      <AppLayout history={this.props.history}>
        <div className="container mt-5 pt-2">
          <Card>
            <Row gutter={24} >
              <Col span={6}>
                <Steps
                  type="navigation"
                  current={this.props.timetable.step}
                  direction="vertical"
                  onChange={this.onChange}
                >
                  <Steps.Step title="Step 1" description="Name and time." />
                  <Steps.Step title="Step 2" description="Add subjects." />
                  <Steps.Step title="Step 3" description="Add teachers." />
                  <Steps.Step title="Step 4" description="Add students in years(groups)." />
                  <Steps.Step title="Step 5" description="Add activity tags." />
                  <Steps.Step title="Step 6" description="Add activities." />
                  <Steps.Step title="Step 7" description="Add buildings." />
                  <Steps.Step title="Step 8" description="Add rooms." />
                </Steps>
              </Col>
              <Col span={18}>
              <Card title = {<div>
                              <span>New Timetable</span>
                              <Button
                                style = {{float: 'right'}}
                                onClick = {this.onSaveTimetable}
                                loading = {this.props.async.loading }
                              > Save</Button>
                            </div>}>
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

const mapStateToProps = state => ({ timetable: state.listTimetables.newTimetable, async: state.async, listTimetables: state.listTimetables });

export default connect( mapStateToProps, { onSaveTimetable, startAsync, updateFieldTimetable, onNewTimetable, updateFieldListTimetable })(NewTimetable);
