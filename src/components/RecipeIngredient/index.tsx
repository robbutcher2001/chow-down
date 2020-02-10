import React from 'react';

import styled from 'styled-components';
import { Unit } from '../../store/domain/units/types';
import { Ingredient } from '../../store/domain/ingredients/types';

export interface RecipeIngredientProps {
  index: number,
  units: Unit[],
  ingredients: Ingredient[]
};

const RecipeIngredient = styled.li`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  label {
    display: flex;
    flex-direction: column;

    > input {
      max-width: 6rem;
    }

    > select {
      min-width: 6rem;
    }

    > input, select {
      box-sizing: border-box;
      border: dashed 2px #e4e4e4;
      border-radius: 5px;
      background-color: #fff;
      padding: 0 0.5em;
      margin: 0.5rem 0;
      height: 2rem;
      font-size: 1rem;
      font-family: 'Lato', sans-serif;
      -webkit-appearance: none;
    }
  }

  label:last-child {
    flex-grow: 2;
    margin-right: 0;
  }

  label, p {
    margin: 0 2rem 0 0;
  }

  p {
    align-self: center;
  }
`

export default (props: RecipeIngredientProps) => (
  <RecipeIngredient>
    <label htmlFor={'quantity_' + props.index}>
      Quantity
      <input id={'quantity_' + props.index} type='number' min='0' />
    </label>
    <label htmlFor={'units_' + props.index}>
      Unit
      <select id={'units_' + props.index}>
        {props.units.map(unit => (
          <option key={unit.id} value={unit.id}>{unit.singular}</option>
        ))}
      </select>
    </label>
    <p>of</p>
    <label htmlFor={'ingredient_' + props.index}>
      Ingredient
      <select id={'ingredient_' + props.index}>
        {props.ingredients.map(ingredient => (
          <option key={ingredient.id} value={ingredient.id}>{ingredient.ingredient}</option>
        ))}
      </select>
    </label>
  </RecipeIngredient>
);