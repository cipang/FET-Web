import React from 'react';
import CommonStep from '../commons/CommonStep';
import { Row, Table, Divider, Button, Modal, Popconfirm, Input, Col} from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable, updateFieldYears } from '../../actions';
import { addObject, getObject, delObject, generateKey } from '../../helper';

class Step3 extends React.Component {

  constructor(props) {
    super(props);
    this.goStep2 = () => {props.updateFieldTimetable("step",2);};
    this.goStep4 = () => {props.updateFieldTimetable("step",4);};
    this.columns = [
      {
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
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
              {this.props.timetable.years.data.length >= 1 ? (
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

  addSubgroup = (text, record) => {
    const { data, keyList } = this.props.timetable.years;
    const parentObject = getObject(data, record.key);
    let length = 0;

    if("children" in parentObject) {
      length = parentObject["children"].length;
    }

    let newKey = generateKey(keyList, record.key, length);
    let newObject = {
      key: newKey,
      year: null,
      number: null
    };

    this.props.updateFieldYears("data", addObject(data, record.key, newObject));
    this.props.updateFieldYears("keyList", [...keyList, newKey]);
  }

  handleDelete = key => {
    const { data, keyList } = this.props.timetable.years;
    this.props.updateFieldYears("data", delObject(data, key));
    this.props.updateFieldYears("keyList", keyList.filter(item => item !== key));
  }

  render() {
    const { data, keyList, selectedRowKeys } = this.props.timetable.years;
    const objectPrototype = { year: null, number: null };

    return (
      <CommonStep
        data = {data}
        keyList = {keyList}
        columns = {this.columns}
        selectedRowKeys = {selectedRowKeys}
        objectPrototype = {objectPrototype}
        updateField = {this.props.updateFieldYears}
        goBack = {this.goStep2}
        goNext = {this.goStep4}
      />
    );
  }
}

const mapStateToProps = state => ({ timetable: state.listTimetables.newTimetable });


export default connect( mapStateToProps, { updateFieldTimetable, updateFieldYears } )(Step3);
