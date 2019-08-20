import React from 'react';
import BottomNav from '../commons/BottomNav';
import { Form, Icon, Input, Row ,Table, Button, Popconfirm, Modal, Col, Select,Tabs, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable, updateFieldActivities } from '../../actions';

class Step1 extends React.Component {

  constructor(props) {
    super(props);
    this.goStep4 = () => this.props.updateFieldTimetable("step",4);
    this.goStep6 = () => this.props.updateFieldTimetable("step",6);
    this.showModal = () => this.props.updateFieldActivities("showModal", true);
    this.closeModal = () => this.props.updateFieldActivities("showModal", false);
    this.subjectOnChange = val => {
      let currentActivity = this.props.timetable.activities.newActivity;
      this.props.updateFieldActivities("newActivity", {...currentActivity, selectedSubject:val});
    }
    this.splitOnChange = val => {
      let currentActivity = this.props.timetable.activities.newActivity;
      this.props.updateFieldActivities("newActivity", {...currentActivity, split:val});
    }
    this.durationsOnChange = (val, key) => {
      let currentActivity = this.props.timetable.activities.newActivity;
      this.props.updateFieldActivities(
        "newActivity",
        {
          ...currentActivity,
          durations:{
            ...currentActivity.durations,
            ["duration_" + key.toString()]:val
          }
        }
      );
    }
    console.log(this.props);
  }

  render() {
    const { years, tags, teachers, subjects, activities, numberOfPeriodsPerDay } = this.props.timetable;
    const { selectedSubject, split, durations } = this.props.timetable.activities.newActivity;
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
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        console.log(selectedRowKeys, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    const tableData = [
      {
        key:1,
        data: years.data,
        columns:[
          {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
          }
        ]
      },
      {
        key:2,
        data: teachers.data,
        columns:[
          {
            title: 'Teacher',
            dataIndex: 'teacher',
            key: 'teacher'
          }
        ]
      },
      {
        key:3,
        data: tags.data,
        columns:[
          {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
          },
        ]
      },
    ]
    return (
      <Row>
        <Modal
            title="Add students"
            visible={this.props.timetable.activities.showModal}
            onOk={this.showModal}
            onCancel={this.closeModal}
            width="1300px"
          >
          <Row gutter= {24}>
            {tableData.map(item =>
              <Col span = {5} key={item.key} >
                <Table
                  defaultExpandAllRows={true}
                  size="small"
                  columns={item.columns}
                  dataSource={item.data}
                  pagination={{ pageSize: 50 }}
                  scroll={{ y: 240 }}
                  rowSelection={rowSelection}
                />
              </Col>
            )}
            <Col span = {9}>
              <Form {...formItemLayout}>
                <Form.Item label="Subject" >
                  <Select
                    size="small"
                    value={selectedSubject}
                    onChange={this.subjectOnChange}
                   >
                    {subjects.data.map(subject =>
                      <Select.Option value={subject.subject} key = {subject.key}>{subject.subject}</Select.Option>
                     )}
                  </Select>
                </Form.Item>
                <Form.Item
                  label= {
                    <span>
                      Split&nbsp;
                      <Tooltip title="What do you want others to call you?">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  }
                >
                  <Select
                    size="small"
                    value={split}
                    onChange={this.splitOnChange}
                   >
                     {[...Array(20).keys()].map(i => (
                       <Select.Option value={i+1} key = {i+1}>{i+1}</Select.Option>
                     ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label= {
                    <span>
                      Detail&nbsp;
                      <Tooltip title="What do you want others to call you?">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  }
                >
                  <Tabs defaultActiveKey="1" type="card">
                    {[...Array(split).keys()].map(i => (
                      <Tabs.TabPane tab={i+1} key={i+1}>
                        <Form.Item label= "Duration" {...formItemLayout}>
                          <Select
                            size="small"
                            value={durations["duration_" + (i+1).toString()]?durations["duration_" + (i+1).toString()]:1}
                            onChange={(e) => this.durationsOnChange(e,i+1)}
                           >
                             {[...Array(numberOfPeriodsPerDay).keys()].map(i => (
                               <Select.Option value={i+1} key = {i+1}>{i+1}</Select.Option>
                             ))}
                          </Select>
                        </Form.Item>
                      </Tabs.TabPane>
                    ))}
                  </Tabs>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Modal>
        <Row className="mb-2">
          <Button onClick={this.showModal}>Add New</Button>
          <Button className="ml-3">Delete Selected</Button>
        </Row>

        <BottomNav
          loading = {false}
          goBackButtonText = {'Back'}
          goNextButtonText = {'Next'}
          goBack= {this.goStep4}
          goNext= {this.goStep6}
        />
      </Row>
    );
  }
}

const mapStateToProps = state => ({ timetable: state.timetable });


export default connect( mapStateToProps, { updateFieldTimetable, updateFieldActivities  } )(Step1);
