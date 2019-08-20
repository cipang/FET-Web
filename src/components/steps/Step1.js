import React from 'react';
import CommonStep from '../commons/CommonStep';
import { Popconfirm, Button } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable, updateFieldSubjects } from '../../actions';
import { delObject, delObjects } from '../../helper';

class Step1 extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Subject',
        dataIndex: 'subject',
        key: 'subject',
        editable: true,
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
    this.goStep0 = () => {props.updateFieldTimetable("step",0);};
    this.goStep2 = () => {props.updateFieldTimetable("step",2);};
  }


  handleDelete = key => {
    let { data, keyList } = this.props.timetable.subjects;

    this.props.updateFieldSubjects("data", delObject(data, key));
    this.props.updateFieldSubjects("keyList", keyList.filter(item => item !== key));
  }

  render() {
    const { data, keyList, selectedRowKeys } = this.props.timetable.subjects;
    const objectPrototype = { tag: null };

    return (
      <CommonStep
        data = {data}
        keyList = {keyList}
        columns = {this.columns}
        objectPrototype = {objectPrototype}
        selectedRowKeys = {selectedRowKeys}
        updateField = {this.props.updateFieldSubjects}
        goBack = {this.goStep0}
        goNext = {this.goStep2}
      />
    );
  }
}

const mapStateToProps = state => ({ timetable: state.timetable });


export default connect( mapStateToProps, { updateFieldTimetable, updateFieldSubjects } )(Step1);
