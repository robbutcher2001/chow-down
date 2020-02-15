import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GlobalState } from '../store';
import { Recipe, PostRecipeApiRequest } from '../store/domain/recipes/types';
import { Unit, GetUnitsApiRequest } from '../store/domain/units/types';
import { Ingredient, GetIngredientsApiRequest } from '../store/domain/ingredients/types';
import { postRecipesRequest } from '../store/domain/recipes/actions';
import { getUnitsRequest } from '../store/domain/units/actions';
import { getIngredientsRequest } from '../store/domain/ingredients/actions';

import Main from '../components/Main';
import Form from '../components/Form';
import InputBox from '../components/InputBox';
import ImageSelector from '../components/ImageSelector';
import { LoadingBox, ErrorBox } from '../components/MessageBox';
import Textarea from '../components/Textarea';
import RecipeIngredients from '../components/RecipeIngredients';
import StarRating from '../components/StarRating';

interface StateProps {
  error: string,
  failure: string,
  units: Unit[],
  ingredients: Ingredient[],
  ui: {
    pending: {
      post: boolean
      getRecipeIngredients: boolean
    }
  }
};

interface DispatchProps {
  postRecipe: (form: Recipe) => PostRecipeApiRequest,
  getUnits: () => GetUnitsApiRequest,
  getIngredients: () => GetIngredientsApiRequest
};

interface OwnProps { };

interface OwnState { };

type CombinedProps = StateProps & DispatchProps & OwnProps;

class NewRecipePage extends Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);
  };

  componentDidMount = () => {
    this.props.getUnits();
    this.props.getIngredients();
  };

  addRecipe = (form: Recipe) => this.props.postRecipe(form);

  render = () => (
    <Main title='New recipe' >
      {this.props.failure &&
        <ErrorBox message={this.props.failure} />
      }
      {this.props.error ?
        <ErrorBox message={this.props.error} /> :
        <div>
          {this.props.ui.pending.post ?
            <LoadingBox message='Creating your recipe' /> :
            <Form
              dispatch={this.addRecipe}
              submitText='Add recipe'>
              <InputBox name='title' type='text' label='Title' />
              <Textarea name='description' label='Description' />
              {/* <InputBox name='rating_old' type='number' label='Rating' /> */}
              <StarRating name='rating' label='Rating' />
              <InputBox name='url' type='text' label='Url' />
              <ImageSelector name='image' label='Upload image' />
              <RecipeIngredients
                name='ingredients'
                label='Ingredients for this recipe'
                isPending={this.props.ui.pending.getRecipeIngredients}
                units={this.props.units}
                ingredients={this.props.ingredients}
              />
            </Form>
          }
        </div>
      }
    </Main>
  );
};

const mapStateToProps = ({ app, domain, ui }: GlobalState, ownProps: OwnProps): StateProps => ({
  error: app.error,
  failure: domain.recipe.failure,
  units: domain.unit.units,
  ingredients: domain.ingredient.ingredients,
  ui: {
    pending: {
      post: ui.recipe.postPending,
      getRecipeIngredients: ui.unit.getPending || ui.ingredient.getPending
    }
  }
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
  postRecipe: (form: Recipe) => dispatch(postRecipesRequest(form)),
  getUnits: () => dispatch(getUnitsRequest()),
  getIngredients: () => dispatch(getIngredientsRequest())
});

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>
  (mapStateToProps, mapDispatchToProps)(NewRecipePage);