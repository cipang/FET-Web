import React from 'react';
import BottomNav from '../commons/BottomNav';
import {Form, Icon, Input, Row, Tooltip, Select, Button  } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable,
         updateFieldDays,
         updateFieldPeriods } from '../../actions';

class Step0 extends React.Component {

  constructor(props) {
    super(props);
    this.goStep1 = () => {props.updateFieldTimetable("step",1);};
    this.nameOnChange = (e) => {
      props.updateFieldTimetable("name", e.target.value);
    };
    this.numberOfPeriodsOnChange = (value) => {
      props.updateFieldTimetable("numberOfPeriodsPerDay", value);
    };
    this.periodsOnChange = (e, id) => {
      props.updateFieldPeriods("period" + id.toString(), e.target.value);
    };
  }

  renderNumerOfPeriods(){
    let options = [];
    for (let i = 1; i <= 24; i++) {
      options.push(<Select.Option value={i} key = {i}>{i}</Select.Option>)
    }
    return options;
  }

  checkDayType = (day) => {
    let days = [...this.props.timetable.days];
    console.log(day);
    if(days.includes(day)) {
      return "primary";
    }
    return "default";
  }

  addDay = (day) => {
    let days = [...this.props.timetable.days];
    if(days.includes(day)) {
      console.log(days.filter(item => item !== day));
      this.props.updateFieldTimetable("days", days.filter(item => item !== day));
    } else {
      days.push(day);
      this.props.updateFieldTimetable("days", days);
    }
  }

  renderPeriods(){
    let periods = [];
    // @ Todo : bind this function
    for (let i = 1; i <= this.props.timetable.numberOfPeriodsPerDay; i++) {
      periods.push(
        <Row key = {i}>period {i} =>
          <Input
            key = {i}
            value={this.props.timetable.periods["period" + i.toString()]}
            onChange={(e) => this.periodsOnChange(e,i)}
            style={{ width: '50%' }}
          />
        </Row>
      );
    }
    return periods;
  }

  render() {
    const { name, numberOfPeriodsPerDay } = this.props.timetable;
    const {monday, tuesday, wednesday, thursday, friday, saturday, sunday} =
          this.props.timetable.days;
    const daysData = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
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
            <Input onChange={this.nameOnChange} value={name}/>
          </Form.Item>
          <Form.Item label= "Working Days">
            <Row>
              {daysData.map(eachDay =>
                 (<Button
                     key={eachDay}
                     onClick={() => this.addDay(eachDay)}
                     type={this.checkDayType(eachDay)}
                     value={eachDay}
                   >
                    {eachDay}
                 </Button>)
              )}
            </Row>
          </Form.Item>
          <Form.Item label= "Number of Periods(per day)">
            <Select
              value={numberOfPeriodsPerDay}
              style={{ width: 120 }}
              onChange = {this.numberOfPeriodsOnChange}
             >
              {this.renderNumerOfPeriods()}
            </Select>
          </Form.Item>
          <Form.Item label= "Periods">
            {this.renderPeriods()}
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
}

const mapStateToProps = state => ({ timetable: state.listTimetables.newTimetable });

export default connect( mapStateToProps,
                        { updateFieldTimetable,
                          updateFieldDays,
                          updateFieldPeriods } )(Step0);
