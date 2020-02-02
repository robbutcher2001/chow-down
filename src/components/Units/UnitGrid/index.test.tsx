import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

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
    <UnitGrid units={mockUnits} />
  );

  expect(unitGrid.toJSON()).toMatchSnapshot();
});

test('UnitGrid correct tag content assertion', () => {
  const { getByText } = render(
    <UnitGrid units={mockUnits} />
  );

  expect(getByText(/fake_singular1/).textContent).toEqual('fake_singular1fake_plural1');
});

test('UnitGrid render multiple units assertion', () => {
  const { getByText } = render(
    <UnitGrid units={mockUnits} />
  );

  expect(getByText(/fake_singular2/).textContent).toEqual('fake_singular2fake_plural2');
});