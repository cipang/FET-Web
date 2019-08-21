import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import NotFound from "./NotFound";
import NewTimetable from "./NewTimetable";
import ListTimetables from "./ListTimetables";
import { connect } from 'react-redux';
import { isLoggedIn } from '../actions';

class App extends React.Component {

  componentDidMount(){
    if(!this.props.auth.user){
      this.props.isLoggedIn();
    };
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Auth}/>
          <Route exact path="/signIn" component={Auth}/>
          <Route exact path="/newTimetable" component={NewTimetable}/>
          <Route exact path="/listTimetables" component={ListTimetables}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  async: state.async
});

export default connect(mapStateToProps, { isLoggedIn } )(App);
