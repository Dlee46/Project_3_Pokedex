import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

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
            this.props.history.push(`/users/${res.data._id}`)
        })
    }
    render() {
        return (
            <div>
                <h1>Log In</h1>
                {this.props.users.map((user) => {
                    return (
                        <div key={user._id}><Link key={user._id} to={`user/${user._id}`}>{user.userId}</Link></div>
                    )
                })}
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
            </div>
        );
    }
}

export default LogInPage;