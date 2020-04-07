import React from 'react';

import styled from 'styled-components';
import questionImg from './question.svg';
import foodImg from '../../food.jpg';

interface UnknownImageProps {
  hide?: boolean
};

const UnknownImage = styled.figure`
  position: relative;
  align-self: center;
  max-height: 350px;
  max-width: 450px;
  margin: 0;
  cursor: pointer;

  > img {
    width: 100%;
  }

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
  <React.Fragment>
    {!props.hide &&
      <UnknownImage>
        <img src={foodImg} />
        <aside>
          <img src={questionImg} />
        </aside>
        <figcaption />
      </UnknownImage>
    }
  </React.Fragment>
);