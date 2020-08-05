import React, { FunctionComponent, MouseEvent } from 'react';

import styled from 'styled-components';

import { Unit } from '../../store/domain/units/types';
import { Ingredient } from '../../store/domain/ingredients/types';

import RecipeIngredient from '../RecipeIngredient';
import { Fields, FieldValidations } from '../Form';
import { Button } from '../Clickable';

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
  color: ${props => props.theme.isDark ?
    props.theme.colour.grey :
    props.theme.colour.darkGrey
  };

  > div.spinning {
    min-height: 200px;
  }

  ul {
    list-style-type: none;
    margin: 0.5rem 0 0 0;
    padding: 0;
  }

  button {
    margin: 1rem 0;
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
        <Button
          $bold
          $inline
          type='button'
          onClick={event => newRecipeIngredient(event)}
        >
          Add Ingredient
        </Button>
      </div>
    </Label>
  );
};

export default RecipeIngredients;