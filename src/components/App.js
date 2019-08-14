import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import NewTimetable from "./NewTimetable";
import { connect } from 'react-redux';
import { isLoggedIn, firebase } from '../actions';

class App extends React.Component {

  constructor(props) {
    super(props);
    if(!props.auth.user){
      props.isLoggedIn();
    };
  }

  render() {
    return (
      <Router>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/newTimetable" component={NewTimetable}/>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  async: state.async
});

export default connect(mapStateToProps, { isLoggedIn } )(App);
