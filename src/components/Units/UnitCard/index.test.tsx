import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import UnitCard from '.';
import { Unit } from '../../../store/domain/units/types';

const mockUnit: Unit = {
  id: '123',
  singular: 'fake_singular',
  plural: 'fake_plural'
};

test('UnitCard basic snapshot render', () => {
  const unitCard = renderer.create(
    <UnitCard unit={mockUnit} />
  );

  expect(unitCard.toJSON()).toMatchSnapshot();
});

test('UnitCard correct tag content assertion', () => {
  const { getByText } = render(
    <UnitCard unit={mockUnit} />
  );

  expect(getByText(/fake_singular/).textContent).toEqual('fake_singularfake_plural');
});