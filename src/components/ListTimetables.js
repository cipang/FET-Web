import React from 'react';
import AppLayout from './layouts/AppLayout';
import { List, Avatar, Button, Skeleton, Card} from 'antd';
import { connect } from 'react-redux';


class ListTimetables extends React.Component {

  render() {
    const { timetables } = this.props.listTimetables;

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
                    actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
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

export default connect( mapStateToProps, {})(ListTimetables);
