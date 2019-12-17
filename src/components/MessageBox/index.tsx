import React from 'react';

import styled from 'styled-components';

export interface MessageBoxProps {
  message: string
};

const Section = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  font-size: 1.5rem;
`

export default (props: MessageBoxProps) => (
  <Section>
    {props.message}
  </Section>
);