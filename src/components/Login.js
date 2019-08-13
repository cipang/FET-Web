import React, { Component } from 'react';
import './login.css';
import AppLayout from './layouts/AppLayout';

class Login extends Component {

  render() {
    // Todo: responsive margin top
    return(
      <AppLayout>
        <div className="container login-section">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="card">
                <div className="card-header">
                  <h4>Account Login</h4>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control"/>
                    </div>
                    <input type="submit" value="Login" className="btn btn-primary btn-block"/>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }
}

export default Login;
