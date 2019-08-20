import React from 'react';
import AppLayout from './layouts/AppLayout';
import { Button } from 'antd';

import { onListTimetables } from '../actions';
import { connect } from 'react-redux';


class ListTimetables extends React.Component {

  getTimetables = e => {
    e.preventDefault();
    this.props.onListTimetables();
  };

  render() {

    return (
      <AppLayout>
        <Button className="mt-5" onClick={this.getTimetables}> get timetables</Button>
      </AppLayout>
    );
  }
}

const mapStateToProps = state => ({ timetable: state.timetable, async: state.async });

export default connect( mapStateToProps, { onListTimetables })(ListTimetables);
