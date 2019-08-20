import React from 'react';
import BottomNav from '../commons/BottomNav';
import { Form, Icon, Input, Row ,Tooltip, Modal, Button } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable, updateFieldActivities } from '../../actions';

class Step1 extends React.Component {

  constructor(props) {
    super(props);
    this.goStep4 = () => {props.updateFieldTimetable("step",4);};
    this.goStep6 = () => {props.updateFieldTimetable("step",6);};
    console.log(this.props);
  }

  showModal = () => { this.props.updateFieldActivities("showModal", true); }
  closeModal = () => { this.props.updateFieldActivities("showModal", false); }

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
        <Modal
            title="Add students"
            visible={this.props.timetable.activities.showModal}
            onOk={this.showModal}
            onCancel={this.closeModal}
          >
          <Form {...formItemLayout}>
            <Form.Item label="Year">
              <Input style = {{width:'40%'}}/>
            </Form.Item>
            <Form.Item label="Number">
              <Input style = {{width:'40%'}}/>
            </Form.Item>
          </Form>
        </Modal>
        <Row className="mb-2">
          <Button onClick={this.showModal}>Add New</Button>
          <Button className="ml-3">Delete Selected</Button>
        </Row>

        <BottomNav
          loading = {false}
          goBackButtonText = {'Back'}
          goNextButtonText = {'Next'}
          goBack= {this.goStep4}
          goNext= {this.goStep6}
        />
      </Row>
    );
  }
}

const mapStateToProps = state => ({ timetable: state.timetable });


export default connect( mapStateToProps, { updateFieldTimetable, updateFieldActivities  } )(Step1);
