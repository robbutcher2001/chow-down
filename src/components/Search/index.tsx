import React, { FunctionComponent, MouseEvent, useState, useEffect } from 'react';

import styled from 'styled-components';

import { Searchable } from '../../store/domain';
import FuzzySearch from '../../services/SearchService';

interface SearchProps {
  label: string,
  searchableItems: Searchable[],
  resultsCb: Function
};

const StyledSearch = styled.form`
  color: white;
  padding: 1rem 0 0;

  > label {
    display: flex;
    flex-direction: column;
    background-color: ${props =>
      props.theme.colour.lightGrey
    };
    border-radius: 8px;

    > span {
      padding: 0.25rem 0.5rem 0;
      color: ${props => props.theme.isDark ?
        props.theme.colour.grey :
        props.theme.colour.darkGrey
      };
    }

    > div {
      display: flex;
      align-items: center;

      > input {
        flex-grow: 1;
        border: none;
        background-color: transparent;
        ${props => props.theme.isDark &&
          `color: ${props.theme.colour.white};`
        };
        font-family: ${props =>
          props.theme.typography.fontFamily.app
        };
        font-size: ${props =>
          props.theme.typography.fontSize.large
        };
        margin: 0;
        padding: 0.4rem 0.5rem;
        -webkit-appearance: none;
      }

      > mark {
        margin: 0 1rem 0 0.5rem;
        padding: 6px 8px;
        font-size: 14px;
        line-height: 14px;
        border-radius: 8px;
        cursor: pointer;
        background-color: ${props => props.theme.colour.darkGrey};
        color: ${props => props.theme.isDark ?
          props.theme.colour.white :
          props.theme.colour.black
        };
      }
    }
  }
`

const Search: FunctionComponent<SearchProps> = (props: SearchProps) => {
  const [search, setSearch] = useState('');
  const fs = new FuzzySearch(props.searchableItems);

  useEffect(() => {
    props.resultsCb(fs.search(search));
  }, [props.searchableItems, search]);

  const handleReset = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    setSearch('');
  };

  return (
    <StyledSearch id='searchForm' onSubmit={e => e.preventDefault()}>
      <label htmlFor='search'>
        <span>{props.label}</span>
        <div>
          <input
            id='search'
            type='text'
            name='search'
            value={search}
            onChange={e => setSearch(e.currentTarget.value)}
            onFocus={e => e.currentTarget.select()}
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
            spellCheck='false'
          />
          {search.length > 0 &&
            <mark onClick={handleReset}>&#10005;</mark>
          }
        </div>
      </label>
    </StyledSearch>
  );
};

export default Search;