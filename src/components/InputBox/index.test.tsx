import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';

import theme from '../../themes';
import InputBox from '.';

const mockFormState = {
  field: 'value'
};

test('InputBox basic snapshot render', () => {
  const inputBox = renderer.create(
    <ThemeProvider theme={theme}>
      <InputBox
        name='title'
        type='text'
        label='The Input Title'
        validator={() => true}
        form={mockFormState}
        validFields={{}}
        setValidationState={jest.fn}
      />
    </ThemeProvider>
  );

  expect(inputBox.toJSON()).toMatchSnapshot();
});