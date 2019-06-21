import React, { Component } from 'react';
import { connect } from 'react-redux';

export default connect(state => ({
    ingredients: state.ingredients
}), dispatch => ({
    fireGetIngredientsRequest: payload => dispatch({ type: 'GET_INGREDIENTS_REQUEST', payload })
}))(
    class IngredientsPage extends Component {
        constructor(props) {
            super(props);

            this.onButtonPress = this.onButtonPress.bind(this);
        }

        onButtonPress(event) {
            event.preventDefault();
            console.log('button pressed');
            this.props.fireGetIngredientsRequest();
        }

        render() {
            console.log(this.props.ingredients);
            return (
                <div>
                    <h3>Test page</h3>
                    <button onClick={event => this.onButtonPress(event)}>
                        Press me to get ingredients
                    </button>
                    <ul>
                        {this.props.ingredients.map((value, index) =>
                            <li key={index}>{value}</li>
                        )}
                    </ul>
                </div>
            );
        }
    }
);