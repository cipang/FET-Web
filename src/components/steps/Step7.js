import React from 'react';
import CommonStep from '../commons/CommonStep';
import { Popconfirm, Button, Radio } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable, updateFieldRooms, onSendTimetable } from '../../actions';
import { delObject, delObjects } from '../../helper';

class Step1 extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Room',
        dataIndex: 'room',
        key: 'room',
        width: '15%',
        editable: true,
      },
      {
        title: 'Capacity',
        dataIndex: 'capacity',
        key: 'capacity',
        width: '15%',
        editable: true,
      },
      {
        title: 'Building',
        key: 'building',
        width: '60%',
        render: (text, record) => {
          return(
            <span>
              {this.props.timetable.buildings.data.length >= 1 ?(
                <Radio.Group
                  buttonStyle="solid"
                  size="small"
                  value={this.findBuildingVal(record.key)}
                  onChange = {e => this.onUpdateBuilding(e, record.key)}
                >
                  {this.props.timetable.buildings.data.map(building =>
                    <Radio.Button key={building.key} value={building.building}>{building.building}</Radio.Button>
                  )}
                </Radio.Group>
              ):  <span> Create a building first! </span>  }

            </span>
          )
        }
      },
      {
        title: 'Action',
        key: 'action',
        width: '10%',
        render: (text, record) => {
          return(
            <span>
              {this.props.timetable.rooms.data.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                  <Button>Delete</Button>
                </Popconfirm>
              ) : null}
            </span>
          )
        }
      },
    ];
    this.goStep6 = () => {props.updateFieldTimetable("step",6);};
    this.goStep7 = () => {props.updateFieldTimetable("step",7);};
  }

  onUpdateBuilding = (e, key) => {
    const newData = this.props.timetable.rooms.data;
    const index = newData.findIndex(item => key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      building: e.target.value
    });
    this.props.updateFieldRooms("data", newData);
  }

    findBuildingVal = key => {
    const { data } = this.props.timetable.rooms;
    const index = data.findIndex(item => key === item.key);

    return data[index]["building"];
  }


  handleDelete = key => {
    let { data, keyList } = this.props.timetable.rooms;

    this.props.updateFieldRooms("data", delObject(data, key));
    this.props.updateFieldRooms("keyList", keyList.filter(item => item !== key));
  }

  render() {
    const { data, keyList, selectedRowKeys } = this.props.timetable.rooms;
    const objectPrototype = { room: null, capacity: 0, building:null };

    //TODO: remove plain fucntion on method
    return (
      <CommonStep
        data = {data}
        keyList = {keyList}
        columns = {this.columns}
        objectPrototype = {objectPrototype}
        selectedRowKeys = {selectedRowKeys}
        updateField = {this.props.updateFieldRooms}
        goBack = {this.goStep6}
        goNext = {this.goStep7}
      />
    );
  }
}

const mapStateToProps = state => ({ timetable: state.listTimetables.newTimetable });


export default connect( mapStateToProps, { updateFieldTimetable, updateFieldRooms, onSendTimetable } )(Step1);
