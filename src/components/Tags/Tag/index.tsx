import React, { FunctionComponent, ReactNode } from 'react';

import styled from 'styled-components';

interface TagProps {
  children: ReactNode;
  $backgroundColour?: string;
  $textColour?: string;
};

interface StyledTagProps {
  readonly $backgroundColour?: string;
  readonly $textColour?: string;
};

const StyledTag = styled.span<StyledTagProps>`
  background-color: ${props => props.$backgroundColour};
  color: ${props => props.$textColour};
  padding: 0 0.5rem;
  font-size: ${props => props.theme.typography.fontSize.xsmall};
  border: 2px solid transparent;
  border-radius: 5px;
`

const Tag: FunctionComponent<TagProps> = (props: TagProps) =>
  <StyledTag
    $backgroundColour={props.$backgroundColour}
    $textColour={props.$textColour}
  >
    {props.children}
  </StyledTag>;

export default Tag;