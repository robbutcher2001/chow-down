import React, { ReactNode } from 'react';

import styled from 'styled-components';

import Footer from '../Footer';
import Header from '../Header';
import Nav from '../Nav';

interface PageProps {
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
    {props.children}
    <Footer />
  </Page>
);