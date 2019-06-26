import React, { Component } from 'react';
import { connect } from 'react-redux';

export default connect(state => ({
    recipes: state.recipes
}), dispatch => ({
    fireGetRecipesRequest: () => dispatch({ type: 'GET_RECIPES_REQUEST' })
}))(
    class IngredientsPage extends Component {
        constructor(props) {
            super(props);

            this.onButtonPress = this.onButtonPress.bind(this);
        }

        onButtonPress(event) {
            event.preventDefault();
            console.log('Recipes requested');
            this.props.fireGetRecipesRequest();
        }

        render() {
            console.log(this.props.recipes);
            return (
                <div>
                    <h4>List recipes</h4>
                    <button onClick={event => this.onButtonPress(event)}>
                        Press me to get all recipes
                    </button>
                    {this.props.recipes.map((recipe, index) =>
                        <div key={index} style={{backgroundColor: '#708090', marginBottom: '2px', padding: '4px',width: '50%'}}>
                            <h4>{ recipe.title }</h4>
                            <a href={ recipe.url }>{ recipe.url }</a>
                            <p>{ recipe.description }</p>
                        </div>
                    )}
                </div>
            );
        }
    }
);