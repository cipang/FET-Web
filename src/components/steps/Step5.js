import React from 'react';
import BottomNav from '../commons/BottomNav';
import { Form, Icon, Input, Row ,Table, Button, Popconfirm, Modal } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable, updateFieldActivities } from '../../actions';

class Step1 extends React.Component {

  constructor(props) {
    super(props);
    this.goStep4 = () => this.props.updateFieldTimetable("step",4);
    this.goStep6 = () => this.props.updateFieldTimetable("step",6);
    this.showModal = () => this.props.updateFieldActivities("showModal", true);
    this.closeModal = () => this.props.updateFieldActivities("showModal", false);
    console.log(this.props);
  }



  render() {
    const { years, tags, teachers } = this.props.timetable;
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
    const columnsTags = [
      {
        title: 'Tag',
        dataIndex: 'tag',
        key: 'tag',
      },
    ]
    return (
      <Row>
        <Modal
            title="Add students"
            visible={this.props.timetable.activities.showModal}
            onOk={this.showModal}
            onCancel={this.closeModal}
          >
          <Table
            size = "small"
            columns = {columnsTags}
            dataSource= {tags.data}
          />
          <Table
            size = "small"
            columns = {columnsTags}
            dataSource= {tags.data}
          />
          <Table
            size = "small"
            columns = {columnsTags}
            dataSource= {tags.data}
          />
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
