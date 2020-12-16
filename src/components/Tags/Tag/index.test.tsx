import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../../themes';
import Tag from '.';

test('Tag basic snapshot render', () => {
  const tag = renderer.create(
    <ThemeProvider theme={theme}>
      <Tag>
        <div>a child node</div>
      </Tag>
    </ThemeProvider>
  );

  expect(tag.toJSON()).toMatchSnapshot();
});

test('Tag correct tag content assertion', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <Tag>
        <div>a child node</div>
      </Tag>
    </ThemeProvider>
  );

  expect(getByText(/a child node/)).toBeTruthy();
});