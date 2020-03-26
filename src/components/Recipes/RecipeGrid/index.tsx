import React from 'react';

import styled from 'styled-components';

import { Recipe } from '../../../store/domain/recipes/types';
import RecipeCard from '../RecipeCard';
import { NegativeBox } from '../../MessageBox';

interface RecipeGridProps {
  recipes: Recipe[]
};

const RecipeGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem 2em;
  margin: 0;
  padding: 1rem 0rem 0rem 0rem;
  list-style: none;
`

export default (props: RecipeGridProps) =>
  props.recipes && props.recipes.length > 0 ?
    <RecipeGrid>
      {props.recipes.map((recipe, i) =>
        <RecipeCard
          key={i}
          title={recipe.title}
          description={recipe.description}
          rating={recipe.rating}
          imageUrl={recipe.image}
          imageAlt={recipe.title}
        />
      )}
    </RecipeGrid> :
    <NegativeBox message='No recipes yet!' />;