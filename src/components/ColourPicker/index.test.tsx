import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';

import theme from '../../themes';
import ColourPicker from '.';

const mockFormState = {
  field: 'value'
};

test('ColourPicker basic snapshot render', () => {
  const colourPicker = renderer.create(
    <ThemeProvider theme={theme}>
      <ColourPicker
        name='colours'
        label='Pick a colour'
        colours={[{
          background: 'red',
          text: 'white'
        }, {
          background: 'blue',
          text: 'red'
        }]}
        validator={() => true}
        form={mockFormState}
        validFields={{}}
        setValidationState={jest.fn}
      />
    </ThemeProvider>
  );

  expect(colourPicker.toJSON()).toMatchSnapshot();
});