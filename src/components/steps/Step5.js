import React from 'react';
import BottomNav from '../commons/BottomNav';
import {Form, Icon, Input, Row ,Tooltip  } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable } from '../../actions';

class Step1 extends React.Component {

  constructor(props) {
    super(props);
    this.goStep3 = () => {props.updateFieldTimetable("step",3);};
    this.goStep5 = () => {props.updateFieldTimetable("step",5);};
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
          goBack= {this.goStep3}
          goNext= {this.goStep5}
        />
      </Row>
    );
  }
}

const mapStateToProps = state => ({ timetable: state.timetable });


export default connect( mapStateToProps, { updateFieldTimetable } )(Step1);
