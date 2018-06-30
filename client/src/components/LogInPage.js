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
border: 1px solid black;
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
box-sizing:border-box;
`
const LidTopBorder = styled.div`
    position: absolute;
    top: 8vh;
    right: 2.7vh;
    border-bottom: 5.2vh solid black;
    border-left: 5vh solid transparent;
    border-right: 0 solid transparent;
    width: 45vh;
    height:0;
`
const Trapezoid = styled.div`
position: absolute;
top: 8.2vh;
right: 2.9vh;
border-bottom: 5.3vh solid red;
border-left: 5vh solid transparent;
border-right: 0 solid transparent;
height: 0;
width: 44.8vh;
`
const YellowTriangle = styled.div`
position: absolute;
width: 0;
height: 0;
margin: 40% 10px;
border-top: 4vh solid transparent;
border-bottom: 4vh solid transparent;
border-left: 4vh solid black;
`
const InnerTriangle = styled.div`
border-top: 3.5vh solid transparent;
border-bottom: 3.5vh solid transparent;
border-left: 3.5vh solid yellow;
position: relative;
margin: 40% 10.5px;
width: 0;
height:0;
top: -3.5vh;
right: 5.2vh;
`
const BottomOval = styled.div`

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
                    <LidTopBorder className="lidTopBorder"></LidTopBorder>
                    <Trapezoid className="trapezoid"></Trapezoid>
                    <YellowTriangle className="yellowTriangle">
                        <InnerTriangle></InnerTriangle>
                    </YellowTriangle>
                    <LoginContainer>
                        <h1>Log In</h1>
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