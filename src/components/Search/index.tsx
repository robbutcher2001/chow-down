import React, { FunctionComponent, useState, useEffect } from 'react';

import styled from 'styled-components';

import { Recipe } from '../../store/domain/recipes/types';

interface SearchProps {
  label: string,
  searchItems: Recipe[], // TODO: make searchable with searchable interface on objects?
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

    > input {
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
  }
`

const Search: FunctionComponent<SearchProps> = (props: SearchProps) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    props.resultsCb(props.searchItems.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())));
  }, [props.searchItems, search]);

  return (
      <StyledSearch id='searchForm' >
        <label htmlFor='search'>
          <span>{props.label}</span>
          <input
            id='search'
            type='text'
            name='search'
            value={search}
            onChange={e => setSearch(e.currentTarget.value)}
          />
        </label>
      </StyledSearch>
    );
};

export default Search;