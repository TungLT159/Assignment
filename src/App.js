import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import {STAFFS} from './shared/staffs'
import StaffList from './components/StaffListComponent';

class App extends Component {
constructor(props){
  super(props);

  this.state = {
    staffs: STAFFS
  }
}
  render() {
    return (
      <div>
        <Navbar dark color="dark">
        <div className="container">
          <NavbarBrand href="#">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
        </div>
        </Navbar>
        <StaffList staffs={this.state.staffs} />
      </div>
    );
  }
}

export default App;