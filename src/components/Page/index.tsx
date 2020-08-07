import React, { ReactNode, useState, useEffect } from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../themes';
import GlobalStyles from '../../themes/global';

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
  background-color: ${props => props.theme.isDark ?
    props.theme.colour.darkGrey :
    props.theme.colour.white
  };
`

export default (props: PageProps) => {
  const darkThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const [isDarkTheme, setDarkTheme] = useState(darkThemeMediaQuery.matches);

  useEffect(() => {
    const checkTheme = (query: any) => setDarkTheme(query.matches);
    darkThemeMediaQuery.addListener(checkTheme);
    return function cleanup() {
      darkThemeMediaQuery.removeListener(checkTheme);
    };
  }, []);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Page>
        <Nav />
        <Header />
        {props.children}
        <Footer />
      </Page>
    </ThemeProvider>
  );
};