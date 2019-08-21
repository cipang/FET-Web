import React from 'react';
import CommonStep from '../commons/CommonStep';
import { Popconfirm, Button } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable, updateFieldBuildings } from '../../actions';
import { delObject, delObjects } from '../../helper';

class Step1 extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Building',
        dataIndex: 'building',
        key: 'building',
        editable: true,
      },
      {
        title: 'Capacity',
        dataIndex: 'capacity',
        key: 'capacity',
        editable: true,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          return(
            <span>
              {this.props.timetable.buildings.data.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                  <Button>Delete</Button>
                </Popconfirm>
              ) : null}
            </span>
          )
        }
      },
    ];
    this.goStep5 = () => {props.updateFieldTimetable("step",5);};
    this.goStep7 = () => {props.updateFieldTimetable("step",7);};
  }


  handleDelete = key => {
    let { data, keyList } = this.props.timetable.buildings;

    this.props.updateFieldBuildings("data", delObject(data, key));
    this.props.updateFieldBuildings("keyList", keyList.filter(item => item !== key));
  }

  render() {
    const { data, keyList, selectedRowKeys } = this.props.timetable.buildings;
    const objectPrototype = { building: null, capacity: 100 };

    return (
      <CommonStep
        data = {data}
        keyList = {keyList}
        columns = {this.columns}
        objectPrototype = {objectPrototype}
        selectedRowKeys = {selectedRowKeys}
        updateField = {this.props.updateFieldBuildings}
        goBack = {this.goStep5}
        goNext = {this.goStep7}
      />
    );
  }
}

const mapStateToProps = state => ({ timetable: state.listTimetables.newTimetable });


export default connect( mapStateToProps, { updateFieldTimetable, updateFieldBuildings } )(Step1);
