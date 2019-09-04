import React from 'react';
import DraggableTimetable from '../commons/DraggableTimetable';
import { Radio } from 'antd';
import { connect } from 'react-redux';
import { updateFieldTimetable, updateFieldSubjects } from '../../actions';

class Step1 extends React.Component {

  goStep7 = () => {this.props.updateFieldTimetable("step",7);};

  render() {
    const typeData = ["activities","subgroups","teachers"];

    return (
      <div>
        <Radio.Group
          buttonStyle="solid"
          defaultValue="activities"
        >
          {typeData.map(type =>
             (<Radio.Button key = {type} value= {type}>{type}</Radio.Button>)
          )}
        </Radio.Group>
        <DraggableTimetable/>
      </div>
    );
  }
}

const mapStateToProps = state => ({ timetable: state.listTimetables.newTimetable });


export default connect( mapStateToProps, { updateFieldTimetable, updateFieldSubjects } )(Step1);
