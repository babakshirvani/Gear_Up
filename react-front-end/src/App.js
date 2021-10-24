import React, { Component } from 'react';
import axios from 'axios';
import About from './pages/About';
import Home from './pages/Home';
import Help from './pages/Help';
import Navbar from './components/Navbar/Navbar';
import Map from './components/Map'
import './components/Map.css'

import {
  BrowserRouter as Router,
  Route,
  Redirect,
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
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/about" exact>
              <About />
            </Route>
            <Route path="/help" exact>
              <Help />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
        <Map></Map>
      </Router>

    );
  }
}

export default App;
