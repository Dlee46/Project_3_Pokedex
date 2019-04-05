import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import PokedexType from './PokedexType'
import styled from 'styled-components'

const PokedexContainer = styled.div`
@media (max-width:450px){
    height: 100vh;
    margin:0;
    box-shadow: none;
    border: none;
    border-radius: 0;
.bigWhiteDot{
display:none;
}
.redDot{
    display:none;
}
.yellowDot{
    display:none;
}
.greenDot{
    display:none
}
}
height: 80vh;
background: red;
text-align: center;
border-radius:5%;
margin:5% 10%;
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
margin: 1%;
}
.redDot{
    position:absolute;
    border-radius: 10vh;
    height:20px;
    width: 20px;
    background: red;
    border: 1px solid black;
    left: 8%;
    top: 3%;
    box-shadow: none;
}
.yellowDot{
    position:absolute;
    border-radius: 10vh;
    height:20px;
    width: 20px;
    background: yellow;
    border: 1px solid black;
    left: 10%;
    top: 3%;
    box-shadow: none;
}
.greenDot{
    position:absolute;
    border-radius: 10vh;
    height:20px;
    width: 20px;
    background: green;
    border: 1px solid black;
    left: 12%;
    top: 3%;
    box-shadow: none;
}
a {
    font-family: 'Boogaloo', cursive;
}
input{
    font-family: 'Kalam', cursive;
}
`
const BlueDot = styled.div`
@media (max-width: 450px){
    display:none;
}
position: absolute;
height: 65px;
width: 65px;
border-radius: 20vh;
background: skyblue;
margin: 0.2%;
`
const LidTopBorder = styled.div`
@media (max-width: 450px){
    display:none;
}
    position: absolute;
    top: 9.2vh;
    right:18.5vh;
    border-top: 4.2vw solid black;
    width: 38.1vw;
    height:0;
`
const InnerTop = styled.div`
@media (max-width: 450px){
    display:none;
}
position: absolute;
    top: 6.7vh;
    right:16vh;
    border-top: 5.4vw solid white;
    width: 39.3vw;
    height:0;
`
const Trapezoid = styled.div`
@media (max-width: 450px){
    display:none;
}
position: absolute;
top: 16.7vh;
right: 18.5vh;
border-top: 2vw solid black;
border-left: 4vh solid transparent;
border-right: 0 solid transparent;
height: 0;
width: 17vw;
`
const InnterTrapezoid = styled.div`
@media (max-width: 450px){
    display:none;
}
position: absolute;
top: 16.7vh;
right: 16vh;
border-top: 1.9vw solid white;
border-left: 3.7vh solid transparent;
border-right: 0 solid transparent;
height: 0;
width: 18.3vw;
`
const Pole = styled.div`
@media (max-width: 450px){
    display:none;
}
    width: 4%;
    border-right: 2px solid black;
    height: 113.8%;
    margin-top: -5.5vh;
`
const MiniPole1 = styled.div`
@media (max-width: 450px){
    display:none;
}
height: 10vh;
background-color: red;
margin-top: 5vh;
margin-bottom: 10px;
border: 2px solid black;
border-right: none;
`
const MiniPole2 = styled.div`
@media (max-width: 450px){
    display:none;
}
height: 10vh;
background-color: red;
margin-top: 30vh;
border: 2px solid black;
border-right: none;
`
const LeftContainer = styled.div`
position:relative;
width: 50%;
padding: 1%;
margin-top:1%;
`
const LeftScreen = styled.div`
@media (max-width:450px){
height: 50%;
width: 90%;
border: 1px solid black;
}
background-color: whitesmoke;
border-radius: 20px;
border: 20px solid gray;
height: 70%;
width:80%;
padding: 1vw;
overflow: scroll;
position: center;
font-family: 'Press Start 2P', cursive;
a{
    font-family: 'Press Start 2P', cursive;
    font-size: 10px;
    text-decoration: none;
}
h1{
    font-size: 13px;
}
button{
    font-size: 14px;
    font-family: 'Press Start 2P', cursive;
}
`
const RightContainer = styled.div`
@media (max-width:450px){
padding: 1%;
}
display: flex;
flex-direction: column;
position: relative;
width: 45%;
padding: 1vw;
padding-left: 45px;
`
const RightScreen = styled.div`
@media (max-width:450px){
height: 50%;
width: 90%;
border-radius: 20px;
}
background-color:whitesmoke;
height:60%;
width: 90%;
padding: 1vw;
float: right;
border: 1px solid black;
overflow: scroll;
font-family: 'Press Start 2P', cursive;
a{
    font-family: 'Press Start 2P', cursive;
    font-size: 10px;
}
h1{
    font-size: 13px;
    button{
        font-family: 'Press Start 2P', cursive;
    }
}
`
const Container = styled.div`
@media (max-width:450px){
margin: 0;
}
display: flex;
flex-direction: row;
margin: 2vh;
height: 80%;
`
const Links = styled(Link)`
display: flex;
flex-direction: column-reverse;
justify-content: center;
align-items: center;
margin: auto;
text-decoration: none;
h6{
    font-family: 'Permanent Marker', cursive;
    margin: 0;
}
`
const ButtonStyle = styled.button`
margin: 1%;
width: 10%;
`
const Buttons = styled.div`
display: flex;
justify-content: center;
`
const EditScreen = styled.div`
button{
    font-family: 'Permanent Marker', cursive;
}
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
        axios.post(`/api/users/${userId}/team/${teamId}/pokemon`, newPokemon)
            .then((res) => {
                console.log("LOOK HERE", res.data)
                this.setState({
                    team: res.data.team,
                    showPokemon: false
                })
                return (
                    this.props.history.push(`/user/${userId}/team/${teamId}`)
                )
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
            })
    }
    deletePokemon = (pokemonId) => {
        const userId = this.props.match.params.userId
        const teamId = this.props.match.params.teamId
        axios.delete(`/api/users/${userId}/team/${teamId}/pokemon/${pokemonId}`)
            .then((res) => {
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
        const userId = this.props.match.params.userId
        const teamId = this.props.match.params.teamId
        const teamPage = `/user/${userId}`
        const pokedex = this.state.pokedex || []
        const pokemon = this.state.team.pokemon || []
        const pokedexTypes = pokedex.types || []
        const listOfTypes = pokedexTypes.map((eachType, i) => {
            return (
                <PokedexType key={i} pokedextype={eachType} />
            )
        })
        const listOfPokemon = pokemon.map(pokemon => {
            const pokemonUrl = `/user/${userId}/team/${teamId}/pokemon/${pokemon._id}`
            return (
                <div key={pokemon._id}>
                    <img src={pokemon.sprites} alt={pokemon.name} />
                    <Link to={pokemonUrl}>{pokemon.name}</Link>
                    {this.state.editTeamName ?
                        <button onClick={() => this.deletePokemon(pokemon._id)}>-</button>
                        : null
                    }
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
                        <EditScreen>
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
                        </EditScreen>
                        <EditScreen>
                            <button onClick={this.toggleEdit}>
                                {this.state.editTeamName
                                    ? 'Finished'
                                    : 'Edit Team'
                                }
                            </button>
                        </EditScreen>
                    </LeftContainer>
                    <Pole>
                        <MiniPole1></MiniPole1>
                        <MiniPole2></MiniPole2>
                    </Pole>
                    <RightContainer>
                        <RightScreen>
                            <h6>Pokedex</h6>
                            <div>
                                <input type="text"
                                    name="name"
                                    placeholder="Pokemon"
                                    onChange={this.pokedexHandleChange} />
                                <button onClick={this.getPokemonApi}>Search</button>
                            </div>
                            {this.state.showPokemon ?
                                <div>
                                    <h1>#{pokedex.id} {pokedex.name} <button onClick={this.addPokemon}>+</button></h1>
                                    <img src={pokedex.sprites ? pokedex.sprites : null} alt={pokedex.name} />
                                    <h4>{listOfTypes}</h4>

                                </div>
                                : null
                            }
                        </RightScreen>
                        <Buttons>
                            <ButtonStyle>
                                <Links to='/login'>
                                    <img src="http://web.mit.edu/pokemon/images/ultraball.png" alt="" width="30" height="30" />
                                    <h6>Log Out</h6>
                                </Links>
                            </ButtonStyle>
                            <ButtonStyle>
                                <Links to={teamPage}>
                                    <img src="http://web.mit.edu/pokemon/images/masterball.png" alt="" width="30" height="30" />
                                    <h6>User</h6>
                                </Links>
                            </ButtonStyle>
                        </Buttons>
                    </RightContainer>
                </Container>
            </PokedexContainer >
        );
    }
}

export default SingleTeamPage;

