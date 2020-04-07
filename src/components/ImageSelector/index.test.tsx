import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import ImageSelector from '.';

const mockFormState = {
  title: 'value'
};

test('ImageSelector basic snapshot render', () => {
  const imageSelector = renderer.create(
    <ImageSelector
      name='title'
      label='The Image Selector Title'
      form={mockFormState}
      setNewFormState={jest.fn}
    />
  );

  expect(imageSelector.toJSON()).toMatchSnapshot();
});

test('Header correct tag content assertion', () => {
  const { getByText } = render(
    <ImageSelector
      name='title'
      label='The Image Selector Title'
      form={mockFormState}
      setNewFormState={jest.fn}
    />
  );

  expect(getByText(/The Image Selector Title/).textContent).toEqual('The Image Selector Title');
});