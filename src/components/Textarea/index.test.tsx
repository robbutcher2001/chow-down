import React from 'react';
import renderer from 'react-test-renderer';

import Textarea from '.';

const mockFormState = {
  field: 'value'
};

test('Textarea basic snapshot render', () => {
  const textarea = renderer.create(
    <Textarea
      name='title'
      label='The Textarea Title'
      validator={() => true}
      form={mockFormState}
      validFields={{}}
      setValidationState={jest.fn}
    />
  );

  expect(textarea.toJSON()).toMatchSnapshot();
});