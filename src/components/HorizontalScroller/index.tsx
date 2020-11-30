import React, { FunctionComponent, ReactNode } from 'react';

import styled from 'styled-components';

interface HorizontalScrollerProps {
  children: ReactNode
};

const StyledHorizontalScroller = styled.div`
  display: grid;
  grid-template-columns: 100%;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 10;
    background: linear-gradient(to right, rgba(32, 31, 31, 0), rgba(32, 31, 31, 1));
    width: 20%;
  }

  .scroller {
    overflow-x: scroll;
    white-space: nowrap;
    scrollbar-width: none;
    padding: 1rem 0;

    > * {
      margin-right: 0.5rem;
    }

    > :last-child {
      margin-right: 6.25rem;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

const HorizontalScroller: FunctionComponent<HorizontalScrollerProps> = (props: HorizontalScrollerProps) => {

  return (
    <StyledHorizontalScroller>
      <div className='scroller'>
        {props.children}
      </div>
    </StyledHorizontalScroller>
  );
};

export default HorizontalScroller;