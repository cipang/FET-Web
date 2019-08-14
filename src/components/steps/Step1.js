import React from 'react';
import BottomNav from '../commons/BottomNav';
import {Form, Icon, Input, Row ,Tooltip  } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable } from '../../actions';

class Step1 extends React.Component {

  constructor(props) {
    super(props);
    this.goStep0 = () => {props.updateFieldTimetable("step",0);};
    this.goStep2 = () => {props.updateFieldTimetable("step",2);};
    console.log(this.props);
  }

  render() {
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


export default connect( mapStateToProps, { updateFieldTimetable } )(Step1);
