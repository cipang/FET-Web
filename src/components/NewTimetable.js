import React from 'react';
import AppLayout from './layouts/AppLayout';
import { Button, Card, Row, Col, Steps  } from 'antd';
import { connect } from 'react-redux';
import { onSaveTimetable, startAsync, updateFieldTimetable, onNewTimetable, updateFieldListTimetable } from '../actions';
import './NewTimetable.css';
import { stepsMappingDescriptions, stepsMappingObjects } from './steps/stepsMapping';


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
    return stepsMappingObjects[step.toString()].object;
  }

  onChange = current => this.props.updateFieldTimetable("step", current);

  render() {
    // console.log(this.props.async.loading);
    // console.log(new Date().toLocaleString());
    console.log("this.props.history",this.props.history);
    return (
      <AppLayout push={this.props.history.push}>
        <div className="container mt-5 pt-2 custom-width">
          <Card>
            <Row gutter={24} >
              <Col span={6}>
                <Steps
                  type="navigation"
                  current={this.props.timetable.step}
                  direction="vertical"
                  onChange={this.onChange}
                >
                  {Object.keys(stepsMappingDescriptions).map( key =>
                    <Steps.Step
                      title={"Step " + key}
                      key={key}
                      description={stepsMappingDescriptions[key].description}
                    />
                  )}
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
