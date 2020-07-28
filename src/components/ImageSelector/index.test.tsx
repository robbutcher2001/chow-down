import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from '../../themes';
import ImageSelector from '.';

const mockFormState = {
  title: 'value'
};

test('ImageSelector basic snapshot render', () => {
  const imageSelector = renderer.create(
    <ThemeProvider theme={theme}>
      <ImageSelector
        name='title'
        label='The Image Selector Title'
        validator={() => true}
        form={mockFormState}
        validFields={{}}
        setNewFormState={jest.fn}
        setValidationState={jest.fn}
      />
    </ThemeProvider>
  );

  expect(imageSelector.toJSON()).toMatchSnapshot();
});

test('ImageSelector correct tag content assertion', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <ImageSelector
        name='title'
        label='The Image Selector Title'
        validator={() => true}
        form={mockFormState}
        validFields={{}}
        setNewFormState={jest.fn}
        setValidationState={jest.fn}
      />
    </ThemeProvider>
  );

  expect(getByText(/The Image Selector Title/).textContent).toEqual('The Image Selector Title');
});