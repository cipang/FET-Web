import React from 'react';
import AppLayout from './layouts/AppLayout';
import NewTimetable from './NewTimetable';
import { List, Avatar, Button, Skeleton, Card, Modal} from 'antd';
import { connect } from 'react-redux';
import { updateFieldListTimetable } from '../actions';
import { timetableTemplate, activityTemplate } from '../helper';


class ListTimetables extends React.Component {

  editTimetable = (timetable) => {
    console.log(timetable);
    this.props.updateFieldListTimetable("showTimetable", true);
    this.props.updateFieldListTimetable(
      "newTimetable",
      {
        ...timetableTemplate,
        ...timetable,
        newActivity:activityTemplate,
        new:false,
        showModal:false,
      }
    );
    console.log(timetableTemplate,timetable);

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
                return (
                  <List.Item
                    key={item.key}
                    actions={[<a key="list-loadmore-edit" onClick={() => this.editTimetable(item)}>edit</a>, <a key="list-loadmore-more">more</a>]}
                  >
                    <Skeleton avatar title={false} loading={item.loading} active>
                      <List.Item.Meta
                        title={<a href="https://ant.design">{item.lastModifiedTime}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                      />
                      <div>content</div>
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

export default connect( mapStateToProps, { updateFieldListTimetable })(ListTimetables);
