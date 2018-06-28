import React, { Component } from 'react';
import axios from 'axios'

class Pokemon extends Component {
    state = {
        pokemon: []
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
    componentDidMount() {
        this.getTeamInfo()
    }
    render() {
        const pokemon = this.state.pokemon
        return (
            < div >
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
