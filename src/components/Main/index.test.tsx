import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ThemeProvider } from 'styled-components';

import theme from '../../theme';
import Main from '.';

test('Main basic snapshot render', () => {
  const main = renderer.create(
    <Router history={createMemoryHistory()}>
      <ThemeProvider theme={theme}>
        <Main
          title='fake_title'
          cta={{
            text: 'fake_cta',
            link: 'fake_link'
          }}
        >
          <div>fake_child</div>
        </Main>
      </ThemeProvider>
    </Router>
  );

  expect(main.toJSON()).toMatchSnapshot();
});

test('Main correct tag content assertion', () => {
  const { getByText } = render(
    <Router history={createMemoryHistory()}>
      <ThemeProvider theme={theme}>
        <Main
          title='fake_title'
          cta={{
            text: 'fake_cta',
            link: 'fake_link'
          }}
        >
          <div>fake_child</div>
        </Main>
      </ThemeProvider>
    </Router>
  );

  expect(getByText(/fake_title/).textContent).toEqual('fake_title');
  expect(getByText(/fake_cta/).textContent).toEqual('fake_cta');
  expect(getByText(/fake_child/).textContent).toEqual('fake_child');
});