import React from 'react';
import BottomNav from '../commons/BottomNav';
import EditableTable from '../commons/EditableTable';
import { Form, Row, Table, Divider, Button, Modal, Popconfirm, Input, Col,Card } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable, updateFieldYears } from '../../actions';
import { getObject, delObject, addObject, generateKey, updateObject } from '../../helper';

class Step3 extends React.Component {

  constructor(props) {
    super(props);
    this.goStep2 = () => {props.updateFieldTimetable("step",2);};
    this.goStep4 = () => {props.updateFieldTimetable("step",4);};
    this.showModal = () => { props.updateFieldYears("visibility", true); }
    this.closeModal = () => { props.updateFieldYears("visibility", false); }
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
    this.props.updateFieldYears("keyList", keyList.filter(item => item.key !== key));
  }

  handleAdd = () => {
    const { data, keyList } = this.props.timetable.years;
    let newKey = generateKey(keyList, data.length, 0);
    let newObject = {
      key: newKey,
      year: null,
      number: null
    };

    this.props.updateFieldYears("data", [...data, newObject]);
    this.props.updateFieldYears("keyList", [...keyList, newKey]);
  };

  handleSave = row => {
    const { data } = this.props.timetable.years;
    this.props.updateFieldYears("data", updateObject(data, row.key, row));
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 16 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 32 },
        sm: { span: 18 },
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          title: col.title
        }),
      };
    });

    const { data } = this.props.timetable.years;

    // rowSelection objects indicates the need for row selection
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
        <Modal
            title="Add students"
            visible={this.props.timetable.years.visibility}
            onOk={this.showModal}
            onCancel={this.closeModal}
          >
          <Form {...formItemLayout}>
            <Form.Item label="Year">
              <Input style = {{width:'40%'}}/>
            </Form.Item>
            <Form.Item label="Number">
              <Input style = {{width:'40%'}}/>
            </Form.Item>
          </Form>
        </Modal>
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
          goBack= {this.goStep2}
          goNext= {this.goStep4}
        />
      </Row>
    );
  }
}

const mapStateToProps = state => ({ timetable: state.timetable });


export default connect( mapStateToProps, { updateFieldTimetable, updateFieldYears } )(Step3);
