import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

class TeamPage extends Component {
    state = {
        user: {},
        team: []
    }

    static getDerivedStateFromProps(nextProps, previousState) {
        // static makes this function a function you cant call
        // nextProps brings in all the props like this.props which cannot be used
        // previous state goes back to the original state
        const userId = nextProps.match.params.userId
        //return true when you find the one you want
        const newUser = nextProps.users.find((singleUser) => {
            // nextProps is bringing in all the objects of the user and finding one id that matches with the url id
            return userId == singleUser._id
        })

        const updatedState = { ...previousState }
        // makes a copy the this.state
        updatedState.user = newUser
        // sets the states since setState cannot be used to the newUser
        return updatedState
    }

    // updateTeam = (teamId) => {
    //     const userId = this.props.match.params.userId
    //     const teamToUpdate = this.state.team.find(team => team._id === teamId)
    //     axios.patch(`/api/users/${userId}/team/${teamId}`, teamToUpdate).then((res) => {
    //         this.setState({
    //             user: res.data.user,
    //             ideas: res.data.user.team
    //         })
    //     })
    // }

    deleteTeam = (teamId) => {
        const userId = this.props.match.params.userId
        axios.delete(`/api/users/${userId}/team/${teamId}`).then((res) => {
            console.log("DELETE", res.data.user)
            this.setState({
                user: res.data.user,
                team: res.data.user.team
            })
        })
    }
    handleChange = (event) => {
        const inputName = event.target.name
        const userInput = event.target.value
        console.log("inputName", inputName)
        console.log("userInput", userInput)
        this.setState({
            [inputName]: userInput
        })
    }
    handleSubmitNew = (event) => {
        event.preventDefault()
        const userId = this.props.match.params.userId
        axios.post(`/api/users/${userId}/team`, this.state).then((res) => {
            return (
                this.props.history.push(`/users/${userId}/team/`)
            )
        })
    }
    render() {
        console.log("CONSOLE PATH", this.state.user)
        console.log(this.state)
        // since the log shows empty of the first render we use an if statement
        if (this.state.user) {
            console.log("CONSOLE TEAM", this.state.user.team[0]._id)
        }
        const user = this.state.user || {}
        const team = user.team || []
        const listOfTeams = team.map(team => {
            const userId = this.props.match.params.userId
            const teamUrl = `/users/${userId}/team/${team._id}`
            return (
                <div key={team._id}>
                    <Link to={teamUrl}>{team.name}</Link>
                    <button onClick={() => this.deleteTeam(team._id)}>Delete</button>
                </div>
            )
        })



        return (
            <div>
                <form onSubmit={this.handleSubmitNew}>
                    <input
                        type="text"
                        name="name"
                        onChange={this.handleChange} />
                    <button>New Team</button>
                </form>
                <div>
                    {listOfTeams}
                </div>
            </div>
        );
    }
}

export default TeamPage;