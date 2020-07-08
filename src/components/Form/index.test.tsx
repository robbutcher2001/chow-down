import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../theme';
import Form from '.';

test('Form basic snapshot render', () => {
  const form = renderer.create(
    <ThemeProvider theme={theme}>
      <Form name='fakeForm' dispatch={jest.fn()} submitText='Submit Button' >
        <div>fake_child</div>
      </Form>
    </ThemeProvider>
  );

  expect(form.toJSON()).toMatchSnapshot();
});

test('Form correct tag content assertion', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <Form name='fakeForm' dispatch={jest.fn()} submitText='Submit Button' >
        <div>fake_child</div>
      </Form>
    </ThemeProvider>
  );

  expect(getByText(/Submit Button/).textContent).toEqual('Submit Button');
  expect(getByText(/Reset/).textContent).toEqual('Reset');
});