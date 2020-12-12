import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';

import { GlobalState } from '../store';
import { Recipe, PutRecipeUpdateApiRequest } from '../store/domain/recipes/types';
import { Tag } from '../store/domain/tags/types';
import { putRecipeUpdateRequest } from '../store/domain/recipes/actions';

import RecipeComponent from '../components/Recipes/Recipe';
import { ZeroMarginedMain } from '../components/Main';
import { NegativeBox } from '../components/MessageBox';

interface StateProps {
  error: string,
  failures: {
    recipe: string,
    tag: string
  },
  recipes: Recipe[],
  tags: Tag[],
  ui: {
    pending: {
      gets: {
        recipes: boolean,
        tags: boolean
      },
      put: {
        tags: boolean
      }
    }
  }
};

interface DispatchProps {
  putRecipeUpdate: (recipe: Recipe) => PutRecipeUpdateApiRequest
};

interface RecipeUrlParamProps {
  id: string
};

interface OwnState {
  recipe: Recipe,
  tag: {
    loading: boolean;
    tags: Tag[];
  }
};

type CombinedProps = StateProps & DispatchProps & RouteComponentProps<RecipeUrlParamProps>;

class RecipePage extends Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);

    this.state = {
      recipe: null,
      tag: {
        loading: false,
        tags: []
      }
    }
  }

  findRecipe = (id: string) => this.props.recipes.find(recipe => recipe.id === id);

  updateRecipe = (recipe: Recipe) => {
    console.log(recipe);
    this.props.putRecipeUpdate(recipe);
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    const recipe: Recipe = this.findRecipe(id);

    if (recipe) {
      this.setState({
        recipe,
        tag: {
          // TODO: loading not actually used because tags are always present when you visit this page
          // but when direct page visiting is supported, this will need to be used
          loading: this.props.ui.pending.gets.tags,
          tags: this.props.tags
        }
      });
    }
    else {
      // this.props.getDay(date);
    }
  };

  componentDidUpdate = (prevProps: CombinedProps, prevState: OwnState) => {
    // const { date } = this.props.match.params;
    // const day: Day = this.findDay(date);

    // if (day && day !== prevState.day) {
    //   this.setState({
    //     day
    //   });
    // }

    if (this.props.recipes !== prevProps.recipes) {
      const { id } = this.props.match.params;
      const recipe: Recipe = this.findRecipe(id);

      this.setState({ recipe });
    }
  };

  render = () => (
    <ZeroMarginedMain>
      {this.props.failures.recipe &&
        <NegativeBox message={this.props.failures.recipe} />
      }
      {console.log(this.props.recipes)}
      {this.props.error ?
        <NegativeBox message={this.props.error} /> :
        <RecipeComponent
          recipe={this.state.recipe}
          tag={{loading: this.state.tag.loading, tags: this.state.tag.tags}}
          updateRecipe={this.updateRecipe}
        />
      }
    </ZeroMarginedMain>
  );
};

const mapStateToProps = ({ app, domain, ui }: GlobalState): StateProps => ({
  error: app.error.message,
  failures: {
    recipe: domain.recipe.failure,
    tag: domain.tag.failure
  },
  recipes: domain.recipe.recipes,
  tags: domain.tag.tags,
  ui: {
    pending: {
      gets: {
        recipes: ui.recipe.getPending,
        tags: ui.tag.getPending
      },
      put: {
        tags: ui.tag.putPending
      }
    }
  }
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  putRecipeUpdate: (recipe: Recipe) => dispatch(putRecipeUpdateRequest(recipe))
});

export default connect<StateProps, DispatchProps, null, GlobalState>
  (mapStateToProps, mapDispatchToProps)(RecipePage);