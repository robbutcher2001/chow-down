import React, { ReactNode } from 'react';

import styled from 'styled-components';

import Nav from './Nav';
import Header from './Header';
import Main from './main';
import Loading from './Loading';
import MessageBox from './MessageBox';
import Footer from './footer';

export interface PageProps {
  title: string,
  loading?: boolean,
  message?: string,
  error?: string,
  children: ReactNode
};

const Page = styled.div`
  display: grid;
  align-items: flex-start;
  grid-template-rows: auto auto 1fr auto;
`

// TODO: need to display error
export default (props: PageProps) => (
  <Page>
    <Nav />
    <Header />
    <Main title={props.title}>
      {props.loading ?
        <Loading /> :
        props.message ?
          <MessageBox message={props.message} /> :
          props.children
      }
    </Main>
    <Footer />
  </Page>
);