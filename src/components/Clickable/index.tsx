import React, { ReactNode, MouseEvent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface ClickableProps {
  readonly $bold?: boolean;
  readonly $inline?: boolean;
  readonly $underline?: boolean;
  readonly $xsmallFont?: boolean;
  readonly $smallFont?: boolean;
  readonly $smallPadding?: boolean;
  readonly $largeBorderRadius?: boolean;
  readonly $colour?: string;
  readonly $reset?: boolean;
};

interface TagButtonProps {
  colour?: string;
  selected?: boolean;
  loading?: boolean;
  onClick?: (data: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
};

const Clickable = styled.div<ClickableProps>`
  border: none;
  ${props => !props.$inline ?
    props.$largeBorderRadius ?
      'border-radius: 2rem;' :
      'border-radius: 5px;' :
    ''
  }
  padding: ${props => props.$inline ?
    '0' :
    props.$smallPadding ?
      '0.625rem 1.125rem' :
    '0.75rem 1.5em'
  };
  font-size: ${props => props.$xsmallFont ?
    props.theme.typography.fontSize.xsmall :
    props.$smallFont ?
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
    props.$colour ?
      props.$colour :
    props.theme.colour.semantic.theme
  };
  text-decoration: ${props => props.$reset || props.$underline ?
    'underline' :
    'none'
  };
  cursor: pointer;

  &.unselected {
    background-color: ${props =>
      props.theme.colour.lightGrey
    };
    color: ${props => props.theme.isDark ?
      props.theme.colour.grey :
      props.theme.colour.darkGrey
    };
  }

  &.loading {
    cursor: auto;
    color: ${props =>
      props.theme.colour.lightGrey
    };
    position: relative;
    // filter: blur(2px);

    &:after {
      content: '';
      border-radius: 50%;
      border: 1px solid ${({ theme }) => theme.colour.white};
      border-top-color: transparent;
      width: 10px;
      height: 10px;
      position: absolute;
      left: 50%;
      top: 50%;
      // opacity: 1;
      // transition: opacity 0.8s;
      animation: spin 0.8s linear infinite;
    }
  }
`

export const TagButton = (props: TagButtonProps) =>
  <Clickable
    as='button'
    onClick={props.onClick}
    className={
      !props.selected ?
        props.loading ?
        'unselected loading' :
        'unselected' :
      undefined
    }
    disabled={props.loading}
    $smallFont
    $smallPadding
    $largeBorderRadius
    $colour={props.colour}
  >
    {props.children}
  </Clickable>;

export const Button = Clickable.withComponent('button');

export const RawLink = Clickable.withComponent('a');

export const RouterLink = Clickable.withComponent(Link);