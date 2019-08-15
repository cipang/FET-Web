import React from 'react';
import BottomNav from '../commons/BottomNav';
import {Form, Icon, Input, Row ,Tooltip, Button  } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable, rmSubject, updateFieldSubjects } from '../../actions';


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

class Step1 extends React.Component {

  constructor(props) {
    super(props);
    this.goStep0 = () => {props.updateFieldTimetable("step",0);};
    this.goStep2 = () => {props.updateFieldTimetable("step",2);};
    this.addSubject = () => {
      let num = Object.keys(this.props.timetable.subjects).length+1;
      while(this.props.timetable.subjects["subject_"+num.toString()] != null){
        num++;
      }
      props.updateFieldSubjects("subject_"+num.toString(),"");
    }
    this.onSubjectChange = (e, subject) => {
      props.updateFieldSubjects(subject, e.target.value);
    }
    this.removeSubject = (subject) => {
      let { [subject]:value, ...rest } = this.props.timetable.subjects;
      props.updateFieldTimetable("subjects", rest);
    }
    // this.rmSubject;
    console.log(this.props);
  }

  renderSubjects() {
    const { subjects } = this.props.timetable;
    const { getFieldDecorator } = this.props.form;
    let subjectsItems = [];
    let count = 0;
    Object.keys(subjects).map(subject => {
      subjectsItems.push(
      <Form.Item
        {...(count === 0  ? formItemLayout : formItemLayoutWithOutLabel)}
        label={count  === 0 ? 'Subjects' : ''}
        required={false}
        key={subject}
      >
        {getFieldDecorator(subject, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input subject's name or delete this field.",
            },
          ],
        })(<Input
              placeholder="Subjet Name"
              onChange={(e) => this.onSubjectChange(e,subject)}
              style={{ width: '60%', marginRight: 8 }}
            />)
        }
        {count >= 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.removeSubject(subject)}
          />
        ) : null}
      </Form.Item>);
      count++;
    });
    return subjectsItems;
  }

  render(){

    return (
      <Row>
        <Form>
          {this.renderSubjects()}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed"  onClick={this.addSubject} style={{ width: '60%' }}>
              <Icon type="plus" /> Add field
            </Button>
          </Form.Item>
        </Form>
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
}

const mapStateToProps = state => ({ timetable: state.timetable });


export default connect( mapStateToProps, { updateFieldTimetable, rmSubject, updateFieldSubjects } )(Form.create()(Step1));
