import React from 'react';

import styled from 'styled-components';

import { RawLink } from '../Clickable';

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: ${props =>
    props.theme.typography.fontSize.small
  };
  padding: 3rem 0;
  color: ${props => props.theme.isDark ?
    props.theme.colour.grey :
    props.theme.colour.lightBlack
  };
  background-color: ${props => props.theme.isDark ?
    props.theme.colour.lightBlack :
    props.theme.colour.lightestGrey
  };

  > p {
    margin: 1rem;
    text-align: center;
  }
`

export default () => (
  <Footer>
    <p>&copy; Rob Butcher 2020.</p>
    <p>
      {'Images: '}
      <RawLink
        $inline
        $underline
        $small
        href='https://unsplash.com/'
        target='_blank'>
        Unsplash
      </RawLink>
      {' and various recipe websites.'}
    </p>
  </Footer>
);