import React from 'react';
import AppLayout from './layouts/AppLayout';
import NewTimetable from './NewTimetable';
import { List, Avatar, Button, Skeleton, Card} from 'antd';
import { connect } from 'react-redux';
import { updateFieldListTimetable } from '../actions';


class ListTimetables extends React.Component {

  editTimetable = (timetable) => {
    console.log(timetable);
    this.props.updateFieldListTimetable("showTimetable", true);
    this.props.updateFieldListTimetable("newTimetable", timetable);
  }

  render() {
    const { timetables, showTimetable } = this.props.listTimetables;

    if(showTimetable) {
      return <NewTimetable/>
    }

    return (
      <AppLayout>
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

const mapStateToProps = state => ( { listTimetables: state.listTimetables } );

export default connect( mapStateToProps, { updateFieldListTimetable })(ListTimetables);
