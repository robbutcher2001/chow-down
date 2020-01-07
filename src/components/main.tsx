import React, { ReactNode } from 'react';

import styled from 'styled-components';
import Loading from './Loading';
import MessageBox from './MessageBox';

interface MainProps {
  title?: string,
  loading?: boolean,
  message?: string,
  error?: string,
  children: ReactNode
};

const Main = styled.main`
  display: flex;
  justify-content: center;
  margin: 1rem 1rem 8rem 1rem;

  > div {
    max-width: 1100px;
    width: 100%; //can this be improved by using flexbox?
  }

  h2 {
    color: #4acaa8;
    font-size: 2rem;
    margin: 0;
  }
`

// TODO: need to display error
export default (props: MainProps) => (
  <Main>
    <div>
      <h2>{props.title}</h2>
      {props.loading ?
        <Loading /> :
        props.message ?
          <MessageBox message={props.message} /> :
          props.children
      }
    </div>
  </Main>
);