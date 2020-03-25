import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

export interface CallToAction {
  text: string,
  link: string
}

interface MainProps {
  title?: string,
  cta?: CallToAction,
  children: ReactNode
};

const StyledZeroMarginedMain = styled.main`
  display: flex;
  justify-content: center;
  margin: 1rem 0 8rem 0;

  > div {
    max-width: 1100px;
    width: 100%; //can this be improved by using flexbox?

    > section:first-child {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      line-height: 2.5rem;
      margin: 0 1rem;

      > * {
        margin: 0.5rem 0;
      }

      h2 {
        flex-grow: 1;
        min-width: 80%; //can this be improved?
        align-self: center;
        font-size: 2rem;
        color: #4acaa8;
      }

      a {
        border: none;
        border-radius: 5px;
        padding: 0 1.5em;
        height: 2.5rem;
        font-size: 1rem;
        color: white;
        background-color: #4acaa8;
        text-decoration: none;
      }
    }
  }
`

const StyledMarginedMain = styled(StyledZeroMarginedMain)`
  margin: 1rem 1rem 8rem 1rem;

  > div > section:first-child {
    margin: unset;
  }
`

const Main = (props: MainProps) => (
  <div>
    <section>
      <h2>{props.title}</h2>
      {props.cta &&
        <Link
          to={props.cta.link}>
          {props.cta.text}
        </Link>
      }
    </section>
    {props.children}
  </div>
);

export const ZeroMarginedMain = (props: MainProps) => (
  <StyledZeroMarginedMain>
    <Main {...props} />
  </StyledZeroMarginedMain>
);

export default (props: MainProps) => (
  <StyledMarginedMain>
    <Main {...props} />
  </StyledMarginedMain>
);