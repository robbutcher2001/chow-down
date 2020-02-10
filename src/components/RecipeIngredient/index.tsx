import React from 'react';

import styled from 'styled-components';
import { Unit } from '../../store/domain/units/types';
import { Ingredient } from '../../store/domain/ingredients/types';

export interface InputBoxProps {
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

export default (props: InputBoxProps) => (
  <RecipeIngredient>
    <label htmlFor='quantity'>
      Quantity
      <input id='quantity' type='number' min='0' />
    </label>
    <label htmlFor='units'>
      Unit
      <select id='units'>
        {props.units.map(unit => (
          <option key={unit.id} value={unit.id}>{unit.singular}</option>
        ))}
      </select>
    </label>
    <p>of</p>
    <label htmlFor='ingredient'>
      Ingredient
      <select id='ingredient'>
        {props.ingredients.map(ingredient => (
          <option key={ingredient.id} value={ingredient.id}>{ingredient.ingredient}</option>
        ))}
      </select>
    </label>
  </RecipeIngredient>
);