
import React, { Component } from 'react';
import axios from 'axios';
import NavbarApp from './components/Navbar/NavbarApp';
import Map from './components/Map'
import './components/Map.css'
import Gear from './components/Gear/Gear';

import SidebarApp from './components/Sidebar/SidebarApp';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!'
    }
  }
  fetchData = () => {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // handle success
        console.log(response.data) // The entire response from the Rails API
        console.log(response.data.message) // Just the message
        this.setState({
          message: response.data.message
        });
      })
  }
  render() {
    return (
      <>
        <Router>
          <Switch>
          <Route exact path='/' component={NavbarApp} />
          <Route path='/about' component={NavbarApp} />
          <Route path='/help' component={NavbarApp} />
          <Route path='/dashboard' component={SidebarApp} />
          <Route path='/calendar' component={SidebarApp} />
          <Route path='/new' component={SidebarApp} />
          
          {/* <Map></Map> */}
          </Switch>
        </Router>
      
      </>
    );
  }
}
export default App;
