import React, { Component } from 'react';
import axios from 'axios'

class Pokemon extends Component {
    state = {
        pokemon: [],
        pokedex: []
    }
    getTeamInfo() {
        const userId = this.props.match.params.userId
        const teamId = this.props.match.params.teamId
        const pokemonId = this.props.match.params.pokemonId
        axios.get(`/api/users/${userId}/team/${teamId}/pokemon/${pokemonId}`).then((res) => {
            this.setState({
                pokemon: res.data.pokemon
            })
        })
    }
    pokedexHandleChange = (event) => {
        const inputName = event.target.name
        const userInput = event.target.value
        const pokedex = { ...this.state.pokedex }
        pokedex[inputName] = userInput
        this.setState({
            pokedex
        })
        console.log("keystrokes", pokedex)
    }
    getPokemonApi = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokedex.name}/`).then((res) => {
            this.setState({
                pokedex: res.data
            })
            console.log("POKEMON API", this.state.pokedex)
        })
    }
    componentDidMount() {
        this.getTeamInfo()
    }
    render() {
        const pokemon = this.state.pokemon
        return (
            < div >
                <div>

                    <input type="text"
                        name="name"
                        placeholder="Pokemon"
                        onChange={this.pokedexHandleChange} />
                    <button onClick={this.getPokemonApi}>Search</button>

                </div>
                <img src={pokemon.sprites} alt="" />
                <h1>{pokemon.name}</h1>
                <h3># {pokemon.order}</h3>
                <h3>Type: {pokemon.type}</h3>
                <h3>{pokemon.species}</h3>
                <h3>Height: {pokemon.height}</h3>
                <h3>Weight: {pokemon.weight}</h3>
                <h3>Moves: {pokemon.moves}</h3>

            </div >
        );
    }
}

export default Pokemon;
