import React from 'react';
import CommonStep from '../commons/CommonStep';
import SpaceConstraint from '../commons/SpaceConstraint';
import { Popconfirm, Button, Modal } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable, updateFieldSubjects } from '../../actions';
import { delObject, delObjects } from '../../helper';

class Step1 extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Constraint',
        dataIndex: 'constraint',
        key: 'constraint',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          return(
            <span>
              {this.props.timetable.subjects.data.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                  <Button>Delete</Button>
                </Popconfirm>
              ) : null}
            </span>
          )
        }
      },
    ];
  }

  goStep7 = () => this.props.updateFieldTimetable("step",7);

  showModal = () => this.props.updateFieldTimetable("showSpaceConstraintModal", true);

  closeModal = () => this.props.updateFieldTimetable("showSpaceConstraintModal", false);

  handleDelete = key => {
    let { data, keyList } = this.props.timetable.subjects;

    this.props.updateFieldSubjects("data", delObject(data, key));
    this.props.updateFieldSubjects("keyList", keyList.filter(item => item !== key));
  }

  render() {
    const { data, keyList, selectedRowKeys } = this.props.timetable.subjects;
    const objectPrototype = { subject: null };

    return (
      <div>
        <Modal
            title="Add students"
            visible={this.props.timetable.showSpaceConstraintModal}
            onOk={this.handleAdd}
            onCancel={this.closeModal}
            width="1000px"
          >
          <SpaceConstraint/>
        </Modal>
        <CommonStep
          data = {data}
          keyList = {keyList}
          handleAdd = {this.showModal}
          columns = {this.columns}
          objectPrototype = {objectPrototype}
          selectedRowKeys = {selectedRowKeys}
          goBack = {this.goStep7}
          goNext = {this.goStep7}
        />
      </div>

    );
  }
}

const mapStateToProps = state => ({ timetable: state.listTimetables.newTimetable });


export default connect( mapStateToProps, { updateFieldTimetable, updateFieldSubjects } )(Step1);
