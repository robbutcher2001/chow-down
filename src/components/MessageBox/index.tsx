import React from 'react';

import styled from 'styled-components';
import negativeImg from './negative.svg';
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

  .red {
    color: #dc3545;
  }
`

//TODO: base64 inline the loading and error images as they sometimes don't download quickly
//TODO: should these be of type FunctionComponent e.g. Box: FunctionComponent<MessageBoxProps> = () =>
export const NegativeBox = (props: MessageBoxProps) => (
  <Section>
    <img src={negativeImg}></img>
    <div className='e'>{props.message}</div>
  </Section>
);

export const ErrorBox = (props: MessageBoxProps) => (
  <Section>
    <img src={errorImg}></img>
    <div className='red'>{props.message}</div>
  </Section>
);