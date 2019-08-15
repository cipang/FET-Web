import React from 'react';
import BottomNav from '../commons/BottomNav';
import {Form, Icon, Input, Row, Button  } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable, updateFieldTeachers } from '../../actions';


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
}

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

class Step2 extends React.Component {

  constructor(props) {
    super(props);
    this.goStep1 = () => {props.updateFieldTimetable("step",1);};
    this.goStep3 = () => {props.updateFieldTimetable("step",3);};
    this.addTeacher = () => {
      let num = Object.keys(this.props.timetable.teachers).length+1;
      while(this.props.timetable.teachers["teacher_"+num.toString()] != null){
        num++;
      }
      props.updateFieldTeachers("teacher_"+num.toString(),"");
    }
    this.onTeacherChange = (e, teacher) => {
      props.updateFieldTeachers(teacher, e.target.value);
    }
    this.removeTeacher = (teacher) => {
      let { [teacher]:value, ...rest } = this.props.timetable.teachers;
      props.updateFieldTimetable("teachers", rest);
    }
    // this.rmTeacher;
    console.log(this.props);
  }

  renderTeachers() {
    const { teachers } = this.props.timetable;
    let teachersItems = [];
    let count = 0;
    Object.keys(teachers).map(teacher => {
      teachersItems.push(
      <Form.Item
        {...(count === 0  ? formItemLayout : formItemLayoutWithOutLabel)}
        label={count  === 0 ? 'Teachers' : ''}
        required={false}
        key={teacher}
      >
        <Input
          value={teachers[teacher]["name"]}
          placeholder="Teacher Name"
          onChange={(e) => this.onTeacherChange(e,teacher)}
          style={{ width: '30%', marginRight: 8 }}
        />
        <Input
          value={teachers[teacher]["targetNumberOfHours"]}
          placeholder="Target number of hours default is 0"
          onChange={(e) => this.onTeacherChange(e,teacher)}
          style={{ width: '30%', marginRight: 8 }}
        />
        {count >= 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.removeTeacher(teacher)}
          />
        ) : null}
      </Form.Item>);
      count++;
    });
    return teachersItems;
  }

  render(){

    return (
      <Row>
        <Form>
          {this.renderTeachers()}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed"  onClick={this.addTeacher} style={{ width: '60%' }}>
              <Icon type="plus" /> Add field
            </Button>
          </Form.Item>
        </Form>
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
}

const mapStateToProps = state => ({ timetable: state.timetable });


export default connect( mapStateToProps, { updateFieldTimetable, updateFieldTeachers } )(Step2);
