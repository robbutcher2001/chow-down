import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../themes';
import HorizontalScroller from '.';

test('HorizontalScroller basic snapshot render', () => {
  const horizontalScroller = renderer.create(
    <ThemeProvider theme={theme}>
      <HorizontalScroller>
        <div>a child node</div>
      </HorizontalScroller>
    </ThemeProvider>
  );

  expect(horizontalScroller.toJSON()).toMatchSnapshot();
});

test('HorizontalScroller correct tag content assertion', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <HorizontalScroller>
        <div>a child node</div>
      </HorizontalScroller>
    </ThemeProvider>
  );

  expect(getByText(/a child node/i)).toBeTruthy();
});