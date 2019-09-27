import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GlobalState } from '../store';
import { Recipe, GetRecipesApiRequest, PostRecipeApiRequest } from '../store/domain/recipes/types';
import { getRecipesRequest, postRecipesRequest } from '../store/domain/recipes/actions';

import Nav from '../components/nav';
import Form from '../components/form';
import InputBox from '../components/input-box';

interface StateProps {
    failure: string,
    recipes: Recipe[],
    ui: {
        pending: {
            get: boolean,
            post: boolean
        }
    }
};

interface DispatchProps {
    getRecipes: () => GetRecipesApiRequest,
    postRecipe: (form: object) => PostRecipeApiRequest
};

interface OwnProps { };

interface OwnState { };

type CombinedProps = StateProps & DispatchProps & OwnProps;

class RecipesPage extends Component<CombinedProps, OwnState> {
    constructor(props: CombinedProps) {
        super(props);
    }

    requestRecipes = () => this.props.getRecipes();
    addRecipe = (form: object) => this.props.postRecipe(form);

    componentDidMount = () => this.props.getRecipes();

    render = () => {
        console.log(this.props.recipes);
        return (
            <div>
                <Nav />
                <h4>List recipes</h4>
                <button onClick={this.requestRecipes}>
                    Press me to get all recipes
                </button>
                {this.props.ui.pending.get &&
                    <div style={{ color: 'red' }}>Getting..</div>
                }
                {this.props.recipes.map((recipe, index) =>
                    <div key={index} style={{ backgroundColor: '#708090', marginBottom: '2px', padding: '4px', width: '50%' }}>
                        <h4>{recipe.title}</h4>
                        <a href={recipe.url}>{recipe.url}</a>
                        <p>{recipe.description}</p>
                    </div>
                )}
                <h4>Add recipe</h4>
                <Form
                    dispatch={this.addRecipe}
                    submitText='Add recipe'>
                    <InputBox
                        name='title'
                        placeholderText='New recipe title'
                    />
                    <InputBox
                        name='url'
                        placeholderText='New recipe url'
                    />
                    <InputBox
                        name='description'
                        placeholderText='New recipe description'
                    />
                    <InputBox
                        name='image'
                        placeholderText='New recipe image'
                    />
                </Form>
                {this.props.ui.pending.post &&
                    <div>Adding your new recipe..</div>
                }
                {this.props.failure &&
                    <div style={{color: 'red'}}>{this.props.failure}</div>
                }
            </div>
        );
    }
};

const mapStateToProps = ({ domain, ui }: GlobalState, ownProps: OwnProps): StateProps => ({
    failure: domain.recipe.failure,
    recipes: domain.recipe.recipes,
    ui: {
        pending: {
            get: ui.recipe.getPending,
            post: ui.recipe.postPending
        }
    }
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
    getRecipes: () => dispatch(getRecipesRequest()),
    postRecipe: (form: object) => dispatch(postRecipesRequest(form))
});

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>
    (mapStateToProps, mapDispatchToProps)(RecipesPage);