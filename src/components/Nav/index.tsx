import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import styled from 'styled-components';
import gearImg from './gear.svg';

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 200;
  background: #000;

  > a {
    background: #000;
    font-size: 1rem;
    padding: 1rem 1rem 0.5rem 1rem;
    border: none;
    border-bottom: .5rem solid #000;
    color: #fff;
    text-decoration: none;

    &:hover, &.active {
      border-bottom-color: #4acaa8;
    }

    &:last-child {
      margin-left: auto;
      font-size: 0;
      padding: 0.8rem 0.8rem 0.3rem 0.8rem;
  
      img {
        height: 1.4rem;
        width: 1.4rem;
      }
    }
  }
`

export default () => {
  const { pathname } = useLocation();

  const routes = {
    thisWeek: '/',
    recipes: '/recipes',
    settings: '/settings'
  };

  const isActive = (route: string) =>
    route === pathname ? 'active' : '';

  return (
    <Nav>
      <Link
        className={isActive(routes.thisWeek)}
        to={routes.thisWeek}>
        Your Week
      </Link>
      <Link
        className={isActive(routes.recipes)}
        to={routes.recipes}>
        Recipes
      </Link>
      <Link
        className={isActive(routes.settings)}
        to={routes.settings}>
        <img src={gearImg}></img>
      </Link>
    </Nav>
  );
};