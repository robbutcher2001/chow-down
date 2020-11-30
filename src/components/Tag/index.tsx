import React, { FunctionComponent } from 'react';

import styled from 'styled-components';

interface TagProps {
  label: string;
  $colour?: string;
  $large?: boolean;
};

interface StyledTagProps {
  readonly $colour?: string;
  readonly $large?: boolean;
}

const StyledTag = styled.span<StyledTagProps>`
  color: #fff;
  display: inline-block;
  background-color: ${props => props.$colour};
  padding: ${props => props.$large ?
    '0.5rem 1rem':
    '0 0.5rem'
  };
  font-size: ${props => props.$large ?
    '14px':
    '12px'
  };
  border: 2px solid transparent;
  border-radius: 2em;
  cursor: pointer;
`

const Tag: FunctionComponent<TagProps> = (props: TagProps) => {

  return (
    <StyledTag $colour={props.$colour} $large={props.$large} >
      {props.label}
    </StyledTag>
  );
};

export default Tag;