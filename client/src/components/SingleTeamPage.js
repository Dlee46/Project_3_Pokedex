import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

class SingleTeamPage extends Component {
    state = {
        pokemon: []
    }
    getTeamInfo() {
        const userId = this.props.match.params.userId
        const teamId = this.props.match.params.teamId
        axios.get(`/api/users/${userId}/team/${teamId}`).then((res) => {
            this.setState({
                pokemon: res.data.team.pokemon
            })
        })
    }
    updateTeam = (teamId) => {
        const userId = this.props.match.params.userId
        const teamToUpdate = this.state.team.find(team => team._id === teamId)
        axios.patch(`/api/users/${userId}/team/${teamId}`, teamToUpdate).then((res) => {
            this.setState({
                user: res.data.user,
                team: res.data.user.team
            })
        })
    }
    deletePokemon = (pokemonId) => {
        const userId = this.props.match.params.userId
        const teamId = this.props.match.params.teamId
        axios.delete(`/api/users/${userId}/team/${teamId}/pokemon/${pokemonId}`).then((res) => {
            this.setState({
                pokemon: res.data.team.pokemon
            })
        })
    }
    componentDidMount() {
        this.getTeamInfo()
    }
    render() {
        const pokemon = this.state.pokemon || []
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
                {/* {titleOfTeam} */}
                {listOfPokemon}
            </div>
        );
    }
}

export default SingleTeamPage;