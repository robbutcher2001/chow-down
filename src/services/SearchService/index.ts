import Fuzz from 'fuzzy-matching';

import { Searchable } from '../../store/domain';

export default class FuzzySearch {
  private fm: typeof Fuzz;
  private searchableItems: Searchable[];

  constructor(searchableItems: Searchable[]) {
    this.searchableItems = searchableItems;
    this.fm = new Fuzz(this.searchableItems.flatMap(item => item.getSearchableKeywords()));
  }

  search = (term: string): Searchable[] => {
    const similar = this.fm.get(term).value || term || '';

    return this.searchableItems.filter(item =>
      item.getSearchableKeywords().find(keyword =>
        keyword && keyword.toLowerCase().includes(similar.toLowerCase())));
  };
};