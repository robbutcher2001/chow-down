import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';

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
import { NegativeBox } from '../components/MessageBox';
import Textarea from '../components/Textarea';
import RecipeIngredients from '../components/RecipeIngredients';
import InputStarRating from '../components/InputStarRating';

interface StateProps {
  error: string,
  failure: string,
  units: Unit[],
  ingredients: Ingredient[],
  ui: {
    pending: {
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

type CombinedProps = StateProps & DispatchProps & OwnProps & RouteComponentProps;

class NewRecipePage extends Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);
  };

  componentDidMount = () => {
    this.props.getUnits();
    this.props.getIngredients();
  };

  redirectToRecipes = () => this.props.history.push('/recipes');

  addRecipe = (form: Recipe) => {
    const dispatch = this.props.postRecipe(form);
    this.redirectToRecipes();

    return dispatch;
  };

  render = () => (
    <Main title='New recipe' >
      {this.props.failure &&
        <NegativeBox message={this.props.failure} />
      }
      {this.props.error ?
        <NegativeBox message={this.props.error} /> :
        <Form
          name='recipeForm'
          dispatch={this.addRecipe}
          submitText='Add recipe'>
          <InputBox
            name='title'
            type='text'
            label='Title'
            validator={(value: string) => value.length > 0}
          />
          <Textarea
            name='description'
            label='Description'
            validator={(value: string) => value.length > 10}
          />
          <InputStarRating name='rating' label='Rating' />
          <InputBox
            name='url'
            type='text'
            label='Web link'
            validator={(value: string) =>
              value.length > 0 &&
              (value.startsWith('http://') ||
                value.startsWith('https://') ||
                value.startsWith('www.')
              )
            }
          />
          <ImageSelector
            name='image'
            label='Upload image'
            validator={(files: FileList) => files.length === 1}
          />
          <RecipeIngredients
            name='ingredients'
            label='Ingredients for this recipe'
            isPending={this.props.ui.pending.getRecipeIngredients}
            units={this.props.units}
            ingredients={this.props.ingredients}
            quantityValidator={(quantity: string) => quantity !== '0'}
            idValidator={(id: string) => id !== 'PLACEHOLDER'}
          />
        </Form>
      }
    </Main>
  );
};

const mapStateToProps = ({ app, domain, ui }: GlobalState, _ownProps: OwnProps): StateProps => ({
  error: app.error.message,
  failure: domain.recipe.failure,
  units: domain.unit.units,
  ingredients: domain.ingredient.ingredients,
  ui: {
    pending: {
      getRecipeIngredients: ui.unit.getPending || ui.ingredient.getPending
    }
  }
});

const mapDispatchToProps = (dispatch: Dispatch, _ownProps: OwnProps): DispatchProps => ({
  postRecipe: (form: Recipe) => dispatch(postRecipesRequest(form)),
  getUnits: () => dispatch(getUnitsRequest()),
  getIngredients: () => dispatch(getIngredientsRequest())
});

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>
  (mapStateToProps, mapDispatchToProps)(NewRecipePage);