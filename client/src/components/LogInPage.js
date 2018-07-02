import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const PokedexContainer = styled.div`
height: 100vh;
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
const LoginContainer = styled.div`
margin:10% 25vh;
`

const CreateUser = styled.div`
margin: 30% 25vh;
`
const PokedexLid = styled.div`
border: 2px solid black;
border-radius: 0 0 5vh 5vh;
height: 88.5vh;
background: red;
`
const LidTopBorder = styled.div`
    position: absolute;
    top: 8vh;
    right: 2.8vw;
    border-bottom: 6vw solid black;
    border-left: 5.5vw solid transparent;
    border-right: 0 solid transparent;
    width: 45vw;
    height:0;
`
const Trapezoid = styled.div`
position: absolute;
top: 8.3vh;
right: 3.3vw;
border-bottom: 6vw solid red;
border-left: 5.4vw solid transparent;
border-right: 0 solid transparent;
height: 0;
width: 44.5vw;
`
const YellowTriangle = styled.div`
position: absolute;
width: 0;
height: 0;
margin: 40% 30px;
border-top: 5vw solid transparent;
border-bottom: 5vw solid transparent;
border-left: 5vw solid black;
`
const InnerTriangle = styled.div`
border-top: 3.5vw solid transparent;
border-bottom: 3.5vw solid transparent;
border-left: 3.5vw solid yellow;
position: relative;
margin: 40% 8px;
width: 0;
height:0;
top: -3.5vw;
right: 5.5vw;
`
const BottomOval = styled.div`
position: absolute;
border-radius: 15px;
border: 1px solid black;
height: 3%;
width: 60%;
bottom: 3%;
left: 20vw;
box-shadow: inset 1px 1px 1px 1px;
`
const Pole = styled.div`
width: 5%;
height: 100%;
float: right;
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
margin-top: 50vh;
margin-bottom: 10px;
border: 2px solid black;
border-right:none;
`
class LogInPage extends Component {
    state = {
        name: '',
        userId: ''
    }
    handleChange = (event) => {
        const inputName = event.target.name
        const userInput = event.target.value
        this.setState({
            [inputName]: userInput
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/api/users', this.state).then((res) => {
            console.log(res.data)
            this.props.history.push(`/user/${res.data._id}`)
        })
    }

    // handleUserIdChange = (event) => {
    //     const inputName = event.target.name
    //     const userInput = event.target.value
    //     const user = { ...this.state.userId }
    //     user[inputName] = userInput
    //     this.setState({
    //         user
    //     })
    // }
    // handleUserIdSubmit = (event) => {
    //     const user = this.state.userId.find((user) => user.userId === this.props.match.params.userId)

    //     axios.get(`/api/users/${userId}`).then((res) => {
    //         this.setState({
    //             user: res.data.user,
    //             team: res.data.user.team
    //         })
    //         return (
    //             this.props.history.push(`/user/${userId}`)
    //         )
    //     })
    // }
    render() {
        return (
            <PokedexContainer>
                <PokedexContainer className="bigWhiteDot">
                    <BlueDot>
                    </BlueDot>
                </PokedexContainer>
                <PokedexContainer className="redDot"></PokedexContainer>
                <PokedexContainer className="yellowDot"></PokedexContainer>
                <PokedexContainer className="greenDot"></PokedexContainer>
                <PokedexLid>
                    <Pole>
                        <MiniPole1></MiniPole1>
                        <MiniPole2></MiniPole2>
                    </Pole>
                    <LidTopBorder className="lidTopBorder"></LidTopBorder>
                    <Trapezoid className="trapezoid"></Trapezoid>
                    <YellowTriangle className="yellowTriangle">
                        <InnerTriangle></InnerTriangle>
                    </YellowTriangle>
                    <LoginContainer>
                        <h1>Log In</h1>
                        {/* <div>
                            <input type="text"
                                name="userId"
                                placeholder="User ID"
                                onChange={this.handleUserIdChange} />
                            <button onClick={this.getTeamInfo}>Search</button>
                        </div> */}
                        {this.props.users.map((user) => {
                            return (
                                <div key={user._id}><Link key={user._id} to={`user/${user._id}`}>{user.userId}</Link></div>
                            )
                        })}
                    </LoginContainer>
                    <CreateUser>
                        <h1>New Users</h1>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="First and Last Name"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                            <input
                                type="text"
                                name="userId"
                                placeholder="User ID"
                                value={this.state.userId}
                                onChange={this.handleChange}
                            />
                            <button type="submit">Create</button>
                        </form>
                    </CreateUser>
                    <BottomOval className="bottomOval"></BottomOval>
                </PokedexLid>
            </PokedexContainer>
        );
    }
}

export default LogInPage;