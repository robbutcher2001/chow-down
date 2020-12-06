import React, { FunctionComponent, ReactNode } from 'react';

import styled from 'styled-components';

interface TagProps {
  children: ReactNode;
  $colour?: string;
};

interface StyledTagProps {
  readonly $colour?: string;
}

const StyledTag = styled.span<StyledTagProps>`
  color: ${props => props.theme.colour.white};
  background-color: ${props => props.$colour};
  padding: 0 0.5rem;
  font-size: ${props => props.theme.typography.fontSize.xsmall};
  border: 2px solid transparent;
  border-radius: 5px;
`

const Tag: FunctionComponent<TagProps> = (props: TagProps) =>
  <StyledTag $colour={props.$colour}>
    {props.children}
  </StyledTag>;

export default Tag;