import React, { Component } from 'react';

class IngredientsPage extends Component {
    constructor(props) {
        super(props);

        this.onButtonPress = this.onButtonPress.bind(this);
    }

    onButtonPress(event) {
        event.preventDefault();
        console.log('button pressed');
    }

    render() {
        return (
            <div>
                <h3>Test page</h3>
                <button onClick={event => this.onButtonPress(event)}>
                    Press me to get ingredients
                </button>
            </div>
        );
    }
}

export default IngredientsPage;