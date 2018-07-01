import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import PokedexType from './PokedexType'
import styled from 'styled-components'

const PokedexContainer = styled.div`
height: 80vh;
background: red;
text-align: center;
border-radius:5%;
margin:10px 20px;
position: justify;
border: 2px solid black;
box-shadow: outset 1px 1px 7px 4px;
box-shadow: gray 12px 8px 5px 1px;
.bigWhiteDot{
border-radius: 20vh;
background: white;
height: 70px;
width: 70px;
box-shadow: none;
}
.redDot{
    position:absolute;
    border-radius: 10vh;
    height:20px;
    width: 20px;
    background: red;
    border: 1px solid black;
    left: 120px;
    top: 20px;
    box-shadow: none;
}
.yellowDot{
    position:absolute;
    border-radius: 10vh;
    height:20px;
    width: 20px;
    background: yellow;
    border: 1px solid black;
    left: 150px;
    top: 20px;
    box-shadow: none;
}
.greenDot{
    position:absolute;
    border-radius: 10vh;
    height:20px;
    width: 20px;
    background: green;
    border: 1px solid black;
    left: 180px;
    top: 20px;
    box-shadow: none;
}
`
const BlueDot = styled.div`
position: absolute;
height: 65px;
width: 65px;
border-radius: 20vh;
background: skyblue;
margin: 0.2%;
`
const LidTopBorder = styled.div`
    position: absolute;
    top: 1.3vh;
    right:1vh;
    border-top: 8vw solid black;
    width: 45vw;
    height:0;
`
const InnerTop = styled.div`
position: absolute;
    top: 1.1vh;
    right:-.1vh;
    border-top: 8vw solid white;
    width: 46vw;
    height:0;
`
const Trapezoid = styled.div`
position: absolute;
top: 8.5vh;
right: 2.8vh;
border-top: 6vw solid black;
border-left: 5.4vh solid transparent;
border-right: 0 solid transparent;
height: 0;
width: 13vw;
`
const InnterTrapezoid = styled.div`
position: absolute;
top: 8.2vh;
right: 0vh;
border-top: 5.9vw solid white;
border-left: 5.4vh solid transparent;
border-right: 0 solid transparent;
height: 0;
width: 16vw;
`
const Pole = styled.div`
    width: 5%;
    border-right: 2px solid black;
    height: 114%;
    margin-top: -5.5vh;
`
const MiniPole1 = styled.div`
height: 10vh;
background-color: red;
margin-top: 5vh;
margin-bottom: 10px;
border: 2px solid black;
border-right: none;
`
const MiniPole2 = styled.div`
height: 10vh;
background-color: red;
margin-top: 30vh;
border: 2px solid black;
border-right: none;
`
const LeftContainer = styled.div`
position:relative;
/* border: 1px solid black; */
width: 58%;
padding: 1vw;
`
const LeftScreen = styled.div`
background-color: whitesmoke;
border-radius: 20px;
border: 20px solid gray;
height: 70%;
width:85%;
padding: 1vw;
overflow: scroll;
position: center;
`
const RightContainer = styled.div`
display: flex;
flex-direction: column;
position: relative;
width: 45%;
padding: 1vw;
padding-left: 45px;
/* border: 1px solid black; */
`
const RightScreen = styled.div`
background-color:whitesmoke;
height:60%;
width: 90%;
padding: 1vw;
float: right;
border: 1px solid black;
overflow: scroll;
`
const Container = styled.div`
display: flex;
flex-direction: row;
margin: 2vh;
height: 80%;
`
const LogOutButton = styled.div`
`
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
        axios.post(`/api/users/${userId}/team/${teamId}/pokemon`, newPokemon).then((res) => {
            this.setState({
                team: res.data,
                showPokemon: false
            })
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
                    height: res.data.height,
                    weight: res.data.weight,
                    id: res.data.id,
                    sprites: res.data.sprites.front_default,
                    types: res.data.types,
                }
                this.setState({
                    pokedex,
                    showPokemon: true
                })
                // console.log(this.state.pokedex)
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
        const pokedex = this.state.pokedex || []
        const pokemon = this.state.team.pokemon || []
        const pokedexTypes = pokedex.types || []
        const listOfTypes = pokedexTypes.map((eachType, i) => {
            return (
                <PokedexType key={i} pokedextype={eachType} />
            )
        })
        const listOfPokemon = pokemon.map(pokemon => {
            const userId = this.props.match.params.userId
            const teamId = this.props.match.params.teamId
            const pokemonUrl = `/user/${userId}/team/${teamId}/pokemon/${pokemon._id}`
            return (
                <div key={pokemon._id}>
                    <img src={pokemon.sprites} alt={pokemon.name} />
                    <Link to={pokemonUrl}>{pokemon.name}</Link>
                    <button onClick={() => this.deletePokemon(pokemon._id)}>Delete</button>
                </div>
            )
        })
        return (
            <PokedexContainer>
                <PokedexContainer className="bigWhiteDot">
                    <BlueDot>
                    </BlueDot>
                </PokedexContainer>
                <PokedexContainer className="redDot"></PokedexContainer>
                <PokedexContainer className="yellowDot"></PokedexContainer>
                <PokedexContainer className="greenDot"></PokedexContainer>
                <div>
                    <LidTopBorder className="lidTopBorder"></LidTopBorder>
                    <InnerTop></InnerTop>
                    <Trapezoid className="trapezoid"></Trapezoid>
                    <InnterTrapezoid></InnterTrapezoid>
                </div>
                <Container>
                    <LeftContainer>
                        <LeftScreen>
                            <h1>{this.state.team.name}</h1>
                            {listOfPokemon}
                        </LeftScreen>
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
                    </LeftContainer>
                    <Pole>
                        <MiniPole1></MiniPole1>
                        <MiniPole2></MiniPole2>
                    </Pole>
                    <RightContainer>
                        <RightScreen>
                            <div>
                                <input type="text"
                                    name="name"
                                    placeholder="Pokemon"
                                    onChange={this.pokedexHandleChange} />
                                <button onClick={this.getPokemonApi}>Search</button>
                            </div>
                            {this.state.showPokemon ?
                                <div>
                                    <h1>#{pokedex.id} {pokedex.name}</h1>
                                    <img src={pokedex.sprites ? pokedex.sprites : null} alt={pokedex.name} />
                                    <h4>{listOfTypes}</h4>
                                    <button onClick={this.addPokemon}>+</button>
                                </div>
                                : null
                            }
                        </RightScreen>
                        <div>
                            <button><Link to='/login'>Log Out</Link></button>
                        </div>
                    </RightContainer>
                </Container>
            </PokedexContainer>
        );
    }
}

export default SingleTeamPage;

