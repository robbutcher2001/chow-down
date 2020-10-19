import React, { ReactNode } from 'react';

import styled from 'styled-components';

import { Ingredient } from '../../../store/domain/ingredients/types';
import IngredientCard from '../IngredientCard';
import IngredientMarker from '../IngredientMarker';
import { NegativeBox } from '../../MessageBox';

interface IngredientGridProps {
  isLoading: boolean,
  title: string,
  ingredients: Ingredient[]
};

const IngredientGrid = styled.div`
  h3 {
    color: ${props => props.theme.isDark ?
      props.theme.colour.lightestGrey :
      props.theme.colour.black
    };
  }

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    list-style-type: none;
    margin: 0;
    padding: 0;
    min-height: 120px;

    li:first-child {
      margin-top: 0.5rem;
    }
  }
`

const ingredientsWithMarkers = (ingredients: Ingredient[]): ReactNode[] => {
  let previousLetter: string;

  return ingredients.reduce((arr, ingredient, i) => {
    if (ingredient.name) {
      const currentLetter: string = ingredient.name.charAt(0).toLocaleLowerCase();

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
  !props.isLoading && props.ingredients.length === 0 ?
    <NegativeBox message='No ingredients yet!' /> :
    <IngredientGrid>
      <h3>{props.title}</h3>
      <ul className={props.isLoading ? 'spinner spinning' : 'spinner'}>
        {ingredientsWithMarkers(props.ingredients)}
      </ul>
    </IngredientGrid>;