import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
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
a {
    font-family: 'Boogaloo', cursive;
    text-decoration: none;
}
input {
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
width:80%;
padding: 1vw;
overflow: scroll;
position: center;
font-family: 'Press Start 2P', cursive;
button{
    font-size: 16px;
    font-family: 'Press Start 2P', cursive;
}
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
font-family: 'Press Start 2P', cursive;
button{
    font-size: 14px;
    font-family: 'Press Start 2P', cursive;
}
`
const Container = styled.div`
display: flex;
flex-direction: row;
margin: 2vh;
height: 80%;
`
const Links = styled.div`
display: flex;
margin: auto;
h6{
    font-family: 'Permanent Marker', cursive;
    position: absolute;
    margin-top: -20px;
}
`
class TeamPage extends Component {
    state = {
        user: {},
        team: []
    }
    getTeamInfo() {
        const userId = this.props.match.params.userId
        axios.get(`/api/users/${userId}`).then((res) => {
            this.setState({
                user: res.data.user,
                team: res.data.user.team
            })
        })
    }
    deleteTeam = (teamId) => {
        const userId = this.props.match.params.userId
        axios.delete(`/api/users/${userId}/team/${teamId}`).then((res) => {
            this.setState({
                user: res.data.user,
                team: res.data.user.team
            })
        })
    }
    handleChange = (event) => {
        const inputName = event.target.name
        const userInput = event.target.value
        this.setState({
            [inputName]: userInput
        })
    }
    handleSubmitNew = (event) => {
        event.preventDefault()
        const userId = this.props.match.params.userId
        axios.post(`/api/users/${userId}/team/`, this.state).then((res) => {
            this.setState({
                team: res.data.user.team,
                user: res.data.user
            })
            return (
                this.props.history.push(`/user/${userId}`)
            )
        })
    }
    componentDidMount() {
        this.getTeamInfo()
    }
    render() {
        const team = this.state.team || []
        const listOfTeams = team.map(team => {
            const userId = this.props.match.params.userId
            const teamUrl = `/user/${userId}/team/${team._id}`
            return (
                <div key={team._id}>
                    <Link to={teamUrl}>{team.name}</Link>
                    <button onClick={() => this.deleteTeam(team._id)}>-</button>
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
                            <form onSubmit={this.handleSubmitNew}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Team Name"
                                    onChange={this.handleChange} />
                                <button>+</button>
                            </form>
                        </LeftScreen>

                    </LeftContainer>
                    <Pole>
                        <MiniPole1></MiniPole1>
                        <MiniPole2></MiniPole2>
                    </Pole>
                    <RightContainer>
                        <RightScreen>
                            {listOfTeams}
                        </RightScreen>
                        <Links>
                            <Link to='/login'><img src="https://vignette.wikia.nocookie.net/sagseries/images/4/4c/Pokeball.png/revision/latest?cb=20120731005210" alt="" width="40" height="40" /></Link>
                            <h6>Log Out</h6>
                        </Links>
                    </RightContainer>
                </Container>
            </PokedexContainer>
        );
    }
}

export default TeamPage;