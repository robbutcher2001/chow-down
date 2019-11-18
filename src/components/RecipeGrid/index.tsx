import React, { ReactNode } from 'react';

import styled from 'styled-components';

export interface RecipeGridProps {
  children: ReactNode
};

const RecipeGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem 2em;
  padding: 1rem 0rem 0rem 0rem;
  margin: 0;
  list-style: none;
`

export default (props: RecipeGridProps) => (
  <RecipeGrid>
    {props.children}
  </RecipeGrid>
);