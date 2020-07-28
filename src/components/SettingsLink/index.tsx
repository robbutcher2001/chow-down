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
  font-size: ${props =>
    props.theme.typography.fontSize.large
  };

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 400px;
    background-color: ${props =>
      props.theme.colour.lightGrey
    };
    color: ${props => props.theme.isDark ?
      props.theme.colour.white :
      props.theme.colour.black
    };
    text-decoration: none;
    border-radius: 8px;
    padding: 1rem;
  }

  i {
    border: solid;
    border-width: 0 2px 2px 0;
    border-color: ${props => props.theme.isDark ?
      props.theme.colour.white :
      props.theme.colour.black
    };
    display: inline-block;
    padding: 6px;
    transform: rotate(-45deg);
  }
`

export default (props: SettingsLinkProps) => (
  <Navigation>
    <Link to={props.to}>
      {props.children}
      <i />
    </Link>
  </Navigation>
);