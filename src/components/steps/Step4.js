import React from 'react';
import BottomNav from '../commons/BottomNav';
import EditableTable from '../commons/EditableTable';
import { Form, Icon, Input, Row ,Table, Button, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable, updateFieldTags } from '../../actions';
import { getObject, delObject, addObject, generateKey, updateObject, mapColumns } from '../../helper';

class Step1 extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Tag',
        dataIndex: 'tag',
        key: 'tag',
        editable: true,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          return(
            <span>
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
    this.goStep3 = () => {props.updateFieldTimetable("step",3);};
    this.goStep5 = () => {props.updateFieldTimetable("step",5);};
    console.log(this.props);
  }


  handleDelete = key => {
    const { data, keyList } = this.props.timetable.tags;
    this.props.updateFieldTags("data", delObject(data, key));
    this.props.updateFieldTags("keyList", keyList.filter(item => item.key !== key));
  }

  handleAdd = () => {
    const { data, keyList } = this.props.timetable.tags;
    let newKey = generateKey(keyList, data.length, 0);
    let newObject = {
      key: newKey,
      tag: null,
    };

    this.props.updateFieldTags("data", [...data, newObject]);
    this.props.updateFieldTags("keyList", [...keyList, newKey]);
  };

  handleSave = row => {
    const { data } = this.props.timetable.tags;
    this.props.updateFieldTags("data", updateObject(data, row.key, row));
  };

  render() {
    const { data } = this.props.timetable.tags;
    const columns = mapColumns(this.columns);
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };


    return (
      <Row>
        <Row className="mb-2">
          <Button onClick={this.handleAdd}>Add New</Button>
          <Button className="ml-3">Delete Selected</Button>
        </Row>
        <EditableTable
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
          handleSave={this.handleSave}
        />
        <BottomNav
          loading = {false}
          goBackButtonText = {'Back'}
          goNextButtonText = {'Next'}
          goBack= {this.goStep3}
          goNext= {this.goStep5}
        />
      </Row>
    );
  }
}

const mapStateToProps = state => ({ timetable: state.timetable });


export default connect( mapStateToProps, { updateFieldTimetable, updateFieldTags } )(Step1);
