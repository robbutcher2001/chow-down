import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

interface TagProps {
  label: string,
  $colour?: string
};

interface StyledTagProps {
  $colour?: string
}

const StyledTag = styled.span<StyledTagProps>`
  color: #fff;
  background-color: ${props => props.$colour};
  margin: 1px;
  padding: 0 0.5rem;
  font-size: 12px;
  border: 2px solid transparent;
  border-radius: 2em;
`

const Tag: FunctionComponent<TagProps> = (props: TagProps) => {

  return (
    <StyledTag $colour={props.$colour} >
      {props.label}
    </StyledTag>
  );
};

export default Tag;