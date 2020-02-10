import React, { Component, ReactElement, MouseEvent } from 'react';

import styled from 'styled-components';

import { Unit } from '../../store/domain/units/types';
import { Ingredient } from '../../store/domain/ingredients/types';

import RecipeIngredient from '../RecipeIngredient';

export interface RecipeIngredientsProps {
  units: Unit[],
  ingredients: Ingredient[]
};

//TODO type ReactElement with ReactElement<>
interface OwnState {
  recipeIngredients: ReactElement[]
};

const Section = styled.section`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  button {
    margin-top: 1rem;
  }
`

class RecipeIngredients extends Component<RecipeIngredientsProps, OwnState> {
  constructor(props: RecipeIngredientsProps) {
    super(props);

    this.state = {
      recipeIngredients: []
    };
  }

  newRecipeIngredient = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.setState(prevState => {
      const index = this.state.recipeIngredients.length;
      const recipeIngredients = Object.assign(
        [],
        prevState.recipeIngredients
      );

      recipeIngredients.push(
        <RecipeIngredient key={index} index={index} units={this.props.units} ingredients={this.props.ingredients} />
      );

      return {
        recipeIngredients
      };
    });
    console.log(this.state);
  };

  render = () => (
    <Section>
      <h3>Ingredients for this recipe</h3>
      <ul>
        {this.state.recipeIngredients}
      </ul>
      <button
        type='button'
        onClick={event => this.newRecipeIngredient(event)}
      >
        Add Ingredient
      </button>
    </Section>
  );
};

export default RecipeIngredients;