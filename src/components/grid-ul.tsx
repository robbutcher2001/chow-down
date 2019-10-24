import React, { ReactNode } from 'react';

import styled from 'styled-components';

export interface GridUlProps {
  children: ReactNode
};

const GridUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem 2em;
  padding: 1rem 0rem 0rem 0rem;
  margin: 0;
  list-style: none;
`

export default (props: GridUlProps) => (
  <GridUl>
    {props.children}
  </GridUl>
);