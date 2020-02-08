import React, { ReactNode } from 'react';

import styled from 'styled-components';

import { Ingredient } from '../../../store/domain/ingredients/types';
import IngredientCard from '../IngredientCard';
import IngredientMarker from '../IngredientMarker';
import { ErrorBox } from '../../MessageBox';

interface IngredientGridProps {
  ingredients: Ingredient[]
};

const IngredientGrid = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style-type: none;
  margin: 0;
  padding: 0;

  li:first-child {
    margin-top: 0.5rem;
  }
`

const ingredientsWithMarkers = (ingredients: Ingredient[]): ReactNode[] => {
  let previousLetter: string;

  return ingredients.reduce((arr, ingredient, i) => {
    if (ingredient.ingredient) {
      const currentLetter: string = ingredient.ingredient.charAt(0).toLocaleLowerCase();

      if (currentLetter !== previousLetter) {
        previousLetter = currentLetter;
        arr.push(<IngredientMarker
          key={currentLetter}
          mark={currentLetter.toLocaleUpperCase()}
        />);
      }

      arr.push(<IngredientCard
        key={i}
        ingredient={ingredient}
      />);
    }

    return arr;
  }, [] as ReactNode[]);
};

export default (props: IngredientGridProps) =>
  props.ingredients && props.ingredients.length > 0 ?
    <IngredientGrid>
      {ingredientsWithMarkers(props.ingredients)}
    </IngredientGrid> :
    <ErrorBox message='No ingredients yet!' />;