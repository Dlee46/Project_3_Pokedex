import React, { Component } from 'react';
import axios from 'axios'
import PokedexType from './PokedexType'
import PokedexMove from './PokedexMove'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const PokedexContainer = styled.div`
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
position: absolute;
height: 65px;
width: 65px;
border-radius: 20vh;
background: skyblue;
margin: 0.2%;
`
const LidTopBorder = styled.div`
    position: absolute;
    top: 9.2vh;
    right:18.5vh;
    border-top: 4.2vw solid black;
    width: 38.1vw;
    height:0;
`
const InnerTop = styled.div`
position: absolute;
    top: 6.7vh;
    right:16vh;
    border-top: 5.4vw solid white;
    width: 39.3vw;
    height:0;
`
const Trapezoid = styled.div`
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
    width: 4%;
    border-right: 2px solid black;
    height: 113.8%;
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
width: 50%;
padding: 1%;
margin-top:1%;
`
const LeftScreen = styled.div`
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
}
h1{
    font-size: 13px;
    button{
        font-family: 'Press Start 2P', cursive;
    }
}
`
const RightContainer = styled.div`
display: flex;
flex-direction: column;
position: relative;
width: 45%;
padding: 1vw;
padding-left: 45px;
`
const RightScreen = styled.div`
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
}
img{
    width: 90%;
    height: 70%;
}
`
const Container = styled.div`
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
        console.log("State for Pokemon", this.props)
        const userId = this.props.match.params.userId
        const teamId = this.props.match.params.teamId
        const teamPage = `/user/${userId}`
        const singleTeam = `/user/${userId}/team/${teamId}`
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
            < PokedexContainer >
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
                                    <h5>Type: {listOfTypes}</h5>
                                    <h5>Height: {pokedex.height} m</h5>
                                    <h5>Weight: {pokedex.weight} kg</h5>
                                    <h5>Moves: {listOfMoves}</h5>
                                </div>
                                : null
                            }
                        </LeftScreen>
                    </LeftContainer>
                    <Pole>
                        <MiniPole1></MiniPole1>
                        <MiniPole2></MiniPole2>
                    </Pole>
                    <RightContainer>
                        <RightScreen>
                            <h5>{this.state.team.name}</h5>
                            <img src={singlePokemon.sprites} alt="" />
                            <h1>{singlePokemon.name}</h1>
                            <h5># {singlePokemon.id}</h5>
                            <h5>Height: {singlePokemon.height} m</h5>
                            <h5>Weight: {singlePokemon.weight} kg</h5>
                            <h5>Moves: Please search the pokemon on the pokedex</h5>
                            <h5>Type: Please search on Pokedex</h5>
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
                            <ButtonStyle>
                                <Links to={singleTeam}>
                                    <img src="http://pokemon.mit.edu/images/greatball.png" alt="" width="30" height="30" />
                                    <h6>Team</h6>
                                </Links>
                            </ButtonStyle>
                        </Buttons>
                    </RightContainer>

                </Container>
            </ PokedexContainer >
        );
    }
}

export default Pokemon;
