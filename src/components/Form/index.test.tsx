import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import Form from '.';

test('Form basic snapshot render', () => {
  const form = renderer.create(
    <Form dispatch={jest.fn()} submitText='Submit Button' >
      <div>fake_child</div>
    </Form>
  );

  expect(form.toJSON()).toMatchSnapshot();
});

test('Form correct tag content assertion', () => {
  const { getByText } = render(
    <Form dispatch={jest.fn()} submitText='Submit Button' >
      <div>fake_child</div>
    </Form>
  );

  expect(getByText(/Submit Button/).textContent).toEqual('Submit Button');
  expect(getByText(/Reset/).textContent).toEqual('Reset');
});