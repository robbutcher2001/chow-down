import React from 'react';

import styled from 'styled-components';
import negativeLightImg from './negative_light.svg';
import negativeDarkImg from './negative_dark.svg';

interface MessageBoxProps {
  message?: string
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${props =>
    props.theme.typography.fontSize.normal
  };

  img {
    content: url(${props => props.theme.isDark ?
      negativeDarkImg :
      negativeLightImg
    });
    width: 200px;
    height: 200px;
    margin-bottom: 1rem;
  }

  div {
    color: ${props => props.theme.isDark ?
      props.theme.colour.lightestGrey :
      props.theme.colour.black
    };
  }
`

export const NegativeBox = (props: MessageBoxProps) => (
  <Section>
    <img alt='Negative image' />
    <div>{props.message}</div>
  </Section>
);