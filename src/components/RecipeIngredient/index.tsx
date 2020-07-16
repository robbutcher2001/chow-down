import React, { FunctionComponent, useEffect } from 'react';

import styled from 'styled-components';

import { Unit } from '../../store/domain/units/types';
import { Ingredient } from '../../store/domain/ingredients/types';
import { RecipeIngredient } from '../RecipeIngredients';
import { FieldValidations } from '../Form';

interface RecipeIngredientProps {
  index: number,
  units: Unit[],
  ingredients: Ingredient[],
  recipeIngredient: RecipeIngredient,
  onChange: (index: number, recipeIngredient: RecipeIngredient) => void,
  quantityValidator: (quantity: string) => boolean,
  idValidator: (id: string) => boolean,
  validFields: FieldValidations,
  setValidationState: (field: string, isValid?: boolean) => void
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
      font-size: ${props =>
        props.theme.typography.fontSize.normal
      };
      font-family: ${props =>
        props.theme.typography.fontFamily.app
      };
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

const StyledRecipeIngredient: FunctionComponent<RecipeIngredientProps> = (props: RecipeIngredientProps) => {
  const quantityId = 'quantity_' + props.index;
  const unitId = 'unit_' + props.index;
  const ingredientId = 'ingredient_' + props.index;
  const placeholder = 'PLACEHOLDER';

  useEffect(() => {
    if (!(quantityId in props.validFields)) {
      props.setValidationState(quantityId)
    }
    if (!(unitId in props.validFields)) {
      props.setValidationState(unitId)
    }
    if (!(ingredientId in props.validFields)) {
      props.setValidationState(ingredientId)
    }
  }, []);

  const onChange = (field: object) => {
    props.onChange(props.index, {
      ...props.recipeIngredient,
      ...field
    });
  };

  return (
    <RecipeIngredient>
      <label htmlFor={quantityId}>
        Quantity
        <input
          id={quantityId}
          type='number'
          step='0.01'
          min='0'
          className={props.validFields[quantityId] === false ? 'red' : undefined}
          value={props.recipeIngredient.quantity.toString()}
          onChange={event => onChange({
            quantity: event.currentTarget.value.endsWith('.') ?
              event.currentTarget.value :
              !!parseFloat(event.currentTarget.value) ?
                parseFloat(event.currentTarget.value) :
                0
          })}
          onBlur={event => props.setValidationState(
            quantityId,
            props.quantityValidator(event.currentTarget.value)
          )}
        />
      </label>
      <label htmlFor={unitId}>
        Unit
        <select
          id={unitId}
          className={props.validFields[unitId] === false ? 'red' : undefined}
          value={props.recipeIngredient.unitId}
          onChange={event => onChange({
            unitId: event.currentTarget.value
          })}
          onBlur={event => props.setValidationState(
            unitId,
            props.idValidator(event.currentTarget.value)
          )}
        >
          <option key={placeholder} value={placeholder}></option>
          {props.units.map(unit => (
            <option key={unit.id} value={unit.id}>{unit.singular}</option>
          ))}
        </select>
      </label>
      <p>of</p>
      <label htmlFor={ingredientId}>
        Ingredient
        <select
          id={ingredientId}
          className={props.validFields[ingredientId] === false ? 'red' : undefined}
          value={props.recipeIngredient.ingredientId}
          onChange={event => onChange({
            ingredientId: event.currentTarget.value
          })}
          onBlur={event => props.setValidationState(
            ingredientId,
            props.idValidator(event.currentTarget.value)
          )}
        >
          <option key={placeholder} value={placeholder}></option>
          {props.ingredients.map(ingredient => (
            <option key={ingredient.id} value={ingredient.id}>{ingredient.ingredient}</option>
          ))}
        </select>
      </label>
    </RecipeIngredient>
  );
};

export default StyledRecipeIngredient;