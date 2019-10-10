import React from 'react';
import AppLayout from './layouts/AppLayout';
import NewTimetable from './NewTimetable';
import { List, Avatar, Button, Skeleton, Card, Modal, Popconfirm} from 'antd';
import { connect } from 'react-redux';
import { updateFieldListTimetable, onDeleteTimetable } from '../actions';
import { timetableTemplate, activityTemplate, validateData } from '../helper';


class ListTimetables extends React.Component {

  editTimetable = (timetable) => {
    this.props.updateFieldListTimetable("showTimetable", true);
    this.props.updateFieldListTimetable(
      "newTimetable",
      validateData({
        ...timetableTemplate,
        ...timetable,
        newActivity:activityTemplate,
        new:false,
        showModal:false,
      })
    );
    // console.log(timetableTemplate,timetable);
  }

  componentDidUpdate() {
    if(this.props.listTimetables.timetables.length >= 1
        && this.props.listTimetables.timetables["0"]["loading"]
        && !this.props.loading
      ) {
      this.props.updateFieldListTimetable("timetables", []);
    }
  }

  render() {
    const { showTimetable, timetables } = this.props.listTimetables;
    if(showTimetable) {
      return <NewTimetable/>
    }
    return (
      <AppLayout customLoading={true} history={this.props.history}>
        <div className="container mt-5 pt-2">
          <Card>
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={timetables}
              renderItem={item => {
                console.log(item);
                return (
                  <List.Item
                    key={item.key}
                    actions={!item.loading
                      ?[<a key="list-loadmore-edit" onClick={() => this.editTimetable(item)}>edit</a>,
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.props.onDeleteTimetable(item)}>
                          <a key="list-delete">delete</a>
                        </Popconfirm>]
                      :null}
                  >
                    <Skeleton avatar title={false} loading={item.loading} active>
                      <List.Item.Meta
                        title={<a onClick={() => this.editTimetable(item)} >{item.name}</a>}
                        description={"lastModifiedTime:" + item.lastModifiedTime}
                      />
                    </Skeleton>
                  </List.Item>
                )
              }}
            />
          </Card>
        </div>

      </AppLayout>
    );
  }
}

const mapStateToProps = state => ( { listTimetables: state.listTimetables, loggedIn:state.auth.loggedIn, loading:state.async.loading } );

export default connect( mapStateToProps, { updateFieldListTimetable,
                                          onDeleteTimetable })(ListTimetables);
