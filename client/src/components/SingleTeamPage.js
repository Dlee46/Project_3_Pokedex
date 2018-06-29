import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

class SingleTeamPage extends Component {
    state = {
        team: {
            name: '',
            pokemon: []
        },
        editTeamName: false,
        pokedex: {},
        showPokemon: false,
    }
    addPokemon = (event) => {
        const userId = this.props.match.params.userId
        const teamId = this.props.match.params.teamId
        const newPokemon = { ...this.state.pokedex }
        console.log(newPokemon)
        axios.post(`/api/users/${userId}/team/${teamId}/pokemon`, newPokemon).then((res) => {
            this.setState({ team: res.data })
        })
    }
    toggleEdit = () => {
        const editTeamName = !this.state.editTeamName
        this.setState({ editTeamName })
    }
    togglePokemon = () => {
        const showPokemon = !this.state.showPokemon
        this.setState({ showPokemon })
    }
    getTeamInfo() {
        const userId = this.props.match.params.userId
        const teamId = this.props.match.params.teamId
        axios.get(`/api/users/${userId}/team/${teamId}`).then((res) => {
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
    pokedexHandleChange = (event) => {
        const inputName = event.target.name
        const userInput = event.target.value
        const pokedex = { ...this.state.pokedex }
        pokedex[inputName] = userInput
        this.setState({
            pokedex,
            showPokemon: false
        })
    }
    getPokemonApi = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokedex.name}/`)
            .then((res) => {
                const pokedex = {
                    name: res.data.name,
                    id: res.data.id,
                    sprites: res.data.sprites,
                    types: res.data.types
                }
                this.setState({
                    pokedex,
                    showPokemon: true
                })
                console.log(res.data)
            })
    }
    deletePokemon = (pokemonId) => {
        const userId = this.props.match.params.userId
        const teamId = this.props.match.params.teamId
        axios.delete(`/api/users/${userId}/team/${teamId}/pokemon/${pokemonId}`).then((res) => {
            this.setState({
                team: res.data.team
            })
        })
    }
    componentDidMount() {
        this.getTeamInfo()
        this.getPokemonApi()
    }
    render() {
        const pokedex = this.state.pokedex
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
                <div>
                    <div>
                        <input type="text"
                            name="name"
                            placeholder="Pokemon"
                            onChange={this.pokedexHandleChange} />
                        <button onClick={this.getPokemonApi}>Search</button>
                    </div>
                </div>
                {this.state.showPokemon ?
                    <div>
                        <h1>#{pokedex.id} {pokedex.name}</h1>
                        <img src={pokedex.sprites ? pokedex.sprites.front_default : null} alt={pokedex.name} />
                        {/* <h4>{pokedex.types}</h4> */}
                        <button onClick={this.addPokemon}>+</button>
                    </div>
                    : null
                }
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

