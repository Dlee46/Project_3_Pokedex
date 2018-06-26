import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './App.css';
import styled from 'styled-components'
import axios from 'axios'
import LogInPage from './components/LogInPage';
import TeamPage from './components/TeamPage';

class App extends Component {
  state = {
    users: []
  }
  componentDidMount() {
    axios.get('/api/users').then((res) => {
      console.log("APP CONSOLE", res.data)
      this.setState({ users: res.data.user })
    }).catch((err) => {
      console.error(err)
    })
  }
  render() {
    const LogInComponent = (props) => (
      <LogInPage users={this.state.users} {...props} />
    )
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/login' render={LogInComponent} />
            <Route exact path='/user/:userId' component={TeamPage} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
