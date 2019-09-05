import { Tabs, Row, Col } from 'antd';
import React from 'react';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const { TabPane } = Tabs;

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
  state = {
    order: this.props.dataOrder,
  };

  moveTabNode = (dragKey, hoverKey) => {
    const newOrder = this.state.order.slice();
    const { children } = this.props;
    console.log("before:", newOrder);

    const dragIndex = newOrder.indexOf(dragKey);
    const hoverIndex = newOrder.indexOf(hoverKey);
    console.log("newOrder[dragIndex]", dragIndex, newOrder[dragIndex]);
    console.log("newOrder[hoverIndex]", hoverIndex, newOrder[hoverIndex]);

    const tmp = newOrder[dragIndex];
    newOrder[dragIndex] = newOrder[hoverIndex];
    newOrder[hoverIndex] = tmp;

    console.log("after:", newOrder);
    this.setState({
      order: newOrder,
    });
  };

  renderTabBar = (props, DefaultTabBar) => (
    <DefaultTabBar {...props}>
      {node => (
        <WrapTabNode key={node.key} index={node.key} moveTabNode={this.moveTabNode}>
          {node}
        </WrapTabNode>
      )}
    </DefaultTabBar>
  );

  renderTabs = () => {
    const { order } = this.state;
    const { children } = this.props;
    const numberOfHours = this.props.dataSource.days[0].hours.length;
    const numberOfDays = this.props.dataSource.days.length;

    let tabsList = [];
    for(let i = 0; i < numberOfHours; i++){
      tabsList.push([]);
    }
    let daysMap = {};
    let dayCount = 0;
    this.props.dataSource.days.map(day => {
      daysMap[day.name] = dayCount;
      dayCount ++;
    });
    let tabCount = 0;
    let tabsListCount = 0;
    let len =  this.state.order.length;
    for(let i = 0; i < len; i ++) {
      React.Children.forEach(children, c => {
        if(this.state.order[i] === c.key) {
          let rowIndex = daysMap[c.key.split("_")[0]];
          console.log(c.key);
          tabsList[tabsListCount].push(c);
          return;
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
    tabsList.map(child => {
      tabs.push(
        <Tabs key={count} renderTabBar={this.renderTabBar} {...this.props}>
          {child}
        </Tabs>
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
    const { dataOrder } = this.props;
    let count = -1;
    let tabPanes = [];
    this.props.dataSource.days.map(day => {
      day.hours.map(hour => {
        count += 1;
        tabPanes.push(<TabPane tab={dataOrder[count]} key={dataOrder[count]}/>);
      })
    })
    return tabPanes;
  }

  render() {
    console.log(this.props.dataSource, this.props.dataOrder);
    return (
      <DraggableTabs {...this.props}>
        {this.renderTabPanes()}
      </DraggableTabs>
    )
  }
}

export default DraggableTimetable;
