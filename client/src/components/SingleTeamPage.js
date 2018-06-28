import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

class SingleTeamPage extends Component {
    state = {
        team: {
            name: '',
            pokemon: []
        },
        editTeamName: false
    }
    toggleEdit = () => {
        const editTeamName = !this.state.editTeamName
        this.setState({ editTeamName })
    }
    getTeamInfo() {
        const userId = this.props.match.params.userId
        const teamId = this.props.match.params.teamId
        axios.get(`/api/users/${userId}/team/${teamId}`).then((res) => {
            console.log(res.data)
            this.setState({
                team: res.data.team
            })
        })
    }
    updateTeam = (event) => {
        event.preventDefault()
        const userId = this.props.match.params.userId
        const teamId = this.props.match.params.teamId

        axios.patch(`/api/users/${userId}/team/${teamId}`, this.state.team)
            .then((res) => {
                console.log('API RESPONSE', res.data)
                this.setState({
                    team: res.data.team
                })
            })
    }

    handleChange = (event) => {
        const inputName = event.target.name
        const userInput = event.target.value
        const team = { ...this.state.team }
        team[inputName] = userInput
        this.setState({
            team
        })
    }
    deletePokemon = (pokemonId) => {
        const userId = this.props.match.params.userId
        const teamId = this.props.match.params.teamId
        axios.delete(`/api/users/${userId}/team/${teamId}/pokemon/${pokemonId}`).then((res) => {
            console.log('DELETED POKEMON, response', res.data)
            this.setState({
                team: res.data.team
            })
        })
    }
    componentDidMount() {
        this.getTeamInfo()
    }
    render() {
        const pokemon = this.state.team.pokemon || []
        const listOfPokemon = pokemon.map(pokemon => {
            const userId = this.props.match.params.userId
            const teamId = this.props.match.params.teamId
            const pokemonUrl = `/user/${userId}/team/${teamId}/pokemon/${pokemon._id}`
            return (
                <div key={pokemon._id}>
                    <Link to={pokemonUrl}>{pokemon.name}</Link>
                    <button onClick={() => this.deletePokemon(pokemon._id)}>Delete</button>
                </div>
            )
        })
        return (
            <div>
                <h1>{this.state.team.name}</h1>
                {listOfPokemon}
                <div>
                    {this.state.editTeamName ?
                        <div>
                            <form onSubmit={this.updateTeam}>
                                <input type="text"
                                    name="name"
                                    value={this.state.team.name}
                                    onChange={this.handleChange} />
                                <button>Save</button>
                            </form>
                        </div>
                        : null
                    }
                </div>
                <div>
                    <button onClick={this.toggleEdit}>
                        {this.state.editTeamName
                            ? 'Finished'
                            : 'Edit Team'
                        }
                    </button>
                </div>
            </div>
        );
    }
}

export default SingleTeamPage;

