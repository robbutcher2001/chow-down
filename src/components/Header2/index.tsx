import React from 'react';

import styled from 'styled-components';
import heroImg from './hero.jpg';

const Header = styled.header`
  display: grid;
  align-items: flex-end;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: .5em;

  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(${heroImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 2rem 1rem;
  min-width: 280px; /* needs to be 280px + 2rem when using scss calculate */

  > * {
    color: white;
    padding: .75rem;
    margin: 0;
  }

  > h1 {
    font-size: 3rem;
  }

  > p {
    font-size: 1.5rem;
  }
`

export default () => (
  <Header>
    <h1>Chow Down</h1>
    <p>Chow down on a weekly plan of your evening meals.</p>
  </Header>
);