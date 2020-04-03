import React, { Component, ReactNode, MouseEvent } from 'react';

import styled from 'styled-components';

import { Unit } from '../../store/domain/units/types';
import { Ingredient } from '../../store/domain/ingredients/types';

import RecipeIngredient from '../RecipeIngredient';
import { LoadingBox } from '../MessageBox';

export interface RecipeIngredientsProps {
  name: string,
  label: string,
  form?: {
    [key: string]: string | number
  },
  setNewFormState?: (field: string, newValue: string | number) => void,
  isPending: boolean,
  units: Unit[],
  ingredients: Ingredient[]
};

interface OwnState {
  recipeIngredients: ReactNode[]
};

const Label = styled.label`
  ul {
    list-style-type: none;
    margin: 0.5rem 0 0 0;
    padding: 0;
  }

  button {
    border: none;
    background: none;
    margin: 1rem 0;
    padding: 0;
    font-size: 1rem;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    color: #1d70b8;
    cursor: pointer;
  }
`

class RecipeIngredients extends Component<RecipeIngredientsProps, OwnState> {
  constructor(props: RecipeIngredientsProps) {
    super(props);

    this.state = {
      recipeIngredients: []
    };
  }

  // onChange = (event: MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   const value = event.currentTarget.value;
  //   this.props.setNewFormState(
  //     this.props.name,
  //     parseInt(value)
  //   );
  // };

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
    console.log(this.state.recipeIngredients);
  };

  render = () => (
    <Label htmlFor={this.props.name}>
      {this.props.label}
      {this.props.isPending ?
        <LoadingBox /> :
        <div>
          <ul id={this.props.name}>
            {this.state.recipeIngredients}
          </ul>
          <button
            type='button'
            onClick={event => this.newRecipeIngredient(event)}
          >
            Add Ingredient
          </button>
        </div>
      }
      {/* <button onClick={event => this.onChange(event)}></button> */}
    </Label>
  );
};

export default RecipeIngredients;