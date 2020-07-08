import React from 'react';

import styled from 'styled-components';
import foodImg from '../../food.jpg';
import { xsmall } from '../../breakpoints';

import { RouterLink } from '../Clickable';

const Header = styled.header`
  display: grid;
  align-items: flex-end;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: .5em;

  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(${foodImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 2rem 1rem;
  min-width: 280px; /* needs to be 280px + 2rem when using scss calculate */

  > * {
    padding: 0.75rem;
    margin: 0;
  }

  > h1 a {
    font-size: 3rem;
    color: white;
    text-decoration: none;
  }

  > p {
    color: white;
    font-size: 1.5rem;
  }

  ${xsmall`
    > * {
      padding: 0.5rem;
    }

    > h1 a {
      font-size: 2.2rem;
    }

    > p {
      font-size: 1.2rem;
    }
  `}
`

export default () => (
  <Header>
    <h1>
      <RouterLink
        $bold
        $inline
        to='/' >
        Chow Down
      </RouterLink>
    </h1>
    <p>Chow down on a weekly plan of your evening meals.</p>
  </Header>
);