import React, { ReactNode } from 'react';

import styled, { ThemeProvider } from 'styled-components';
import theme from '../../theme';

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
  min-height: 100vh;
`

//test - will need an event listener for changes though
// const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
// console.log(isDarkTheme);
// console.log(theme);

export default (props: PageProps) => (
  <Page>
    <ThemeProvider theme={theme}>
      <Nav />
      <Header />
      {props.children}
      <Footer />
    </ThemeProvider>
  </Page>
);