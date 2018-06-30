import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

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
        axios.post(`/api/users/${userId}/team`, this.state).then((res) => {
            this.setState({
                team: res.data.user.team,
                user: res.data.user
            })
            return (
                this.props.history.push(`/users/${userId}/team/`)
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
                <div>
                    <button><Link to='/login'>Log Out</Link></button>
                </div>
            </div>
        );
    }
}

export default TeamPage;