import React from 'react';
import CommonStep from '../commons/CommonStep';
import { Form, Icon, Input, Row , Button, Popconfirm } from 'antd';
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
  }


  handleDelete = key => {
    const { data, keyList } = this.props.timetable.tags;
    this.props.updateFieldTags("data", delObject(data, key));
    this.props.updateFieldTags("keyList", keyList.filter(item => item.key !== key));
  }

  render() {
    const { data, keyList } = this.props.timetable.tags;
    const objectPrototype = { tag: null };
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
      <CommonStep
        data = {data}
        keyList = {keyList}
        columns = {this.columns}
        rowSelection = {rowSelection}
        objectPrototype = {objectPrototype}
        updateField = {this.props.updateFieldTags}
        goBack = {this.goStep3}
        goNext = {this.goStep5}
      />
    );
  }
}

const mapStateToProps = state => ({ timetable: state.timetable });


export default connect( mapStateToProps, { updateFieldTimetable, updateFieldTags } )(Step1);
