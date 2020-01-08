import React from 'react';

import styled from 'styled-components';

import { Ingredient } from '../../../store/domain/ingredients/types';
import IngredientCard from '../IngredientCard';
import IngredientMarker from '../IngredientMarker';

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
`

export default (props: IngredientGridProps) => (
  <IngredientGrid>
    {props.ingredients.map((ingredient, i) =>
      <IngredientCard
        key={i}
        ingredient={ingredient.ingredient}
      />
    )
    }
    <IngredientMarker mark='B' />
    {props.ingredients.map((ingredient, i) =>
      <IngredientCard
        key={i}
        ingredient={ingredient.ingredient}
      />
    )
    }
    <IngredientMarker mark='C' />
    {props.ingredients.map((ingredient, i) =>
      <IngredientCard
        key={i}
        ingredient={ingredient.ingredient}
      />
    )
    }
  </IngredientGrid>
);