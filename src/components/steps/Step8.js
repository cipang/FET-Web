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
    const { finalTimetablesOrders, finalTimetablesDataMap } = this.props.timetable;
    const { showGeneratedTimetable } = this.props.timetable;
    let subgroupNames = [];
    let timetableData = null;
    subgroups.map(subgroup => subgroupNames.push(subgroup.name));

    // first time showing
    if(!this.props.timetable.hasOwnProperty("showSubgroupTimetable")) {
      this.props.updateFieldTimetable("showSubgroupTimetable", subgroupNames[0]);
      // React should auto render when state change return should not be needed here
      return;
    }

    const { showSubgroupTimetable } = this.props.timetable;
    timetableData = subgroups[subgroupNames.indexOf(showSubgroupTimetable)];
    console.log(showGeneratedTimetable, showSubgroupTimetable, this.props.timetable);
    let dataOrder = finalTimetablesOrders[showGeneratedTimetable][showSubgroupTimetable];
    let componentMap = finalTimetablesDataMap[showGeneratedTimetable][showSubgroupTimetable];
    console.log(dataOrder, componentMap);


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
