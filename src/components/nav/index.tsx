import React from 'react';

import styled from 'styled-components';
import gearImg from './gear.svg';

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 100;
  background: #222;
  padding: 0 .75rem;

  > button {
    background: #222;
    font-size: 1rem;
    padding: 1rem 1rem 0.5rem 1rem;
    border: none;
    border-bottom: .5rem solid #222;
    color: #fff;
    cursor: pointer;
  }

  > button:hover, > button.active {
    border-bottom-color: #4acaa8;
  }

  > button:focus {
    outline: none;
  }

  > button:last-child {
    margin-left: auto;
    font-size: 0;
    padding: 0.8rem 0.8rem 0.3rem 0.8rem;

    img {
      height: 1.4rem;
      width: 1.4rem;
    }
  }
`

export default () => (
  <Nav>
    <button className='active'>This Week</button>
    <button>Recipes</button>
    <button>
      <img src={gearImg}></img>
    </button>
  </Nav>
);