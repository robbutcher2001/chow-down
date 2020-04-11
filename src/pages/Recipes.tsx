import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GlobalState } from '../store';
import { Recipe, GetRecipesApiRequest } from '../store/domain/recipes/types';
import { Day, PutDayApiRequest } from '../store/domain/days/types';
import { UserAction } from '../store/app/user/types';
import { getRecipesRequest } from '../store/domain/recipes/actions';
import { putDaysRequest } from '../store/domain/days/actions';
import { clearUserIsSelectingDay } from '../store/app/user/actions';

import Main, { CallToAction } from '../components/Main';
import RecipeGrid from '../components/Recipes/RecipeGrid';
import { ErrorBox, LoadingBox } from '../components/MessageBox';

const cta: CallToAction = {
    text: 'New recipe',
    link: '/recipes/new'
};

interface StateProps {
    error: string,
    failure: string,
    recipes: Recipe[],
    selectedDay: string,
    ui: {
        pending: {
            get: boolean
        }
    }
};

interface DispatchProps {
    getRecipes: () => GetRecipesApiRequest,
    putDay: (day: Day) => PutDayApiRequest,
    clearSelectingDay: () => UserAction
};

interface OwnProps { };

interface OwnState { };

type CombinedProps = StateProps & DispatchProps & OwnProps;

class RecipesPage extends Component<CombinedProps, OwnState> {
    constructor(props: CombinedProps) {
        super(props);
    }

    componentDidMount = () => this.props.getRecipes();

    componentWillUnmount = () => this.props.clearSelectingDay();

    render = () => (
        <Main title='Your recipes' cta={cta} >
            {this.props.failure &&
                <ErrorBox message={this.props.failure} />
            }
            {this.props.error ?
                <ErrorBox message={this.props.error} /> :
                <div>
                    {this.props.ui.pending.get ?
                        <LoadingBox message='Fetching recipes' /> :
                        <RecipeGrid
                          recipes={this.props.recipes}
                          selectedDay={this.props.selectedDay}
                          putDay={this.props.putDay}
                        />
                    }
                </div>
            }
        </Main>
    );
};

const mapStateToProps = ({ app, domain, ui }: GlobalState, ownProps: OwnProps): StateProps => ({
    error: app.error.message,
    failure: domain.recipe.failure,
    recipes: domain.recipe.recipes,
    selectedDay: app.user.selectedDay,
    ui: {
        pending: {
            get: ui.recipe.getPending
        }
    }
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
    getRecipes: () => dispatch(getRecipesRequest()),
    putDay: (day: Day) => dispatch(putDaysRequest(day)),
    clearSelectingDay: () => dispatch(clearUserIsSelectingDay())
});

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>
    (mapStateToProps, mapDispatchToProps)(RecipesPage);