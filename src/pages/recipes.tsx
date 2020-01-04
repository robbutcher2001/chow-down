import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GlobalState } from '../store';
import { Recipe, GetRecipesApiRequest, PostRecipeApiRequest } from '../store/domain/recipes/types';
import { getRecipesRequest, postRecipesRequest } from '../store/domain/recipes/actions';

import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import Page from '../components/page';
import RecipeGrid from '../components/RecipeGrid';
import RecipeCard from '../components/RecipeCard';
import Form from '../components/form';
import InputBox from '../components/input-box';

interface StateProps {
    error: string,
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
    postRecipe: (form: Recipe) => PostRecipeApiRequest
};

interface OwnProps { };

interface OwnState { };

type CombinedProps = StateProps & DispatchProps & OwnProps;

class RecipesPage extends Component<CombinedProps, OwnState> {
    constructor(props: CombinedProps) {
        super(props);
    }

    requestRecipes = () => this.props.getRecipes();
    addRecipe = (form: Recipe) => this.props.postRecipe(form);

    componentDidMount = () => this.props.getRecipes();

    createRecipeCards = (recipes: Recipe[]) =>
        recipes.map((recipe, i) =>
            <RecipeCard
                key={i}
                title={recipe.title}
                description={recipe.description}
                rating={recipe.rating}
                imageUrl={recipe.image}
                imageAlt={recipe.title}
            />
        );

    render = () => {
        console.log(this.props.recipes);

        if (this.props.ui.pending.get) {
            return (
                <Page title='Your recipes'>
                    <Loading />
                </Page>
            )
        };

        if (this.props.failure) {
            return (
                <Page title='Your recipes'>
                    <MessageBox message={this.props.failure} />
                </Page>
            )
        };

        return (
            <Page title='Your recipes'>
                <RecipeGrid>
                    {this.createRecipeCards(this.props.recipes)}
                </RecipeGrid>
                <h4>List recipes</h4>
                <button onClick={this.requestRecipes}>
                    Press me to get all recipes
                </button>
                <h2>Add a new recipe</h2>
                <Form
                    dispatch={this.addRecipe}
                    submitText='Add recipe'>
                    <InputBox
                        name='title'
                        type='text'
                        placeholderText='Title'
                    />
                    <InputBox
                        name='description'
                        type='text'
                        placeholderText='Description'
                    />
                    <InputBox
                        name='rating'
                        type='number'
                        placeholderText='Rating'
                    />
                    <InputBox
                        name='url'
                        type='text'
                        placeholderText='Url'
                    />
                    <InputBox
                        name='image'
                        type='text'
                        placeholderText='Upload image'
                    />
                </Form>
                {this.props.ui.pending.post &&
                    <div>Adding your new recipe..</div>
                }
                {this.props.failure &&
                    <div style={{ color: 'orange' }}>{this.props.failure}</div>
                }
                {this.props.error &&
                    <div style={{ color: 'red' }}>{this.props.error}</div>
                }
            </Page>
        );
    }
};

const mapStateToProps = ({ app, domain, ui }: GlobalState, ownProps: OwnProps): StateProps => ({
    error: app.error,
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
    postRecipe: (form: Recipe) => dispatch(postRecipesRequest(form))
});

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>
    (mapStateToProps, mapDispatchToProps)(RecipesPage);