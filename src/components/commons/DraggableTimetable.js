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
  };

  renderTabs = () => {
    const { dataOrder, children } = this.props;
    const numberOfHours = this.props.dataSource.days[0].hours.length;
    const numberOfDays = this.props.dataSource.days.length;

    let tabsList = []; // 2-d components list [x][y], x is hour count, y is day count
    let hoursList = []; // time slots,. eg. [11:00, 12:00, 13:00, 14:00]
    for(let i = 0; i < numberOfHours; i++){
      tabsList.push([]);
      hoursList.push(this.props.dataSource.days[0].hours[i].name);
    }

    let componentMap = {};
    console.log(children);
    children.map(child => componentMap[child.key] = child);

    // console.log(componentMap);
    // console.log(dataOrder);
    let tabCount = 0; // day count
    let x = 0; // hour count
    let len = dataOrder.length; // total number of time slots
    for(let i = 0; i < len; i ++) {
      tabsList[x].push(componentMap[dataOrder[i]]);
      tabCount += 1;
      if(tabCount % numberOfDays === 0) {
        x += 1;
      }
    }
    // console.log(tabsList, numberOfHours);
    let count = 0;
    let tabs = [];
    tabsList.map(children => {
      tabs.push(
        <Row gutter= {24} key={count} className="mb-1">
          <Col span = {Math.floor(24/(this.props.dataSource.days.length+1)) - 1}>{hoursList[count]}</Col>
          {children.map(child => {
             return(
               <WrapTabNode key={child.key} index={child.key} moveTabNode={this.moveTabNode}>
                 {child}
               </WrapTabNode>
             )
          })}
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
    const { dataOrder, componentMap } = this.props;
    // console.log(dataOrder,componentMap,Math.floor(this.props.dataSource.days.length);
    let tabPanes = [];
    dataOrder.map(key =>{
       tabPanes.push(
          <div key={key}>
            <Col span = {Math.floor(24/(this.props.dataSource.days.length+1))} key={key}>
              <Card> {componentMap[key]} </Card>
            </Col>
          </div>
        )
        // console.log(tabPanes);
      }
    )
    return tabPanes;
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Row gutter= {24}>
          <Col span = {Math.floor(24/(this.props.dataSource.days.length+1)) - 1}></Col>
          {this.props.dataSource.days.map(day =>
            (<Col span = {Math.floor(24/(this.props.dataSource.days.length+1))} key = {day.name}> {day.name} </Col>)
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
