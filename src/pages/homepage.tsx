import * as React from 'react';
import { Link } from 'react-router-dom';

import styled, { css } from 'styled-components';

const Button = styled.button`
  background: transparent;
  border-radius: 6px;
  border: 2px solid palevioletred;
  color: palevioletred;
  padding: 0.5em 1.5em;

  :hover {
    background: lightgray;
    cursor: pointer;
  }

  ${(props: any) =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`

export default () => (
    <div>
        <h1>Skeleton Test Pages</h1>
        <div>
            <Link to='/units'>Units Page</Link>
        </div>
        <div>
            <Link to='/ingredients'>Ingredients Page</Link>
        </div>
        <div>
            <Link to='/recipes'>Recipes Page</Link>
        </div>
        <br />
        <Button>Styled button</Button>
    </div>
);