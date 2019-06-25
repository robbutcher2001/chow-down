import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../components/form';
import InputBox from '../components/input-box';

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
                    <h1>Test page</h1>
                    <h4>List ingredients</h4>
                    <button onClick={event => this.onButtonPress(event)}>
                        Press me to get ingredients
                    </button>
                    <ul>
                        {this.props.ingredients.map((value, index) =>
                            <li key={index}>{value}</li>
                        )}
                    </ul>
                    <h4>Add ingredient</h4>
                    <Form
                        payloadType='PUT_INGREDIENT_REQUEST'
                        submitText='Add ingredient'>
                        <InputBox
                            name='ingredient'
                            placeholderText='New ingredient name'
                        />
                    </Form>
                </div>
            );
        }
    }
);