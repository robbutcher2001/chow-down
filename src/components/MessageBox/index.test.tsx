import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import { LoadingBox, ErrorBox } from '.';

test('LoadingBox basic snapshot render', () => {
  const loadingBox = renderer.create(
    <LoadingBox message='test_message' />
  );

  expect(loadingBox.toJSON()).toMatchSnapshot();
});

test('LoadingBox correct tag content assertion', () => {
  const { getByText } = render(
    <LoadingBox message='test_message' />
  );

  expect(getByText(/test_message/).textContent).toEqual('test_message');
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