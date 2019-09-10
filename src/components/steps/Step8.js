import React from 'react';
import DraggableTimetable from '../commons/DraggableTimetable';
import { Radio, Select, Col, Card, Menu, Row } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable,
         updateFieldSubjects,
         updateFieldFinalTimetableOrders,
         onExportTimetable
       } from '../../actions';

class Step1 extends React.Component {

  constructor(props){
    super(props);
    this.subgroups = this.props.timetable.finalTimetables;
    let subgroupNames = {};
    Object.keys(this.props.timetable.finalTimetables).map(key => {
        let names = [];
        this.props.timetable.finalTimetables[key].map(subgroup => names.push(subgroup.name));
        subgroupNames[key] = names;
    });
    this.subgroupNames = subgroupNames;
    this.finalTimetablesOrders =  this.props.timetable.finalTimetablesOrders;
    this.finalTimetablesDataMap =  this.props.timetable.finalTimetablesDataMap;
  }

  goStep7 = () => {this.props.updateFieldTimetable("step",7);};

  statusOnChange = e => {
    this.props.updateFieldTimetable("showGeneratedTimetable", e.target.value);
    this.props.updateFieldTimetable("showSubgroupTimetable", "");
  };

  subGroupOnChange = val => {
    this.props.updateFieldTimetable("showSubgroupTimetable", val);
  };

  renderSubgroups = () => {
    const { showGeneratedTimetable } = this.props.timetable;

    // first time showing
    if(!this.props.timetable.hasOwnProperty("showSubgroupTimetable") || !this.props.timetable.showSubgroupTimetable) {
      this.props.updateFieldTimetable("showSubgroupTimetable", this.subgroupNames[showGeneratedTimetable][0]);
      // React should auto render when state change return should not be needed here
      return;
    }

    const { showSubgroupTimetable } = this.props.timetable;
    let timetableData = this.subgroups[showGeneratedTimetable][this.subgroupNames[showGeneratedTimetable].indexOf(showSubgroupTimetable)];
    console.log(showGeneratedTimetable, showSubgroupTimetable, this.props.timetable);
    let dataOrder = this.finalTimetablesOrders[showGeneratedTimetable][showSubgroupTimetable];
    let componentMap = this.finalTimetablesDataMap[showGeneratedTimetable][showSubgroupTimetable];
    console.log(dataOrder, componentMap);


    return(
      <div>
        <Select defaultValue={this.subgroupNames[showGeneratedTimetable][0]} style={{ width: 200 }} onChange={this.subGroupOnChange}>
          {this.subgroupNames[showGeneratedTimetable].map(name =>
            (<Select.Option key={name} value={name}>{name}</Select.Option>)
          )}
        </Select>
        <DraggableTimetable
          dataSource={timetableData}
          dataOrder={dataOrder}
          componentMap={componentMap}
          dataType={showGeneratedTimetable}
          dataSubType={showSubgroupTimetable}
          finalTimetablesOrders={this.props.timetable.finalTimetablesOrders}
          updateFieldFinalTimetableOrders={this.props.updateFieldFinalTimetableOrders}
          updateFieldTimetable={this.props.updateFieldTimetable}
        />
      </div>
    )
  }

  exportTimetable = (e) => {
    console.log(e.key);
    const { showGeneratedTimetable, showSubgroupTimetable } = this.props.timetable;
    let timetableData = this.subgroups[showGeneratedTimetable][this.subgroupNames[showGeneratedTimetable].indexOf(showSubgroupTimetable)];
    let dataOrder = this.finalTimetablesOrders[showGeneratedTimetable][showSubgroupTimetable];
    this.props.onExportTimetable(timetableData, dataOrder, e.key);
  }

  render() {
    // const typeData = ["activities","subgroups","teachers"];
    const typeData = ["subgroups","teachers"];
    const { showGeneratedTimetable } = this.props.timetable;
    console.log(this.props.timetable.finalTimetables)
    return (
      <div>
        {this.props.timetable["finalTimetables"]
          ?<div>
            <Row gutter={24}>
              <Col span={18}>
                <Radio.Group
                  buttonStyle="solid"
                  defaultValue="subgroups"
                  size="large"
                  onChange ={this.statusOnChange}
                >
                  {typeData.map(type =>
                     (<Radio.Button key = {type} value= {type}>{type}</Radio.Button>)
                  )}
                </Radio.Group>
              </Col>
              <Col span={5}>
                <Menu>
                  <Menu.SubMenu title="Export as">
                    <Menu.Item key="xml" onClick={this.exportTimetable}>xml</Menu.Item>
                    <Menu.Item key="html" onClick={this.exportTimetable}>html</Menu.Item>
                  </Menu.SubMenu>
                </Menu>
              </Col>
            </Row>
            {this.renderSubgroups()}
          </div>
          :<div>no generated timetables yet!</div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({ timetable: state.listTimetables.newTimetable });


export default connect( mapStateToProps, { updateFieldTimetable,
                                           updateFieldSubjects,
                                           updateFieldFinalTimetableOrders,
                                           onExportTimetable
                                         } )(Step1);
