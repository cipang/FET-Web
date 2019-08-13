import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';

class App extends React.Component {

  render() {
    return (
      <Router history={createBrowserHistory}>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
      </Router>
    );
  }
}

export default App;
