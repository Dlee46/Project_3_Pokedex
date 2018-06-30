import React, { Component } from 'react';
import axios from 'axios'
import PokedexType from './PokedexType'
import PokedexMove from './PokedexMove'
import { Link } from 'react-router-dom'
class Pokemon extends Component {
    state = {
        pokemon: [],
        pokedex: {},
        team: [],
        showPokemon: false
    }
    addPokemon = (event) => {
        const userId = this.props.match.params.userId
        const teamId = this.props.match.params.teamId
        const newPokemon = { ...this.state.pokedex }
        console.log(newPokemon)
        axios.post(`/api/users/${userId}/team/${teamId}/pokemon`, newPokemon).then((res) => {
            this.setState({
                team: res.data
                , showPokemon: false
            })
        })
    }
    togglePokemon = () => {
        const showPokemon = !this.state.showPokemon
        this.setState({ showPokemon })
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
            pokedex,
            showPokemon: false
        })
        console.log("keystrokes", pokedex)
    }
    getPokemonApi = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokedex.name}/`)
            .then((res) => {
                this.setState({
                    pokedex: res.data,
                    showPokemon: true
                })
                console.log(res.data)
            })
    }
    componentDidMount() {
        this.getTeamInfo()
    }
    render() {
        const singlePokemon = this.state.pokemon
        const pokedex = this.state.pokedex || []
        const pokedexTypes = pokedex.types || []
        const listOfTypes = pokedexTypes.map((eachType, i) => {
            return (
                <PokedexType key={i} pokedextype={eachType} />
            )
        })
        const pokedexMoves = pokedex.moves || []
        const listOfMoves = pokedexMoves.map((eachMove, i) => {
            return (
                <PokedexMove key={i} pokedexmove={eachMove} />
            )
        })
        return (
            < div >
                <div>

                    <input type="text"
                        name="name"
                        placeholder="Pokemon"
                        onChange={this.pokedexHandleChange} />
                    <button onClick={this.getPokemonApi}>Search</button>

                </div>
                {this.state.showPokemon ?
                    <div>
                        <h1>#{pokedex.id} {pokedex.name} <button onClick={this.addPokemon}>+</button>
                        </h1>
                        <img src={pokedex.sprites ? pokedex.sprites.front_default : null} alt={pokedex.name} />
                        <h3>Type: {listOfTypes}</h3>
                        <h3>Moves: {listOfMoves}</h3>
                    </div>
                    :
                    <div>
                        <img src={singlePokemon.sprites} alt="" />
                        <h1>{singlePokemon.name}</h1>
                        <h3># {singlePokemon.id}</h3>
                        <h3>Type: {singlePokemon.type}</h3>
                        <h3>Height: {singlePokemon.height}</h3>
                        <h3>Weight: {singlePokemon.weight}</h3>
                        <h3>Moves: {singlePokemon.moves}</h3>
                    </div>
                }
                <div>
                    <button><Link to='/login'>Log Out</Link></button>
                </div>
            </div >
        );
    }
}

export default Pokemon;
