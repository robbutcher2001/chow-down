import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GlobalState } from '../store';
import { Recipe, GetRecipesApiRequest } from '../store/domain/recipes/types';
import { getRecipesRequest } from '../store/domain/recipes/actions';

import Main, { CallToAction } from '../components/Main';
import RecipeGrid from '../components/Recipes/RecipeGrid';

const cta: CallToAction = {
    text: 'New recipe',
    link: '/recipes/new'
};

interface StateProps {
    error: string,
    failure: string,
    recipes: Recipe[],
    ui: {
        pending: {
            get: boolean
        }
    }
};

interface DispatchProps {
    getRecipes: () => GetRecipesApiRequest
};

interface OwnProps { };

interface OwnState { };

type CombinedProps = StateProps & DispatchProps & OwnProps;

class RecipesPage extends Component<CombinedProps, OwnState> {
    constructor(props: CombinedProps) {
        super(props);
    }

    componentDidMount = () => this.props.getRecipes();

    render = () => (
        <Main
            title='Your recipes'
            loading={this.props.ui.pending.get}
            cta={cta}
            message={this.props.failure}
            error={this.props.error}
        >
            <RecipeGrid recipes={this.props.recipes} />
            {this.props.failure &&
                <div style={{ color: 'orange' }}>{this.props.failure}</div>
            }
            {this.props.error &&
                <div style={{ color: 'red' }}>{this.props.error}</div>
            }
        </Main>
    );
};

const mapStateToProps = ({ app, domain, ui }: GlobalState, ownProps: OwnProps): StateProps => ({
    error: app.error,
    failure: domain.recipe.failure,
    recipes: domain.recipe.recipes,
    ui: {
        pending: {
            get: ui.recipe.getPending
        }
    }
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
    getRecipes: () => dispatch(getRecipesRequest())
});

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>
    (mapStateToProps, mapDispatchToProps)(RecipesPage);