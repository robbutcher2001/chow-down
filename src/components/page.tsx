import React, { ReactNode } from 'react';

import styled from 'styled-components';

import Nav from './Nav2';
import Header from './Header';
import Main from './main';
import Footer from './footer';

export interface PageProps {
  title: string,
  children: ReactNode
};

const Page = styled.div`
  display: grid;
  align-items: flex-start;
  grid-template-rows: auto auto 1fr auto;
`

export default (props: PageProps) => (
  <Page>
    <Nav />
    <Header />
    <Main title={props.title}>
      {props.children}
    </Main>
    <Footer />
  </Page>
);