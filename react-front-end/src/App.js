
import React, { Component } from 'react';
import axios from 'axios';
import NavbarApp from './components/Navbar/NavbarApp';
import PopularPlace1 from './pages/PopularPlace1'
import SidebarApp from './components/Sidebar/SidebarApp';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
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
          <Route path='/login' component={NavbarApp} />
          <Route path='/logout' component={NavbarApp} />
          <Route path='/help' component={NavbarApp} />
          <Route path='/dashboard' > <SidebarApp/></Route>
          <Route path='/calendar' component={SidebarApp} />
          <Route path='/new' component={SidebarApp} />
          <Route exact path="/popularplace1" component={PopularPlace1}>
        
        </Route>
          </Switch>
        </Router>

      
      </>
    );
  }
}
export default App;
