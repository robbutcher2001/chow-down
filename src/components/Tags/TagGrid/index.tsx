import React from 'react';

import styled from 'styled-components';

import { Tag } from '../../../store/domain/tags/types';

import TagComponent from '../Tag';
import { NegativeBox } from '../../MessageBox';

interface TagGridProps {
  isLoading: boolean,
  title: string,
  tags: Tag[]
};

const TagGrid = styled.div`
  h3 {
    color: ${props => props.theme.isDark ?
      props.theme.colour.lightestGrey :
      props.theme.colour.black
    };
  }

  ul {
    display: flex;
    flex-flow: row wrap;
    margin: 0;
    padding: 1rem 0rem 0rem 0rem;
    list-style: none;
    min-height: 120px;

    > li {
      flex: 1 1 50%;
      margin-bottom: 0.5rem;
    }
  }
`

export default (props: TagGridProps) =>
  !props.isLoading && props.tags.length === 0 ?
    <NegativeBox message='No tags yet!' /> :
    <TagGrid>
      <h3>{props.title}</h3>
      <ul className={props.isLoading ? 'spinner spinning' : 'spinner'} >
        {props.tags.map(tag =>
          <li key={tag.id}>
            <TagComponent
              $backgroundColour={tag.colours.background}
              $textColour={tag.colours.text}
            >
              {tag.name}
            </TagComponent>
          </li>
        )}
      </ul>
    </TagGrid>;