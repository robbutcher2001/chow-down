import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../themes';
import { NegativeBox } from '.';

test('NegativeBox basic snapshot render', () => {
  const negativeBox = renderer.create(
    <ThemeProvider theme={theme}>
      <NegativeBox message='test_negative' />
    </ThemeProvider>
  );

  expect(negativeBox.toJSON()).toMatchSnapshot();
});

test('NegativeBox correct tag content assertion', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <NegativeBox message='test_negative' />
    </ThemeProvider>
  );

  expect(getByText(/test_negative/).textContent).toEqual('test_negative');
});