import React from 'react';

import styled from 'styled-components';
import questionImg from './question.svg';
import foodImg from '../../food.jpg';

interface UnknownImageProps {
  hide?: boolean
};

const UnknownImage = styled.figure`
  background-image: url(${foodImg});
  background-size: cover;
  background-position: 50%;
  margin: 0;
  height: 100%;
  position: relative;
  align-self: center;
  cursor: pointer;

  aside, figcaption {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  aside {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(40, 40, 40, 0.7);

    > img {
      height: 100%;
    }
  }

  > figcaption {
    background: rgba(40, 40, 40, 0.8);

    &::after {
      content: 'No picture selected';
      visibility: hidden;
    }
  }
`

export default (props: UnknownImageProps) => (
  !props.hide &&
  <UnknownImage>
    <aside>
      <img src={questionImg} />
    </aside>
    <figcaption />
  </UnknownImage>
);