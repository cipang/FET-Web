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
    order_row1:["1_1","1_2","1_3"],
    order_row2:["2_1","2_2","2_3"],
    order: ["1_1","1_2","1_3","2_1","2_2","2_3"],
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

  render() {
    console.log("re render");

    const { order } = this.state;
    const { children } = this.props;

    const tabsList = [[],[]];
    let tabCount = 0;
    let tabsListCount = 0;
    let tabs = [];
    let len =  this.state.order.length;
    for(let i = 0; i < len; i ++) {
      React.Children.forEach(children, c => {
        if(this.state.order[i] === c.key) {
          let rowIndex = c.key.split("_")[0] - 1;
          console.log(c.key);
          tabsList[tabsListCount].push(c);
          return;
        }
      });
      tabCount += 1;
      if(tabCount === 3) {
        tabsListCount += 1;
      }
    }
    console.log(tabsList[0]);
    console.log(tabsList[1]);
    
    return (
      <DndProvider backend={HTML5Backend}>
        <Tabs renderTabBar={this.renderTabBar} {...this.props}>
          {tabsList[0]}
        </Tabs>
        <Tabs renderTabBar={this.renderTabBar} {...this.props}>
          {tabsList[1]}
        </Tabs>
      </DndProvider>
    );
  }
}

class DraggableTimetable extends React.Component {
  render() {
    return (
      <DraggableTabs>
          <TabPane tab="tab 1" key="1_1"/>
          <TabPane tab="tab 2" key="1_2"/>
          <TabPane tab="tab 3" key="1_3"/>
          <TabPane tab="tab 4" key="2_1"/>
          <TabPane tab="tab 5" key="2_2"/>
          <TabPane tab="tab 6" key="2_3"/>
      </DraggableTabs>
    )
  }
}

export default DraggableTimetable;
