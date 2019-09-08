import React from 'react';
import DraggableTimetable from '../commons/DraggableTimetable';
import { Radio, Select, Col, Card} from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable,
         updateFieldSubjects,
         updateFieldFinalTimetableOrders
       } from '../../actions';

class Step1 extends React.Component {

  goStep7 = () => {this.props.updateFieldTimetable("step",7);};

  statusOnChange = e => {
    this.props.updateFieldTimetable("showGeneratedTimetable", e.target.value);
  };

  subGroupOnChange = val => {
    this.props.updateFieldTimetable("showSubgroupTimetable", val);
  };

  renderSubgroups = () => {
    const { subgroups } = this.props.timetable.finalTimetables;
    const { finalTimetablesOrders } = this.props.timetable;
    const { showGeneratedTimetable, showSubgroupTimetable } = this.props.timetable;
    console.log(showGeneratedTimetable, showSubgroupTimetable);
    let dataOrder = finalTimetablesOrders[showGeneratedTimetable][showSubgroupTimetable];
    let subgroupsOrders = this.props.timetable.finalTimetablesOrders.subgroups;
    let subgroupNames = [];
    let timetableData = null;
    let componentMap = {};  // map key to component
    subgroups.map(subgroup => subgroupNames.push(subgroup.name));

    // first time showing
    if(!this.props.timetable.hasOwnProperty("showSubgroupTimetable")) {
      this.props.updateFieldTimetable("showSubgroupTimetable", subgroupNames[0]);
      timetableData = subgroups[0];
    } else {
      const { showSubgroupTimetable } = this.props.timetable;
      timetableData = subgroups[subgroupNames.indexOf(showSubgroupTimetable)];
    }

    const numberOfDays = timetableData.days.length;
    let count = -1;
    let tabPanes = [];
    timetableData.days.map(day => (
      day.hours.map(hour => {
        count += 1;
        let subject = "";
        let teachersStr = "";
        let tagsStr = "";
        if(!hour.hasOwnProperty("empty")) {
          subject = hour.subject;
          hour.teachers.map(teacher => teachersStr  += (teacher.name + " "));
          hour.activity_tag.map(tag => tagsStr  += (tag.name + " "));
        }

        componentMap[dataOrder[count]] = (
          <div key={dataOrder[count]}>
            <Col span = {24/(numberOfDays+1)}>
                {dataOrder[count]}
            </Col>
          </div>
        );
        // componentMap[dataOrder[count]] = (
        //   <div key={dataOrder[count]}>
        //     <Col span = {24/(numberOfDays+1)}>
        //         <Card>
        //           {hour.hasOwnProperty("empty")
        //             ?<div>
        //               <p>NA</p>
        //               <p>NA</p>
        //              </div>
        //             :<div>
        //               <p>Subject:{subject}</p>
        //               <p>Teachers:{teachersStr}</p>
        //             </div>
        //           }
        //         </Card>
        //     </Col>
        //   </div>
        // );
      })
    ))

    return(
      <div>
        <Select defaultValue={subgroupNames[0]} style={{ width: 200 }} onChange={this.subGroupOnChange}>
          {subgroupNames.map(name =>
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

  render() {
    // const typeData = ["activities","subgroups","teachers"];
    const typeData = ["subgroups","teachers"];
    const { showGeneratedTimetable } = this.props.timetable;
    console.log(this.props.timetable.finalTimetables)
    return (
      <div>
        {this.props.timetable["finalTimetables"]?
        <div>
          <Radio.Group
            buttonStyle="solid"
            defaultValue="activities"
            onChange ={this.statusOnChange}
          >
            {typeData.map(type =>
               (<Radio.Button key = {type} value= {type}>{type}</Radio.Button>)
            )}
          </Radio.Group>
          {showGeneratedTimetable === "subgroups"?
          this.renderSubgroups()
          :null}
        </div>
        : <div>no generated timetables yet!</div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({ timetable: state.listTimetables.newTimetable });


export default connect( mapStateToProps, { updateFieldTimetable,
                                           updateFieldSubjects,
                                           updateFieldFinalTimetableOrders
                                         } )(Step1);
