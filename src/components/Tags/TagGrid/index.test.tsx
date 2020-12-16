import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ThemeProvider } from 'styled-components';

import theme from '../../../themes';
import TagGrid from '.';
import { Tag } from '../../../store/domain/tags/types';

const mockTags: Tag[] = [{
  id: '123',
  name: 'fake_tag1',
  colours: {
    background: 'red',
    text: 'white'
  }
},
{
  id: '456',
  name: 'fake_tag2',
  colours: {
    background: 'blue',
    text: 'red'
  }
}];

test('TagGrid basic snapshot render', () => {
  const tagGrid = renderer.create(
    <Router history={createMemoryHistory()}>
      <ThemeProvider theme={theme}>
        <TagGrid isLoading={false} title='Tags' tags={mockTags} />
      </ThemeProvider>
    </Router>
  );

  expect(tagGrid.toJSON()).toMatchSnapshot();
});

test('TagGrid basic isLoading snapshot render', () => {
  const tagGrid = renderer.create(
    <Router history={createMemoryHistory()}>
      <ThemeProvider theme={theme}>
        <TagGrid isLoading={true} title='Tags' tags={mockTags} />
      </ThemeProvider>
    </Router>
  );

  expect(tagGrid.toJSON()).toMatchSnapshot();
});

test('TagGrid correct tag content assertion', () => {
  const { getByText } = render(
    <Router history={createMemoryHistory()}>
      <ThemeProvider theme={theme}>
        <TagGrid isLoading={false} title='Tags' tags={mockTags} />
      </ThemeProvider>
    </Router>
  );

  expect(getByText(/fake_tag1/).textContent).toEqual('fake_tag1');
});

test('TagGrid render multiple tags assertion', () => {
  const { getByText } = render(
    <Router history={createMemoryHistory()}>
      <ThemeProvider theme={theme}>
        <TagGrid isLoading={false} title='Tags' tags={mockTags} />
      </ThemeProvider>
    </Router>
  );

  expect(getByText(/fake_tag1/).textContent).toEqual('fake_tag1');
});

test('TagGrid correct class when not loading', () => {
  const { container } = render(
    <Router history={createMemoryHistory()}>
      <ThemeProvider theme={theme}>
        <TagGrid isLoading={false} title='Tags' tags={mockTags} />
      </ThemeProvider>
    </Router>
  );

  expect(container.querySelector('ul').classList).toContain('spinner');
  expect(container.querySelector('ul').classList).not.toContain('spinning');
});

test('TagGrid correct class when loading', () => {
  const { container } = render(
    <Router history={createMemoryHistory()}>
      <ThemeProvider theme={theme}>
        <TagGrid isLoading={true} title='Tags' tags={mockTags} />
      </ThemeProvider>
    </Router>
  );

  expect(container.querySelector('ul').classList).toContain('spinner');
  expect(container.querySelector('ul').classList).toContain('spinning');
});