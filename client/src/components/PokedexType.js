import React, { Component } from 'react';

class PokedexType extends Component {
    render() {
        return (
            <div>
                <h4>{this.props.pokedextype.type.name}</h4>
            </div>
        );
    }
}

export default PokedexType;