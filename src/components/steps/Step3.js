import React from 'react';
import BottomNav from '../commons/BottomNav';
import EditableTable from '../commons/EditableTable';
import { Form, Row, Table, Divider, Button, Modal, Popconfirm, Input, Col,Card } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable, updateFieldYears } from '../../actions';

class Step3 extends React.Component {

  constructor(props) {
    super(props);
    this.goStep0 = () => {props.updateFieldTimetable("step",0);};
    this.goStep2 = () => {props.updateFieldTimetable("step",2);};
    this.showModal = () => { props.updateFieldYears("visibility", true); }
    this.closeModal = () => { props.updateFieldYears("visibility", false); }
    this.addSubgroup = (text, record) => {
      console.log(text.target, record);
    }
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
          console.log(record)
          return(
            <span>
              <Button onClick= {() => this.addSubgroup(text, record)}>Add Subgroup</Button>
              <Divider type="vertical" />
              <Popconfirm title="Sure to delete?">
                <Button>Delete</Button>
              </Popconfirm>
            </span>
          )
        }
      },
    ];
    console.log(this.props);
  }

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
          <Button onClick={this.showModal}>Add New</Button>
          <Button className="ml-3">Delete Selected</Button>
        </Row>

        <EditableTable columns={columns} dataSource={data} rowSelection={rowSelection}/>

        <BottomNav
          loading = {false}
          goBackButtonText = {'Back'}
          goNextButtonText = {'Next'}
          goBack= {this.goStep0}
          goNext= {this.goStep2}
        />
      </Row>
    );
  }
}

const mapStateToProps = state => ({ timetable: state.timetable });


export default connect( mapStateToProps, { updateFieldTimetable, updateFieldYears } )(Step3);
