import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GlobalState } from '../store';
import { Recipe, GetRecipesApiRequest } from '../store/domain/recipes/types';
import { Day, PutDayApiRequest } from '../store/domain/days/types';
import { UserAction } from '../store/app/user/types';
import { getRecipesRequest } from '../store/domain/recipes/actions';
import { putDayRequest } from '../store/domain/days/actions';
import { clearUserIsSelectingDay } from '../store/app/user/actions';

import Main, { CallToAction } from '../components/Main';
import Search from '../components/Search';
import TagSelector from '../components/TagSelector';
import Tag from '../components/Tag';
import RecipeGrid from '../components/Recipes/RecipeGrid';
import { NegativeBox } from '../components/MessageBox';

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
      get: boolean,
      post: boolean
    }
  }
};

interface DispatchProps {
  getRecipes: () => GetRecipesApiRequest,
  putDay: (day: Day) => PutDayApiRequest,
  clearSelectingDay: () => UserAction
};

interface OwnProps { };

interface OwnState {
  filteredRecipes: Recipe[]
};

type CombinedProps = StateProps & DispatchProps & OwnProps;

class RecipesPage extends Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);

    this.state = {
      filteredRecipes: []
    };
  }

  componentDidMount = () => !this.props.ui.pending.post && this.props.getRecipes();

  updateFilteredRecipes = (filteredRecipes: Recipe[]) => this.setState({ filteredRecipes });

  componentWillUnmount = () => this.props.clearSelectingDay();

  render = () => (
    <Main title='Your recipes' cta={!this.props.selectedDay ? cta : undefined} >
      {this.props.failure &&
        <NegativeBox message={this.props.failure} />
      }
      {this.props.error ?
        <NegativeBox message={this.props.error} /> :
        <>
          <Search
            label='Search'
            searchableItems={this.props.recipes}
            resultsCb={this.updateFilteredRecipes} />
          <TagSelector>
            <Tag label='Slimming world' $colour='#d73a49' $large />
            <Tag label='Chicken' $colour='#009688' $large />
            <Tag label='Beef' $colour='#ca4a6c' $large />
            <Tag label='Vegetables' $colour='#005ea5' $large />
            <Tag label='Under 20 mins' $colour='#6f42c1' $large />
            <Tag label='Quick meals' $colour='#6f42c1' $large />
            <Tag label='Under 500 calories' $colour='#6f42c1' $large />
          </TagSelector>
          <RecipeGrid
            isLoading={this.props.ui.pending.get || this.props.ui.pending.post}
            recipes={this.state.filteredRecipes}
            selectedDay={this.props.selectedDay}
            putDay={this.props.putDay}
          />
        </>
      }
    </Main>
  );
};

const mapStateToProps = ({ app, domain, ui }: GlobalState, _ownProps: OwnProps): StateProps => ({
  error: app.error.message,
  failure: domain.recipe.failure,
  recipes: domain.recipe.recipes,
  selectedDay: app.user.selectedDay,
  ui: {
    pending: {
      get: ui.recipe.getPending,
      post: ui.recipe.postPending
    }
  }
});

const mapDispatchToProps = (dispatch: Dispatch, _ownProps: OwnProps): DispatchProps => ({
  getRecipes: () => dispatch(getRecipesRequest()),
  putDay: (day: Day) => dispatch(putDayRequest(day)),
  clearSelectingDay: () => dispatch(clearUserIsSelectingDay())
});

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>
  (mapStateToProps, mapDispatchToProps)(RecipesPage);