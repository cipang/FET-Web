import React from 'react';
import CommonStep from '../commons/CommonStep';
import { Popconfirm, Button, Select } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable, updateFieldSubjects } from '../../actions';
import { delObject, delObjects, updateObject } from '../../helper';

class Step1 extends React.Component {

  constructor(props) {
    super(props);
    this.roomsData = this.props.timetable.rooms.data;
    this.columns = [
      {
        title: 'Subject',
        dataIndex: 'subject',
        key: 'subject',
        editable: true,
      },
      {
        title: 'Preferred Room',
        dataIndex: 'room',
        key: 'room',
        render: (text, record) => (
          <Select
            style={{ width: 120 }}
            value={text}
            onChange={ (val) => this.updatePreferredRoom(record, val)}
          >
            {this.renderRoomOptions()}
          </Select>
        )
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

  renderRoomOptions = () => {
    const roomOptions = [];
    this.roomsData.map(room => {
      roomOptions.push(
        <Select.Option key={room.key} value={room.room}>{room.room}</Select.Option>
      );
    })
    return roomOptions;
  }

  updatePreferredRoom = (record, newRoom) => {
    const { data } = this.props.timetable.subjects;
    this.props.updateFieldSubjects(
      "data", updateObject(data, record.key, {...record, room:newRoom})
    );
  }

  handleDelete = key => {
    let { data, keyList } = this.props.timetable.subjects;

    this.props.updateFieldSubjects("data", delObject(data, key));
    this.props.updateFieldSubjects("keyList", keyList.filter(item => item !== key));
  }

  render() {
    const { data, keyList, selectedRowKeys } = this.props.timetable.subjects;
    let roomName = null;
    if(this.roomsData[0]) {
      let roomName = this.roomsData[0].room;
    }
    const objectPrototype = { subject: null, room: roomName };

    return (
      <CommonStep
        data = {data}
        keyList = {keyList}
        columns = {this.columns}
        objectPrototype = {objectPrototype}
        selectedRowKeys = {selectedRowKeys}
        updateField = {this.props.updateFieldSubjects}
      />
    );
  }
}

const mapStateToProps = state => ({ timetable: state.listTimetables.newTimetable });


export default connect( mapStateToProps, { updateFieldTimetable, updateFieldSubjects } )(Step1);
