import React from 'react';

import styled from 'styled-components';
import loadingImg from './eclipse.svg';
import errorImg from './error.svg';

interface MessageBoxProps {
  message?: string
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  font-size: 1rem;

  img {
    width: 200px;
    height: 200px;
    margin-bottom: 1rem;
  }

  .error {
    color: #dc3545;
  }
`

//TODO: should these be of type FunctionComponent e.g. Box: FunctionComponent<MessageBoxProps> = () =>
export const LoadingBox = (props: MessageBoxProps) => (
  <Section>
    <img src={loadingImg}></img>
    {props.message}
  </Section>
);

export const ErrorBox = (props: MessageBoxProps) => (
  <Section>
    <img src={errorImg}></img>
    <div className='error'>{props.message}</div>
  </Section>
);