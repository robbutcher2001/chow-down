import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

interface SettingsLinkProps {
  to: string,
  children: ReactNode
};

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  font-size: 1.2rem;

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 500px;
    color: black;
    text-decoration: none;
    border: solid #4acaa8;
    border-width: 0 0 3px 0;
    padding: 1rem;
  }

  i {
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 6px;
    transform: rotate(-45deg);
  }
`

export default (props: SettingsLinkProps) => (
  <Navigation>
    <Link to={props.to}>
      {props.children}
      <i/>
    </Link>
  </Navigation>
);