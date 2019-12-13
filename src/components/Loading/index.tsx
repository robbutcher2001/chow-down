import React from 'react';

import styled from 'styled-components';
import loadingImg from './eclipse.svg';

const Section = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`

export default () => (
  <Section>
    <img src={loadingImg}></img>
  </Section>
);