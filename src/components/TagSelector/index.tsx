import React, { FunctionComponent, ReactNode } from 'react';

import styled from 'styled-components';

interface TagSelectorProps {
  children: ReactNode
};

const StyledTagSelector = styled.div`
  // overflow: auto;
  // white-space: nowrap;
  padding-top: 1rem;
  display: grid;
  position: relative;

  .container {
    overflow-x: scroll;
    white-space: nowrap;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    > * {
      margin-right: 0.5rem;
      // scroll-snap-align: center;
    }
  
    > :last-child {
      margin-right: 100px;
    }

    // // from impl
    // --gutter: 20px;
    // display: grid;
    // grid-gap: calc(var(--gutter) / 2);
    // grid-template-columns: 10px;
    // grid-template-rows: minmax(150px, 1fr);
    // grid-auto-flow: column;
    // grid-auto-columns: calc(50% - var(--gutter) * 2);
    // grid-column: 1 / -1;

    // overflow-x: scroll;
    // scroll-snap-type: x proximity;
    // padding-bottom: calc(.75 * var(--gutter));
    // margin-bottom: calc(-.25 * var(--gutter));

    // &:before,
    // &:after {
    //   content: '';
    //   width: 10px;
    // }
  }

  .overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding-top: 1rem;
    background: linear-gradient(to right, rgba(0, 0, 0, 0) 85%, rgba(32, 31, 31, 1));
    pointer-events: none;
  }
`

// TODO: maybe make generic and call this HorizontalSelector
const TagSelector: FunctionComponent<TagSelectorProps> = (props: TagSelectorProps) => {

  return (
    <StyledTagSelector>
      <div className='container'>
        {props.children}
      </div>
      <div className='overlay'></div>
    </StyledTagSelector>
  );
};

export default TagSelector;