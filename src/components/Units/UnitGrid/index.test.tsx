import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../../themes';
import UnitGrid from '.';
import { Unit } from '../../../store/domain/units/types';

const mockUnits: Unit[] = [{
  id: '123',
  singular: 'fake_singular1',
  plural: 'fake_plural1'
},
{
  id: '124',
  singular: 'fake_singular2',
  plural: 'fake_plural2'
}];

test('UnitGrid basic snapshot render', () => {
  const unitGrid = renderer.create(
    <ThemeProvider theme={theme}>
      <UnitGrid isLoading={false} units={mockUnits} />
    </ThemeProvider>
  );

  expect(unitGrid.toJSON()).toMatchSnapshot();
});

test('UnitGrid basic isLoading snapshot render', () => {
  const unitGrid = renderer.create(
    <ThemeProvider theme={theme}>
      <UnitGrid isLoading={true} units={mockUnits} />
    </ThemeProvider>
  );

  expect(unitGrid.toJSON()).toMatchSnapshot();
});

test('UnitGrid correct tag content assertion', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <UnitGrid isLoading={false} units={mockUnits} />
    </ThemeProvider>
  );

  expect(getByText(/fake_singular1/).textContent).toEqual('fake_singular1fake_plural1');
});

test('UnitGrid render multiple units assertion', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <UnitGrid isLoading={false} units={mockUnits} />
    </ThemeProvider>
  );

  expect(getByText(/fake_singular2/).textContent).toEqual('fake_singular2fake_plural2');
});

test('UnitGrid correct class when not loading', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <UnitGrid isLoading={false} units={mockUnits} />
    </ThemeProvider>
  );

  expect(container.querySelector('ul').classList).toContain('spinner');
  expect(container.querySelector('ul').classList).not.toContain('spinning');
});

test('UnitGrid correct class when loading', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <UnitGrid isLoading={true} units={mockUnits} />
    </ThemeProvider>
  );

  expect(container.querySelector('ul').classList).toContain('spinner');
  expect(container.querySelector('ul').classList).toContain('spinning');
});