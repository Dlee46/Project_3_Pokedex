import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const PokedexContainer = styled.div`
height: 100vh;
background: red;
text-align: center;
border-radius:2%;
margin: 0 10px;
position: absolute;
border: 1px solid black;
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