import React from 'react';
import BottomNav from '../commons/BottomNav';
import {Form, Icon, Input, Row, Tooltip, Radio, Button  } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable, updateFieldDays } from '../../actions';

class Step0 extends React.Component {

  constructor(props) {
    super(props);
    this.goStep1 = () => {props.updateFieldTimetable("step",1);};
    this.nameOnChange = (e) => {
      props.updateFieldTimetable("name", e.target.value);
    };
    this.addMonday = (e) => { this.addDays(e.target.value,"monday") };
    this.addTuesday = (e) => { this.addDays(e.target.value,"tuesday") };
    this.addWednesday = (e) => { this.addDays(e.target.value,"wednesday") };
    this.addThursday = (e) => { this.addDays(e.target.value,"thursday") };
    this.addFriday = (e) => { this.addDays(e.target.value,"friday") };
    this.addSaturday = (e) => { this.addDays(e.target.value,"saturday") };
    this.addSunday = (e) => { this.addDays(e.target.value,"sunday") };
    console.log(this.props);
  }

  addDays(type,day){
    if(type === "default"){
      this.props.updateFieldDays(day, "primary");
    }else{
      this.props.updateFieldDays(day, "default");
    }
  }

  render() {
    const { name } = this.props.timetable;
    const {monday, tuesday, wednesday, thursday, friday, saturday, sunday} =
          this.props.timetable.days;
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
              <Button onClick={this.addMonday} type={monday} value={monday}>Monday</Button>
              <Button onClick={this.addTuesday} type={tuesday} value={tuesday}>Tuesday</Button>
              <Button onClick={this.addWednesday} type={wednesday} value={wednesday}>Wednesday </Button>
              <Button onClick={this.addThursday} type={thursday} value={thursday}>Thursday</Button>
              <Button onClick={this.addFriday} type={friday} value={friday}>Friday </Button>
              <Button onClick={this.addSaturday} type={saturday} value={saturday}>Saturday </Button>
              <Button onClick={this.addSunday} type={sunday} value={sunday}>Sunday </Button>
            </Row>
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

const mapStateToProps = state => ({ timetable: state.timetable });


export default connect( mapStateToProps,
              { updateFieldTimetable, updateFieldDays } )(Step0);
