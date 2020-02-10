import React from 'react';

import styled from 'styled-components';
import { Unit } from '../../store/domain/units/types';
import { Ingredient } from '../../store/domain/ingredients/types';

interface RecipeIngredientProps {
  index: number,
  units: Unit[],
  ingredients: Ingredient[]
};

const RecipeIngredient = styled.li`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background: rgba(171, 184, 195, 0.15);
  border-left-style: solid;
  border-left-width: 0.15rem;
  border-left-color: #0693E3;
  margin: 0 0 1rem 0;
  padding: 0.75rem;

  label {
    display: flex;
    flex-direction: column;

    > input {
      max-width: 6rem;
    }

    > select {
      min-width: 6rem;

      &[id*='units_'] {
        max-width: 8rem;
      }
    }

    > input, select {
      box-sizing: border-box;
      border: dashed 2px #e4e4e4;
      border-radius: 5px;
      background-color: #fff;
      margin: 0.5rem 0;
      padding: 0 0.5em;
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
        <option key='PLACEHOLDER' value='PLACEHOLDER'></option>
        {props.units.map(unit => (
          <option key={unit.id} value={unit.id}>{unit.singular}</option>
        ))}
      </select>
    </label>
    <p>of</p>
    <label htmlFor={'ingredient_' + props.index}>
      Ingredient
      <select id={'ingredient_' + props.index}>
        <option key='PLACEHOLDER' value='PLACEHOLDER'></option>
        {props.ingredients.map(ingredient => (
          <option key={ingredient.id} value={ingredient.id}>{ingredient.ingredient}</option>
        ))}
      </select>
    </label>
  </RecipeIngredient>
);