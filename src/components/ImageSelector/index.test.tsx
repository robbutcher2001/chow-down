import React from 'react';
import renderer from 'react-test-renderer';

import ImageSelector from '.';

test('ImageSelector basic snapshot render', () => {
  const imageSelector = renderer.create(
    <ImageSelector
      name='title'
      label='The Image Selector Title'
      />
  );

  expect(imageSelector.toJSON()).toMatchSnapshot();
});