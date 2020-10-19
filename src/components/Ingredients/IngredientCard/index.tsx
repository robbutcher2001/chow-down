import React from 'react';

import styled from 'styled-components';

import { Ingredient } from '../../../store/domain/ingredients/types';

interface IngredientCardProps {
  ingredient: Ingredient
};

const IngredientCard = styled.li`
  background: rgba(171, 184, 195, 0.25);
  border-left-style: solid;
  border-left-width: 0.35rem;
  border-left-color: ${props =>
    props.theme.colour.lightBlue
  };
  color: ${props => props.theme.isDark ?
    props.theme.colour.lightestGrey :
    props.theme.colour.black
  };
  margin: 0.5rem;
  padding: 0.75rem;
  border-radius: 4px;
  box-shadow: 0px 2px 2px 0 rgba(0,0,0,0.2);
  box-sizing: border-box;
`

export default (props: IngredientCardProps) => (
  <IngredientCard>
    {props.ingredient.name}
  </IngredientCard>
);