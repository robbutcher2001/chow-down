import React from 'react';

import styled from 'styled-components';

interface IngredientCardProps {
  ingredient: string
};

const IngredientCard = styled.li`
  background: rgba(171, 184, 195, 0.25);
  border-left-style: solid;
  border-left-width: 0.35rem;
  border-left-color: #0693E3;
  margin: 0.5rem;
  padding: 0.75rem;
`

export default (props: IngredientCardProps) => (
  <IngredientCard>
    {props.ingredient}
  </IngredientCard>
);