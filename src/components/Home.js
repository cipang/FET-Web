import React from 'react';
import AppLayout from './layouts/AppLayout';
import bg from '../assets/images/bg.jpg';
import './Home.css';

class Header extends React.Component {
  render(){
    return (
      <AppLayout>
        <div className="home" style = {{ "backgroundImage": `url(${bg})`}}>
          <div className="dark-overlay"></div>
          <div className="row home-row">
            <div className="container d-flex justify-content-center align-items-center">
              <div className="row pb-5">
                  <div className="text-white display-3">The Big Picture</div>
                  <p className="mt-5 text-white mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt voluptates rerum eveniet sapiente repellat esse, doloremque quod recusandae deleniti nostrum assumenda vel beatae sed aut modi nesciunt porro quisquam voluptatem.</p>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }
}

export default Header;
