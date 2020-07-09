import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';

import theme from '../../themes';
import Textarea from '.';

const mockFormState = {
  field: 'value'
};

test('Textarea basic snapshot render', () => {
  const textarea = renderer.create(
    <ThemeProvider theme={theme}>
      <Textarea
        name='title'
        label='The Textarea Title'
        validator={() => true}
        form={mockFormState}
        validFields={{}}
        setValidationState={jest.fn}
      />
    </ThemeProvider>
  );

  expect(textarea.toJSON()).toMatchSnapshot();
});