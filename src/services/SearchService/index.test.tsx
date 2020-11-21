import { Searchable } from '../../store/domain';
import FuzzySearch from '.';

test('SearchService should return a single result when given exact search term', () => {
  const searchableItems: Searchable[] = [{
    getSearchableKeywords: () => ['fish', 'and', 'chips']
  }, {
    getSearchableKeywords: () => ['chicken', 'risotto']
  }, {
    getSearchableKeywords: () => ['BBQ', 'pizza']
  }, {
    getSearchableKeywords: () => ['chicken', 'mushroom', 'pie']
  }];

  const fs = new FuzzySearch(searchableItems);
  const results = fs.search('fish');

  expect(results.length).toEqual(1);
  expect(results[0].getSearchableKeywords()).toEqual(['fish', 'and', 'chips']);
});

test('SearchService should return results when given a similar search term', () => {
  const searchableItems: Searchable[] = [{
    getSearchableKeywords: () => ['fish', 'and', 'chips']
  }, {
    getSearchableKeywords: () => ['chicken', 'risotto']
  }, {
    getSearchableKeywords: () => ['BBQ', 'pizza']
  }, {
    getSearchableKeywords: () => ['chicken', 'mushroom', 'pie']
  }];

  const fs = new FuzzySearch(searchableItems);
  const results = fs.search('fsh');

  expect(results.length).toEqual(1);
  expect(results[0].getSearchableKeywords()).toEqual(['fish', 'and', 'chips']);
});

test('SearchService should return at least two results when given exact search term', () => {
  const searchableItems: Searchable[] = [{
    getSearchableKeywords: () => ['fish', 'and', 'chips']
  }, {
    getSearchableKeywords: () => ['chicken', 'risotto']
  }, {
    getSearchableKeywords: () => ['BBQ', 'pizza']
  }, {
    getSearchableKeywords: () => ['chicken', 'mushroom', 'pie']
  }];

  const fs = new FuzzySearch(searchableItems);
  const results = fs.search('chicken');

  expect(results.length).toEqual(2);
  expect(results[0].getSearchableKeywords()).toEqual(['chicken', 'risotto']);
  expect(results[1].getSearchableKeywords()).toEqual(['chicken', 'mushroom', 'pie']);
});

test('SearchService should return at least two results when given a similar search term', () => {
  const searchableItems: Searchable[] = [{
    getSearchableKeywords: () => ['fish', 'and', 'chips']
  }, {
    getSearchableKeywords: () => ['chicken', 'risotto']
  }, {
    getSearchableKeywords: () => ['BBQ', 'pizza']
  }, {
    getSearchableKeywords: () => ['chicken', 'mushroom', 'pie']
  }];

  const fs = new FuzzySearch(searchableItems);
  const results = fs.search('chimken');

  expect(results.length).toEqual(2);
  expect(results[0].getSearchableKeywords()).toEqual(['chicken', 'risotto']);
  expect(results[1].getSearchableKeywords()).toEqual(['chicken', 'mushroom', 'pie']);
});

test('SearchService should return results when given different case terms', () => {
  const searchableItems: Searchable[] = [{
    getSearchableKeywords: () => ['fish', 'and', 'chips']
  }, {
    getSearchableKeywords: () => ['chicken', 'risotto']
  }, {
    getSearchableKeywords: () => ['BBQ', 'pizza']
  }, {
    getSearchableKeywords: () => ['chicken', 'mushroom', 'pie']
  }];

  const fs = new FuzzySearch(searchableItems);
  const results = fs.search('bbq');

  expect(results.length).toEqual(1);
  expect(results[0].getSearchableKeywords()).toEqual(['BBQ', 'pizza']);
});

test('SearchService should handle empty string searchable keywords', () => {
  const searchableItems: Searchable[] = [{
    getSearchableKeywords: () => ['fish', '', 'chips']
  }, {
    getSearchableKeywords: () => ['chicken', 'risotto']
  }, {
    getSearchableKeywords: () => ['BBQ', 'pizza']
  }, {
    getSearchableKeywords: () => ['chicken', 'mushroom', '']
  }];

  const fs = new FuzzySearch(searchableItems);
  const results = fs.search('mushroom');

  expect(results.length).toEqual(1);
  expect(results[0].getSearchableKeywords()).toEqual(['chicken', 'mushroom', '']);
});

test('SearchService should handle null searchable keywords', () => {
  const searchableItems: Searchable[] = [{
    getSearchableKeywords: () => ['fish', null, 'chips']
  }, {
    getSearchableKeywords: () => ['chicken', 'risotto']
  }, {
    getSearchableKeywords: () => ['BBQ', 'pizza']
  }, {
    getSearchableKeywords: () => ['chicken', 'mushroom', null]
  }];

  const fs = new FuzzySearch(searchableItems);
  const results = fs.search('mushroom');

  expect(results.length).toEqual(1);
  expect(results[0].getSearchableKeywords()).toEqual(['chicken', 'mushroom', null]);
});

test('SearchService should handle undefined searchable keywords', () => {
  const searchableItems: Searchable[] = [{
    getSearchableKeywords: () => ['fish', undefined, 'chips']
  }, {
    getSearchableKeywords: () => ['chicken', 'risotto']
  }, {
    getSearchableKeywords: () => ['BBQ', 'pizza']
  }, {
    getSearchableKeywords: () => ['chicken', 'mushroom', undefined]
  }];

  const fs = new FuzzySearch(searchableItems);
  const results = fs.search('mushroom');

  expect(results.length).toEqual(1);
  expect(results[0].getSearchableKeywords()).toEqual(['chicken', 'mushroom', undefined]);
});

test('SearchService should handle empty string searchable term', () => {
  const searchableItems: Searchable[] = [{
    getSearchableKeywords: () => ['fish', 'and', 'chips']
  }, {
    getSearchableKeywords: () => ['chicken', 'risotto']
  }, {
    getSearchableKeywords: () => ['BBQ', 'pizza']
  }, {
    getSearchableKeywords: () => ['chicken', 'mushroom', 'pie']
  }];

  const fs = new FuzzySearch(searchableItems);
  const results = fs.search('');

  expect(results.length).toEqual(4);
});

test('SearchService should handle null searchable term', () => {
  const searchableItems: Searchable[] = [{
    getSearchableKeywords: () => ['fish', 'and', 'chips']
  }, {
    getSearchableKeywords: () => ['chicken', 'risotto']
  }, {
    getSearchableKeywords: () => ['BBQ', 'pizza']
  }, {
    getSearchableKeywords: () => ['chicken', 'mushroom', 'pie']
  }];

  const fs = new FuzzySearch(searchableItems);
  const results = fs.search(null);

  expect(results.length).toEqual(4);
});

test('SearchService should handle undefined searchable term', () => {
  const searchableItems: Searchable[] = [{
    getSearchableKeywords: () => ['fish', 'and', 'chips']
  }, {
    getSearchableKeywords: () => ['chicken', 'risotto']
  }, {
    getSearchableKeywords: () => ['BBQ', 'pizza']
  }, {
    getSearchableKeywords: () => ['chicken', 'mushroom', 'pie']
  }];

  const fs = new FuzzySearch(searchableItems);
  const results = fs.search(undefined);

  expect(results.length).toEqual(4);
});