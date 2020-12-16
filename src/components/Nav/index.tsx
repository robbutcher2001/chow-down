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
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 12px 5px;
  background: ${props => props.theme.isDark ?
    props.theme.colour.black :
    props.theme.colour.white
  };

  > a {
    background: ${props => props.theme.isDark ?
      props.theme.colour.black :
      props.theme.colour.white
    };
    font-size: ${props =>
      props.theme.typography.fontSize.normal
    };
    ${props => !props.theme.isDark &&
      `font-weight: ${props.theme.typography.fontWeight.bold}`
    };
    height: 1.25rem;
    margin: 0.5rem;
    padding: 0.5rem;
    border: none;
    box-shadow: 0px 2px 0 -2px #4acaa8;
    transition: box-shadow 0.4s ease-in-out;
    color: ${props => props.theme.isDark ?
      props.theme.colour.white :
      props.theme.colour.black
    };
    text-decoration: none;

    &.active {
      box-shadow: 0px 2px 0 0px #4acaa8;

      img {
        animation-play-state: running !important;
      }
    }

    &:last-child {
      margin-left: auto;

      img {
        height: 100%;
        animation: rotate 8s linear infinite;
        animation-play-state: paused;

        ${props => !props.theme.isDark &&
          'filter: invert(1);'
        };
      }
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
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
    route === pathname ? 'active' : undefined;

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