import React, { Component } from 'react';

class PokedexMove extends Component {
    render() {
        return (
            <div>
                <h5>{this.props.pokedexmove.move.name}</h5>
            </div>
        );
    }
}

export default PokedexMove;