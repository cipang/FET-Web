import React from 'react';
import BottomNav from '../commons/BottomNav';
import { Form, Icon, Input, Row ,Table, Button, Popconfirm, Modal, Col, Select,Tabs, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable, updateFieldActivities } from '../../actions';
import { createActivity, generateKey, delObject, refreshActivities } from '../../helper';

// TODO: may use common step
class Step1 extends React.Component {

  constructor(props) {
    super(props);
    this.goStep4 = () => this.props.updateFieldTimetable("step",4);
    this.goStep6 = () => this.props.updateFieldTimetable("step",6);
    this.showModal = () => this.props.updateFieldActivities("showModal", true);
    this.closeModal = () => this.props.updateFieldActivities("showModal", false);
    this.columns = [
      {
        title: 'Key',
        dataIndex: 'key',
        key: 'key'
      },
      {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration'
      },
      {
        title: 'Teachers',
        dataIndex: 'teachers',
        key: 'teachers'
      },
      {
        title: 'Subject',
        dataIndex: 'subject',
        key: 'subject'
      },
      {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags'
      }
    ];
  }

  subjectOnChange = val => {
    let currentActivity = this.props.timetable.newActivity;
    this.props.updateFieldTimetable("newActivity", {...currentActivity, selectedSubject:val});
  }

  splitOnChange = val => {
    let currentActivity = this.props.timetable.newActivity;
    let durations = {};
    [...Array(val).keys()].map(i => {
      durations["duration_" + (i+1).toString()] = 1;
    });
    this.props.updateFieldTimetable("newActivity",
       {
         ...currentActivity,
         split:val,
         durations
       }
    );
  }

  durationsOnChange = (val, key) => {
    let currentActivity = this.props.timetable.newActivity;
    this.props.updateFieldTimetable(
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

  handleAdd = () => {
    let { data, keyList } = this.props.timetable.activities;
    let { newActivity} = this.props.timetable;
    let updatedActivities = createActivity(newActivity, keyList );
    this.props.updateFieldActivities(
      "data",
      [...data,  updatedActivities]
    );
    this.props.updateFieldActivities(
      "keyList",
      keyList
    );
  }

  //TODO: need a better way
  handleDelAll = () => {
    const { selectedRowKeys, data, keyList } = this.props.timetable.activities;
    let newData = [...data];
    let newKeyList = [...keyList];
    selectedRowKeys.map(key => {
      newData = delObject(newData, key);
      newKeyList = newKeyList.filter(item => item !== key);
    });

    // let result = refreshActivities(newData);
    // newData = result["newData"];
    // let ommitedKeys = result["ommitedKeys"];
    //
    // ommitedKeys.map(key => {
    //   newKeyList = newKeyList.filter(item => item !== key);
    // });

    this.props.updateFieldActivities("data", newData);
    this.props.updateFieldActivities("keyList", newKeyList);
  }

  render() {
    const { years, tags, teachers, subjects, activities, numberOfPeriodsPerDay, days } = this.props.timetable;
    const { data, keyList } = this.props.timetable.activities;
    const { selectedSubject, split, durations } = this.props.timetable.newActivity;
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
        this.props.updateFieldActivities("selectedRowKeys",selectedRowKeys);
      }
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
        ],
        rowSelection: {
          onChange: (selectedRowKeys, selectedRows) => {
            let currentActivity = this.props.timetable.newActivity;
            this.props.updateFieldTimetable("newActivity", {...currentActivity, selectedYears:selectedRows});
          }
        }
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
        ],
        rowSelection: {
          onChange: (selectedRowKeys, selectedRows) => {
            let currentActivity = this.props.timetable.newActivity;
            this.props.updateFieldTimetable("newActivity", {...currentActivity, selectedTeachers:selectedRows});
          }
        }
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
        ],
        rowSelection: {
          onChange: (selectedRowKeys, selectedRows) => {
            let currentActivity = this.props.timetable.newActivity;
            this.props.updateFieldTimetable("newActivity", {...currentActivity, selectedTags:selectedRows});
          }
        }
      },
    ]
    return (
      <Row>
        <Modal
            title="Add students"
            visible={this.props.timetable.activities.showModal}
            onOk={this.handleAdd}
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
                  rowSelection={item.rowSelection}
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
                     {[...Array(days.length).keys()].map(i => (
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
                            value={durations["duration_" + (i+1).toString()]}
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
          <Popconfirm title="Sure to delete?" onConfirm={this.handleDelAll}>
            <Button  className="ml-3">Delete Selected</Button>
          </Popconfirm>
        </Row>

        <Table
          defaultExpandAllRows={true}
          size="small"
          columns={this.columns}
          dataSource={data}
          rowSelection={rowSelection}
        />

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

const mapStateToProps = state => ({ timetable: state.listTimetables.newTimetable });


export default connect( mapStateToProps, { updateFieldTimetable, updateFieldActivities  } )(Step1);
