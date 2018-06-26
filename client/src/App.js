import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './App.css';
import styled from 'styled-components'
import axios from 'axios'

class App extends Component {
  state = {
    users: []
  }
  componentDidMount() {
    axios.get('/api/users').then((res) => {
      console.log(res.data)
    })
  }
  render() {
    return (
      <Router>
        <div>
          <Switch>
            {/* <Route exact path='/' component={} /> */}
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
