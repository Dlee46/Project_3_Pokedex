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
margin-top: 10px;
border: 1px solid black;
`

const CreateUser = styled.div`
border: 1px solid black;
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
            </PokedexContainer>
        );
    }
}

export default LogInPage;