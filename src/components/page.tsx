import React, { ReactNode } from 'react';

import styled from 'styled-components';

import Nav from './nav';
import Header from './header';
import Footer from './footer';

export interface PageProps {
  title: string,
  children: ReactNode
};

const Main = styled.main`
  display: flex;
  justify-content: center;
  margin: 1rem 1rem 8rem 1rem;

  > div {
    max-width: 1100px;
  }

  h2 {
    color: #4acaa8;
    font-size: 2rem;
    margin: 0;
  }
`

export default (props: PageProps) => (
  <div>
    <Nav />
    <Header />
    <Main>
      <div>
        <h2>{props.title}</h2>
        {props.children}
      </div>
    </Main>
    <Footer />
  </div>
);