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
  color: #c0c0c0;
  background-color: ${props =>
    props.theme.effect.footer.backgroundColour
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