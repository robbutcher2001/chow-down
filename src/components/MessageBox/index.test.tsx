import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import { NegativeBox, ErrorBox } from '.';

test('NegativeBox basic snapshot render', () => {
  const negativeBox = renderer.create(
    <NegativeBox message='test_negative' />
  );

  expect(negativeBox.toJSON()).toMatchSnapshot();
});

test('NegativeBox correct tag content assertion', () => {
  const { getByText } = render(
    <NegativeBox message='test_negative' />
  );

  expect(getByText(/test_negative/).textContent).toEqual('test_negative');
});

test('ErrorBox basic snapshot render', () => {
  const errorBox = renderer.create(
    <ErrorBox message='test_error' />
  );

  expect(errorBox.toJSON()).toMatchSnapshot();
});

test('ErrorBox correct tag content assertion', () => {
  const { getByText } = render(
    <ErrorBox message='test_error' />
  );

  expect(getByText(/test_error/).textContent).toEqual('test_error');
});