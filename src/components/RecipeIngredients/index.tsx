import React, { FunctionComponent, MouseEvent } from 'react';

import styled from 'styled-components';

import { Unit } from '../../store/domain/units/types';
import { Ingredient } from '../../store/domain/ingredients/types';

import RecipeIngredient from '../RecipeIngredient';
import { Fields, FieldValidations } from '../Form';

export interface RecipeIngredientsProps {
  name: string,
  label: string,
  isPending: boolean,
  units: Unit[],
  ingredients: Ingredient[],
  quantityValidator: (quantity: string) => boolean,
  idValidator: (id: string) => boolean,
  form?: Fields,
  validFields?: FieldValidations,
  setNewFormState?: (field: string, newValue: RecipeIngredient[]) => void,
  setValidationState?: (field: string, isValid?: boolean) => void
};

export interface RecipeIngredient {
  quantity: number,
  unitId: string,
  ingredientId: string
};

const Label = styled.label`
  > div.spinning {
    min-height: 200px;
  }

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

const RecipeIngredients: FunctionComponent<RecipeIngredientsProps> = (props: RecipeIngredientsProps) => {

  const onChange = (index: number, recipeIngredient: RecipeIngredient) => {
    const recipeIngredients: RecipeIngredient[] = Object.assign([], props.form[props.name]);
    recipeIngredients[index] = recipeIngredient;

    props.setNewFormState(
      props.name,
      recipeIngredients
    );
  };

  const newRecipeIngredient = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const recipeIngredients: RecipeIngredient[] = Object.assign([], props.form[props.name]);
    recipeIngredients.push({
      quantity: 0,
      unitId: 'PLACEHOLDER',
      ingredientId: 'PLACEHOLDER'
    });

    props.setNewFormState(
      props.name,
      recipeIngredients
    );
  };

  const recipeIngredients: RecipeIngredient[] = props.form[props.name] as RecipeIngredient[];

  return (
    <Label htmlFor={props.name}>
      {props.label}
      <div className={props.isPending ? 'spinner spinning' : 'spinner'} >
        <ul id={props.name}>
          {recipeIngredients &&
            recipeIngredients.map((recipeIngredient: RecipeIngredient, index: number) =>
              <RecipeIngredient
                key={index}
                index={index}
                units={props.units}
                ingredients={props.ingredients}
                recipeIngredient={recipeIngredient}
                validFields={props.validFields}
                onChange={onChange}
                setValidationState={props.setValidationState}
                quantityValidator={props.quantityValidator}
                idValidator={props.idValidator}
              />
            )
          }
        </ul>
        <button
          type='button'
          onClick={event => newRecipeIngredient(event)}
        >
          Add Ingredient
          </button>
      </div>
    </Label>
  );
};

export default RecipeIngredients;