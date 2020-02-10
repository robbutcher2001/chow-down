import React from 'react';
import renderer from 'react-test-renderer';

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