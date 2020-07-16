import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface ClickableProps {
  readonly $bold?: boolean;
  readonly $inline?: boolean;
  readonly $underline?: boolean;
  readonly $small?: boolean;
  readonly $reset?: boolean;
};

const Clickable = styled.div<ClickableProps>`
  border: none;
  ${props => !props.$inline && 'border-radius: 5px;'}
  padding: ${props => props.$inline ?
    '0' :
    '0.75rem 1.5em'
  };
  font-size: ${props => props.$small ?
    props.theme.typography.fontSize.small :
    props.theme.typography.fontSize.normal
  };
  font-weight: ${props => props.$bold ?
    props.theme.typography.fontWeight.bold :
    props.theme.typography.fontWeight.normal
  };
  color: ${props => props.$reset ?
    props.theme.colour.semantic.reset :
    props.$inline ?
      props.theme.colour.blue :
      props.theme.colour.white
  };
  background-color: ${props => props.$reset || props.$inline ?
    'transparent' :
    props.theme.colour.semantic.theme
  };
  text-decoration: ${props => props.$reset || props.$underline ?
    'underline' :
    'none'
  };
`

export const Button = Clickable.withComponent('button');

export const RawLink = Clickable.withComponent('a');

export const RouterLink = Clickable.withComponent(Link);