import React, { Component } from 'react';
import axios from 'axios'

class TeamPage extends Component {
    state = {
        user: {},
        team: []
    }
    componentDidMount() {
        const userId = this.props.match.params.userId
        axios.get(`/api/users/${userId}`).then((res) => {
            this.setState({
                user: res.data.user,
                team: res.data.user.team
            })
        })
    }
    newTeam = () => {
        const userId = this.props.match.params.userId
        axios.post(`/api/users/${userId}/team`).then((res) => {
            this.setState({
                user: res.data.user,
                team: res.data.user.team
            })
        })
    }

    updateTeam = (teamId) => {
        const userId = this.props.match.params.userId
        const teamToUpdate = this.state.team.find(team => team._id === teamId)
        axios.patch(`/api/users/${userId}/team/${teamId}`, teamToUpdate).then((res) => {
            this.setState({
                user: res.data.user,
                ideas: res.data.user.team
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
    render() {
        return (
            <div>
                <button onClick={this.newTeam}>New Team</button>
                <div>

                </div>
            </div>
        );
    }
}

export default TeamPage;