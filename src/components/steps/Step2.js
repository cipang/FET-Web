import React from 'react';
import CommonStep from '../commons/CommonStep';
import { Popconfirm, Button } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable, updateFieldTeachers } from '../../actions';
import { delObject } from '../../helper';

class Step1 extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Teacher',
        dataIndex: 'teacher',
        key: 'teacher',
        editable: true,
      },
      {
        title: 'Target Number Of Hours',
        dataIndex: 'targetNumberOfHours',
        key: 'targetNumberOfHours',
        editable: true,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          return(
            <span>
              {this.props.timetable.teachers.data.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                  <Button>Delete</Button>
                </Popconfirm>
              ) : null}
            </span>
          )
        }
      },
    ];
    this.goStep1 = () => {props.updateFieldTimetable("step",1);};
    this.goStep3 = () => {props.updateFieldTimetable("step",3);};
  }


  handleDelete = key => {
    const { data, keyList } = this.props.timetable.teachers;
    this.props.updateFieldTeachers("data", delObject(data, key));
    this.props.updateFieldTeachers("keyList", keyList.filter(item => item !== key));
  }

  render() {
    const { data, keyList, selectedRowKeys } = this.props.timetable.teachers;
    const objectPrototype = { teacher: null, targetNumberOfHours: 0 };

    return (
      <CommonStep
        data = {data}
        keyList = {keyList}
        columns = {this.columns}
        selectedRowKeys = {selectedRowKeys}
        objectPrototype = {objectPrototype}
        updateField = {this.props.updateFieldTeachers}
        goBack = {this.goStep1}
        goNext = {this.goStep3}
      />
    );
  }
}

const mapStateToProps = state => ({ timetable: state.timetable });


export default connect( mapStateToProps, { updateFieldTimetable, updateFieldTeachers } )(Step1);
