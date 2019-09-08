import { Row, Col, Button, Card } from 'antd';
import React from 'react';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// Drag & Drop node
class TabNode extends React.Component {
  render() {
    const { connectDragSource, connectDropTarget, children } = this.props;

    return connectDragSource(connectDropTarget(children));
  }
}

const cardTarget = {
  drop(props, monitor) {
    const dragKey = monitor.getItem().index;
    const hoverKey = props.index;

    if (dragKey === hoverKey) {
      return;
    }

    props.moveTabNode(dragKey, hoverKey);
    monitor.getItem().index = hoverKey;
  },
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const WrapTabNode = DropTarget('DND_NODE', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(
  DragSource('DND_NODE', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))(TabNode),
);

class DraggableTabs extends React.Component {
  // state = {
  //   order: this.props.dataOrder,
  // };

  moveTabNode = (dragKey, hoverKey) => {
    const { finalTimetablesOrders, dataType, dataSubType } = this.props;
    let update = finalTimetablesOrders[dataType];
    let newOrder = update[dataSubType].slice();
    // console.log("before:", newOrder);

    const dragIndex = newOrder.indexOf(dragKey);
    const hoverIndex = newOrder.indexOf(hoverKey);
    // console.log("newOrder[dragIndex]", dragIndex, newOrder[dragIndex]);
    // console.log("newOrder[hoverIndex]", hoverIndex, newOrder[hoverIndex]);

    const tmp = newOrder[dragIndex];
    newOrder[dragIndex] = newOrder[hoverIndex];
    newOrder[hoverIndex] = tmp;

    // console.log("after:", newOrder);

    update[dataSubType] = newOrder;
    this.props.updateFieldFinalTimetableOrders(dataType, update);
    // this.setState({
    //   order: newOrder,
    // });
  };

  renderTabs = () => {
    const { finalTimetablesOrders, dataType, dataSubType } = this.props;
    let dataOrder = finalTimetablesOrders[dataType][dataSubType];
    const { children } = this.props;
    const numberOfHours = this.props.dataSource.days[0].hours.length;
    const numberOfDays = this.props.dataSource.days.length;

    let tabsList = [];
    let hoursList = [];
    for(let i = 0; i < numberOfHours; i++){
      tabsList.push([]);
      hoursList.push(this.props.dataSource.days[0].hours[i].name);
    }
    let daysMap = {};
    let dayCount = 0;
    this.props.dataSource.days.map(day => {
      daysMap[day.name] = dayCount;
      dayCount ++;
    });
    let tabCount = 0;
    let tabsListCount = 0;
    let len =  dataOrder.length;
    for(let i = 0; i < len; i ++) {
      React.Children.forEach(children, c => {
        // console.log(c);
        if(dataOrder[i] === c.key) {
          let rowIndex = daysMap[c.key.split("_")[0]];
          console.log(c.key);
          tabsList[tabsListCount].push(c);
        }
      });
      tabCount += 1;
      if(tabCount % numberOfDays === 0) {
        tabsListCount += 1;
      }
    }
    console.log(tabsList, numberOfHours);
    let count = 0;
    let tabs = [];
    tabsList.map(children => {
      tabs.push(
        <Row gutter= {24} key={count}>
          <Col span = {24/(this.props.dataSource.days.length+1)-1}>{hoursList[count]}</Col>
          {children.map(child => (
             <WrapTabNode key={child.key} index={child.key} moveTabNode={this.moveTabNode}>
               {child}
             </WrapTabNode>
          ))}
        </Row>
      )
      count += 1;
    });
    return tabs;
  }


  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        {this.renderTabs()}
      </DndProvider>
    );
  }
}

class DraggableTimetable extends React.Component {

  renderTabPanes = () => {
    const { finalTimetablesOrders, dataType, dataSubType } = this.props;
    // console.log(finalTimetablesOrders, dataType, dataSubType);
    let dataOrder = finalTimetablesOrders[dataType][dataSubType];
    let count = -1;
    let tabPanes = [];
    this.props.dataSource.days.map(day => (
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
        // tabPanes.push(<TabPane tab={text} key={dataOrder[count]}/>);
        console.log(dataOrder, dataOrder[count], count);
        tabPanes.push(
          <div key={dataOrder[count]}>
            <Col span = {24/(this.props.dataSource.days.length+1)}>
                <Card>
                  {hour.hasOwnProperty("empty")
                    ?<div>
                      <p>NA</p>
                      <p>NA</p>
                     </div>
                    :<div>
                      <p>Subject:{subject}</p>
                      <p>Teachers:{teachersStr}</p>
                    </div>
                  }
                </Card>
            </Col>
          </div>
        );
      })
    ))
    return tabPanes;
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Col span = {24/(this.props.dataSource.days.length+1) -1}></Col>
        <Row gutter= {24}>
          {this.props.dataSource.days.map(day =>
            (<Col span = {24/(this.props.dataSource.days.length+1)} key = {day.name}> {day.name} </Col>)
          )}
        </Row>
        <DraggableTabs {...this.props}>
          {this.renderTabPanes()}
        </DraggableTabs>
      </div>
    )
  }
}

export default DraggableTimetable;
