import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import SettingsLink from '.';

test('SettingsLink basic snapshot render', () => {
  const settingsLink = renderer.create(
    <Router history={createMemoryHistory()}>
      <SettingsLink to='fake_link' >
        <div>fake_child</div>
      </SettingsLink>
    </Router>
  );

  expect(settingsLink.toJSON()).toMatchSnapshot();
});

test('SettingsLink correct tag content assertion', () => {
  const { getByText } = render(
    <Router history={createMemoryHistory()}>
      <SettingsLink to='fake_link' >
        <div>fake_child</div>
      </SettingsLink>
    </Router>
  );

  expect(getByText(/fake_child/).textContent).toEqual('fake_child');
});