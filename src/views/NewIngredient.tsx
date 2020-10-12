import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GlobalState } from '../store';
import { Ingredient, GetIngredientsApiRequest, PostIngredientApiRequest } from '../store/domain/ingredients/types';
import { getIngredientsRequest, postIngredientsRequest } from '../store/domain/ingredients/actions';

import Main from '../components/Main';
import IngredientGrid from '../components/Ingredients/IngredientGrid';
import Form from '../components/Form';
import InputBox from '../components/InputBox';
import { NegativeBox } from '../components/MessageBox';

interface StateProps {
  error: string,
  failure: string,
  ingredients: Ingredient[],
  ui: {
    pending: {
      get: boolean,
      post: boolean
    }
  }
};

interface DispatchProps {
  getIngredients: () => GetIngredientsApiRequest,
  postIngredient: (form: Ingredient) => PostIngredientApiRequest
};

interface OwnProps { };

interface OwnState { };

type CombinedProps = StateProps & DispatchProps & OwnProps;

class NewIngredientPage extends Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);
  }

  addIngredient = (form: Ingredient) => this.props.postIngredient(form);

  componentDidMount = () => this.props.getIngredients();

  render = () => (
    <Main title='New ingredient' >
      {this.props.failure &&
        <NegativeBox message={this.props.failure} />
      }
      {this.props.error ?
        <NegativeBox message={this.props.error} /> :
        <>
          <div className={this.props.ui.pending.post ? 'spinner spinning' : 'spinner'}>
            <Form
              name='ingredientForm'
              dispatch={this.addIngredient}
              submitText='Add ingredient'>
              <InputBox
                name='name'
                type='text'
                label='Ingredient name'
                validator={(value: string) => value && value.length > 0}
              />
            </Form>
          </div>
          <IngredientGrid
            isLoading={this.props.ui.pending.get}
            title='Existing ingredients'
            ingredients={this.props.ingredients}
          />
        </>
      }
    </Main>
  )
};

const mapStateToProps = ({ app, domain, ui }: GlobalState, _ownProps: OwnProps): StateProps => ({
  //TODO: move application-wide errors to footer component for toast notification (feed down through page container)
  error: app.error.message,
  failure: domain.ingredient.failure,
  ingredients: domain.ingredient.ingredients,
  ui: {
    pending: {
      get: ui.ingredient.getPending,
      post: ui.ingredient.postPending
    }
  }
});

const mapDispatchToProps = (dispatch: Dispatch, _ownProps: OwnProps): DispatchProps => ({
  getIngredients: () => dispatch(getIngredientsRequest()),
  postIngredient: (form: Ingredient) => dispatch(postIngredientsRequest(form))
});

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>
  (mapStateToProps, mapDispatchToProps)(NewIngredientPage);