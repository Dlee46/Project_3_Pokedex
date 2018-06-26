import React, { Component } from 'react';

class TeamPage extends Component {
    state = {
        user: {},
        team: []
    }
    componentDidMount() {
        const userId = this.props.match.params.userId
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default TeamPage;