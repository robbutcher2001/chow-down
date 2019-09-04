import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Actions } from '../globals/constants';

interface IngredientsProps {
    onChange: (text: string) => void
};

interface IngredientsState {
    recipes: string, // 'INIT', 'LOADING' | 'LOADED' | 'ERROR',
    notes: NoteModel[],
    errorMessage?: string
};

export default connect((state: IngredientsState) => ({
    pending: state.recipes.status.pending,
    recipes: state.recipes.data
}), (dispatch: Dispatch) => ({
    fireRequest: () => dispatch({ type: Actions.recipes.GET_RECIPES_REQUEST })
}))(
    //convert this back to just Component<>
    class IngredientsPage extends React.Component<IngredientsProps, any> {
        constructor(props: IngredientsProps) {
            super(props);

            this.onButtonPress = this.onButtonPress.bind(this);
        }

        onButtonPress(event) {
            event.preventDefault();
            console.log('Recipes requested');
            this.props.fireRequest();
        }

        render() {
            console.log(this.props.recipes);
            return (
                <div>
                    <h4>List recipes</h4>
                    <button onClick={event => this.onButtonPress(event)}>
                        Press me to get all recipes
                    </button>
                    {this.props.pending &&
                        <div style={{ color: 'red' }}>Getting..</div>
                    }
                    {this.props.recipes.map((recipe, index) =>
                        <div key={index} style={{ backgroundColor: '#708090', marginBottom: '2px', padding: '4px', width: '50%' }}>
                            <h4>{recipe.title}</h4>
                            <a href={recipe.url}>{recipe.url}</a>
                            <p>{recipe.description}</p>
                        </div>
                    )}
                </div>
            );
        }
    }
);