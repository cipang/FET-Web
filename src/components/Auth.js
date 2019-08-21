import React from 'react';
import AppLayout from './layouts/AppLayout';
import Login from "./Login";
import Register from "./Register";
import { Button, Card, Form, Icon, Input } from 'antd';

class Auth extends React.Component {

  render() {
    return (
      <AppLayout>
        <div className="container login-section">
          <Card>
             <Card>
               <Login/>
             </Card>
          </Card>
        </div>
      </AppLayout>
    );
  }
}

export default Auth;
