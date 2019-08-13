import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import { isLoggedIn } from '../actions';

class App extends React.Component {

  constructor(props) {
    super(props);
    if(!props.auth.user){
      props.isLoggedIn();
    };
  }

  render() {
    return (
      <Router history={createBrowserHistory}>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  async: state.async
});

export default connect(mapStateToProps, { isLoggedIn } )(App);
