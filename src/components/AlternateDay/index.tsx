import React from 'react';

import styled from 'styled-components';
import foodImg from '../../themes/food.jpg';

interface AlternateDayProps {
  title: string
};

const AlternateDay = styled.figure`
  background-image: url(${foodImg});
  background-size: cover;
  background-position: 50%;
  margin: 0;
  height: 100%;
  position: relative;
  align-self: center;
  cursor: pointer;

  > figcaption {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-size: ${props =>
      props.theme.typography.fontSize.xxlarge
    };
    font-weight: ${props =>
      props.theme.typography.fontWeight.bold
    };
    color: ${props =>
      props.theme.colour.white
    };
    background: rgba(40, 40, 40, 0.90);
    text-transform: capitalize;
    text-align: center;
    word-break: break-word;

    > div {
      padding: 2rem;
    }
  }
`

export default (props: AlternateDayProps) => (
  <AlternateDay>
    <figcaption>
      <div>{props.title}</div>
    </figcaption>
  </AlternateDay>
);