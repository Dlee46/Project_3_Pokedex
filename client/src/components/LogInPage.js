import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const PokedexContainer = styled.div`
height: 80vh;
background: red;
text-align: center;
border-radius:5%;
margin:5% 30%;
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
margin: 3%;
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
h1{
    font-family: 'Permanent Marker', cursive;
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
const LoginContainer = styled.div`
margin:5%;
overflow:scroll;
`

const CreateUser = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin: 1%;
input{
    margin: 4%;
}
`
const PokedexLid = styled.div`
border: 2px solid black;
border-radius: 0 0 5% 5%;
height: 65.7vh;
background: red;
`
const LidTopBorder = styled.div`
    position: absolute;
    top: 18vh;
    right: 30vw;
    border-bottom: 3vw solid black;
    border-left: 3.5vw solid transparent;
    border-right: 0 solid transparent;
    width: 17%;
    height: 0;
`
const Trapezoid = styled.div`
position: absolute;
top: 18.4vh;
right: 30.3vw;
border-bottom: 4vw solid red;
border-left: 4.5vw solid transparent;
border-right: 0 solid transparent;
height: 0;
width: 16.7%;
`
const YellowTriangle = styled.div`
position: absolute;
width: 0;
height: 0;
margin:28vh 2vw;
border-top: 2vw solid transparent;
border-bottom: 2vw solid transparent;
border-left: 2vw solid black;
`
const InnerTriangle = styled.div`
border-top: 1.5vw solid transparent;
border-bottom: 1.5vw solid transparent;
border-left: 1.5vw solid yellow;
position: relative;
margin: 0 4vw;
width: 0;
height:0;
top: -1.5vw;
right: 5.8vw;
`
const BottomOval = styled.div`
position: absolute;
border-radius: 15px;
border: 1px solid black;
height: 3%;
width: 30%;
bottom: 15%;
left: 35.5vw;
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
margin-top: 30vh;
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
                            <br />
                            <input
                                type="text"
                                name="userId"
                                placeholder="User ID"
                                value={this.state.userId}
                                onChange={this.handleChange}
                            />
                            <br />
                            <button type="submit">
                                <img src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG" alt="" width="30" height="30" />
                            </button>
                        </form>
                    </CreateUser>
                    <BottomOval className="bottomOval"></BottomOval>
                </PokedexLid>
            </PokedexContainer>
        );
    }
}

export default LogInPage;

