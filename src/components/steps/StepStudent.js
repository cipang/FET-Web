import React from 'react';
import CommonStep from '../commons/CommonStep';
import { Row, Table, Divider, Button, Modal, Popconfirm, Input, Col} from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable, updateFieldStudents } from '../../actions';
import { addObject, getObject, delObject, generateKey } from '../../helper';

class Step3 extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Students',
        dataIndex: 'students',
        key: 'students',
        width: '38%',
        editable: true,
      },
      {
        title: 'Number',
        dataIndex: 'number',
        key: 'number',
        width: '12%',
        editable: true,
      },
      {
        title: 'Action',
        key: 'action',
        width: '50%',
        render: (text, record) => {
          return(
            <span>
              <Button onClick= {() => this.addSubgroup(text, record)}>Add Subgroup</Button>
              <Divider type="vertical" />
              {this.props.timetable.students.data.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                  <Button>Delete</Button>
                </Popconfirm>
              ) : null}

            </span>
          )
        }
      },
    ];
  };

  addSubgroup = (text, record) => {
    const { data, keyList } = this.props.timetable.students;
    const parentObject = getObject(data, record.key);
    let length = 0;

    if("children" in parentObject) {
      length = parentObject["children"].length;
    }

    let newKey = generateKey(keyList, record.key, length);
    let newObject = {
      key: newKey,
      students: null,
      number: null
    };

    this.props.updateFieldStudents("data", addObject(data, record.key, newObject));
    this.props.updateFieldStudents("keyList", [...keyList, newKey]);
  }

  handleDelete = key => {
    const { data, keyList } = this.props.timetable.students;
    this.props.updateFieldStudents("data", delObject(data, key));
    this.props.updateFieldStudents("keyList", keyList.filter(item => item !== key));
  }

  render() {
    const { data, keyList, selectedRowKeys } = this.props.timetable.students;
    const objectPrototype = { students: null, number: null };

    return (
      <CommonStep
        data = {data}
        keyList = {keyList}
        columns = {this.columns}
        selectedRowKeys = {selectedRowKeys}
        objectPrototype = {objectPrototype}
        updateField = {this.props.updateFieldStudents}
      />
    );
  }
}

const mapStateToProps = state => ({ timetable: state.listTimetables.newTimetable });


export default connect( mapStateToProps, { updateFieldTimetable, updateFieldStudents } )(Step3);
