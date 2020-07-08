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
    '0.8rem' :
    '1rem'
  };
  font-weight: ${props => props.$bold ?
    '700' :
    '400'
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