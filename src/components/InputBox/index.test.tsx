import React from 'react';
import renderer from 'react-test-renderer';

import InputBox from '.';

const mockFormState = {
  field: 'value'
};

test('InputBox basic snapshot render', () => {
  const inputBox = renderer.create(
    <InputBox
      name='title'
      type='text'
      placeholderText='The Input Title'
      form={mockFormState}
    />
  );

  expect(inputBox.toJSON()).toMatchSnapshot();
});