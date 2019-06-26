import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../components/form';
import InputBox from '../components/input-box';

export default connect(state => ({
    status: state.ingredients.status,
    ingredients: state.ingredients.data
}), dispatch => ({
    fireGetIngredientsRequest: payload => dispatch({ type: 'GET_INGREDIENTS_REQUEST', payload })
}))(
    class IngredientsPage extends Component {
        constructor(props) {
            super(props);

            this.onButtonPress = this.onButtonPress.bind(this);
        }

        componentDidMount() {
            if (this.props.status === 'no_data') {
                this.props.fireGetIngredientsRequest();
            }
        }

        onButtonPress(event) {
            event.preventDefault();
            console.log('Ingredients requested');
            this.props.fireGetIngredientsRequest();
        }

        render() {
            console.log(this.props.status);
            return (
                <div>
                    <h4>List ingredients</h4>
                    <button onClick={event => this.onButtonPress(event)}>
                        Refresh ingredients
                    </button>
                    {this.props.status === 'pending' &&
                        <div>Loading ingredients..</div>
                    }
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
                        <InputBox
                            name='new_field'
                            placeholderText='Test'
                        />
                    </Form>
                    {this.props.status === 'adding' &&
                        <div>Adding your new ingredient..</div>
                    }
                    {this.props.status === 'exists' &&
                        <div style={{color: 'red'}}>That already exists!</div>
                    }
                </div>
            );
        }
    }
);