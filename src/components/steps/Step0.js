import React from 'react';
import BottomNav from '../commons/BottomNav';
import { Form, Icon, Input, Row, Tooltip, Select, Button } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable, updateFieldPeriods } from '../../actions';

class Step0 extends React.Component {

  renderNumerOfPeriods(){
    let options = [];
    for (let i = 1; i <= 24; i++) {
      options.push(<Select.Option value={i} key = {i}>{i}</Select.Option>)
    }
    return options;
  }

  goStep1 = () => this.props.updateFieldTimetable("step",1);

  nameOnChange = (e) => {
    this.props.updateFieldTimetable("name", e.target.value);
  }

  numberOfPeriodsOnChange = (value) => {
    this.props.updateFieldTimetable("numberOfPeriodsPerDay", value);
    let newPeriods = {};
    for (let i = 1; i <= value; i++) {
      newPeriods["period" + i.toString()] = "";
    }
    this.props.updateFieldTimetable("periods", newPeriods);

  }

  periodsOnChange = (e, id) => {
    this.props.updateFieldPeriods("period" + id.toString(), e.target.value);
  }

  checkDayType = (day) => {
    let days = [...this.props.timetable.days];
    if(days.includes(day)) {
      return "primary";
    }
    return "default";
  }

  addDay = (day) => {
    let days = [...this.props.timetable.days];
    if(days.includes(day)) {
      this.props.updateFieldTimetable("days", days.filter(item => item !== day));
    } else {
      days.push(day);
      this.props.updateFieldTimetable("days", days);
    }
  }

  renderPeriods() {
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
    console.log(this.props.timetable);
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
                          updateFieldPeriods } )(Step0);
