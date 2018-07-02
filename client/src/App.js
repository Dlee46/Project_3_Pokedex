import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import axios from 'axios'
import LogInPage from './components/LogInPage';
import TeamPage from './components/TeamPage';
import SingleTeamPage from './components/SingleTeamPage';
import Pokemon from './components/Pokemon';


class App extends Component {
  state = {
    users: [],
    pokedex: []
  }
  getUserInfo() {
    axios.get('/api/users').then((res) => {
      this.setState({
        users: res.data.user
      })
    })
  }

  getPokemonApi() {
    axios.get(`https://pokeapi.co/api/v2/pokemon/`).then((res) => {
      this.setState({
        pokedex: res.data
      })
    })
  }
  componentDidMount() {
    this.getUserInfo()
    this.getPokemonApi()
  }
  render() {
    const LogInComponent = (props) => (
      <LogInPage users={this.state.users} {...props} />
    )
    const TeamPageComponent = (props) => (
      <TeamPage users={this.state.users} {...props} />
    )
    const SingleTeamComponent = (props) => (
      <SingleTeamPage
        users={this.state.users}
        pokedex={this.state.pokedex}
        {...props} />
    )
    const PokemonComponent = (props) => (
      <Pokemon users={this.state.users} {...props} />
    )

    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' render={() => (<Redirect to='/login' />)} />
            <Route exact path='/login' render={LogInComponent} />
            <Route exact path='/user/:userId' render={TeamPageComponent} />
            <Route exact path='/user/:userId/team/:teamId' render={SingleTeamComponent} />
            <Route exact path='/user/:userId/team/:teamId/pokemon/:pokemonId' render={PokemonComponent} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
