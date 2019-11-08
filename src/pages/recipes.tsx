import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GlobalState } from '../store';
import { Recipe, GetRecipesApiRequest, PostRecipeApiRequest } from '../store/domain/recipes/types';
import { getRecipesRequest, postRecipesRequest } from '../store/domain/recipes/actions';

import Loading from '../components/Loading';
import Page from '../components/page';
import GridUl from '../components/grid-ul';
import GridLi from '../components/grid-li';
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

    recipeGridListItems = (recipes: Recipe[]) =>
        recipes.map((recipe, i) =>
            <GridLi
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

        return (
            <Page title='Your recipes'>
                <GridUl>
                    {this.recipeGridListItems(this.props.recipes)}
                </GridUl>
                <h4>List recipes</h4>
                <button onClick={this.requestRecipes}>
                    Press me to get all recipes
                    </button>
                {this.props.ui.pending.get &&
                    <div style={{ color: 'red' }}>Getting..</div>
                }
                <h2>Add a new recipe</h2>
                <Form
                    dispatch={this.addRecipe}
                    submitText='Add recipe'>
                    <InputBox
                        name='title'
                        placeholderText='Title'
                    />
                    <InputBox
                        name='description'
                        placeholderText='Description'
                    />
                    <InputBox
                        name='rating'
                        placeholderText='Rating'
                    />
                    <InputBox
                        name='url'
                        placeholderText='Url'
                    />
                    <InputBox
                        name='image'
                        placeholderText='Upload image'
                    />
                </Form>
                {this.props.ui.pending.post &&
                    <div>Adding your new recipe..</div>
                }
                {this.props.failure &&
                    <div style={{ color: 'red' }}>{this.props.failure}</div>
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
    postRecipe: (form: object) => dispatch(postRecipesRequest(form))
});

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>
    (mapStateToProps, mapDispatchToProps)(RecipesPage);