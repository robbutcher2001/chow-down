import React from 'react';

import styled from 'styled-components';
import foodImg from '../../food.jpg';

interface AlternateDayProps {
  title: string
};

const AlternateDay = styled.figure`
  position: relative;
  align-self: center;
  max-height: 350px;
  max-width: 450px;
  margin: 0;
  cursor: pointer;

  > img {
    width: 100%;
  }

  > figcaption {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    text-transform: capitalize;
    font-size: 2rem;
    color: white;
    background: rgba(40, 40, 40, 0.90);

    &::after {
      content: '${props => props.title}';
    }
  }
`

export default (props: AlternateDayProps) => (
  <AlternateDay title={props.title} >
    <img src={foodImg} />
    <figcaption />
  </AlternateDay>
);