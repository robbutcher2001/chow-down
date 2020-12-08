import React, { FunctionComponent, ReactNode } from 'react';

import styled from 'styled-components';

interface HorizontalScrollerProps {
  children: ReactNode;
  small?: boolean;
};

const StyledHorizontalScroller = styled.div<{small?: boolean}>`
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
    background: ${props => props.theme.isDark ?
      'linear-gradient(to right, rgba(32, 31, 31, 0), rgba(32, 31, 31, 1))' :
      'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))'
    };
    width: ${props => props.theme.isDark ?
      '20%' :
      '10%'
    };
  }

  .scroller {
    overflow-x: scroll;
    white-space: nowrap;
    scrollbar-width: none;
    padding: ${props => props.small ?
      '0' :
      '1rem 0'
    };

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

const HorizontalScroller: FunctionComponent<HorizontalScrollerProps> = (props: HorizontalScrollerProps) => (
  <StyledHorizontalScroller small={props.small}>
    <div className='scroller'>
      {props.children}
    </div>
  </StyledHorizontalScroller>
);

export default HorizontalScroller;