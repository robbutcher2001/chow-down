import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';

import { GlobalState } from '../store';
import { Recipe } from '../store/domain/recipes/types';

import RecipeComponent from '../components/Recipes/Recipe';
import { ZeroMarginedMain } from '../components/Main';
import { ErrorBox } from '../components/MessageBox';

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

interface DispatchProps { };

interface RecipeUrlParamProps {
  id: string
};

interface OwnState {
  recipe: Recipe
};

type CombinedProps = StateProps & DispatchProps & RouteComponentProps<RecipeUrlParamProps>;

class RecipePage extends Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);

    this.state = {
      recipe: null
    }
  }

  findRecipe = (id: string) => this.props.recipes.find(recipe => recipe.id === id);

  componentDidMount = () => {
    const { id } = this.props.match.params;
    const recipe: Recipe = this.findRecipe(id);

    if (recipe) {
      this.setState({
        recipe
      });
    }
    else {
      // this.props.getDay(date);
    }
  };

  componentDidUpdate = (_prevProps: CombinedProps, prevState: OwnState) => {
    // const { date } = this.props.match.params;
    // const day: Day = this.findDay(date);

    // if (day && day !== prevState.day) {
    //   this.setState({
    //     day
    //   });
    // }
  };

  render = () => (
    <ZeroMarginedMain>
      {this.props.failure &&
        <ErrorBox message={this.props.failure} />
      }
      {this.props.error ?
        <ErrorBox message={this.props.error} /> :
        <RecipeComponent recipe={this.state.recipe} />
      }
    </ZeroMarginedMain>
  );
};

const mapStateToProps = ({ app, domain, ui }: GlobalState): StateProps => ({
  error: app.error.message,
  failure: domain.recipe.failure,
  recipes: domain.recipe.recipes,
  ui: {
    pending: {
      get: ui.recipe.getPending
    }
  }
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({});

export default connect<StateProps, DispatchProps, null, GlobalState>
  (mapStateToProps, mapDispatchToProps)(RecipePage);