import React from 'react';

import styled from 'styled-components';

import { RawLink } from '../Clickable';

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.8rem;
  padding: 3rem 0;
  color: #c0c0c0;
  background-color: #fafafa;

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