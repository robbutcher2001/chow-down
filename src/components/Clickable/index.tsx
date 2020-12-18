import React, { ReactNode, MouseEvent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface ClickableProps {
  readonly $transparentBorder?: boolean;
  readonly $bold?: boolean;
  readonly $inline?: boolean;
  readonly $underline?: boolean;
  readonly $xsmallFont?: boolean;
  readonly $smallFont?: boolean;
  readonly $smallPadding?: boolean;
  readonly $largeBorderRadius?: boolean;
  readonly $backgroundColour?: string;
  readonly $textColour?: string;
  readonly $reset?: boolean;
};

interface TagButtonProps {
  backgroundColour?: string;
  textColour?: string;
  loading?: boolean;
  selected?: boolean;
  loadFailure?: boolean;
  onClick?: (data: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
};

const Clickable = styled.div<ClickableProps>`
  border: ${props => props.$transparentBorder ?
    '1px solid transparent' :
    'none'
  };
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
    props.$textColour ?
      props.$textColour :
    props.$inline ?
      props.theme.colour.blue :
      props.theme.colour.white
  };
  background-color: ${props => props.$reset || props.$inline ?
    'transparent' :
    props.$backgroundColour ?
      props.$backgroundColour :
    props.theme.colour.semantic.theme
  };
  text-decoration: ${props => props.$reset || props.$underline ?
    'underline' :
    'none'
  };
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &.unselected {
    background-color: ${props =>
      props.theme.colour.lightGrey
    };
    color: ${props => props.theme.isDark ?
      props.theme.colour.grey :
      props.theme.colour.darkGrey
    };
    border: ${props => props.theme.isDark ?
      '1px solid rgba(255, 255, 255, 0.1)' :
      `1px solid ${props.theme.colour.darkGreyWithOpacity('0.1')}`
    };
  }

  &.loading {
    cursor: auto;
    color: ${props =>
      props.theme.colour.lightGrey
    };
    position: relative;

    &:after {
      content: '';
      border-radius: 50%;
      border: 1px solid ${({ theme }) => theme.isDark ?
        theme.colour.white :
        theme.colour.darkGrey
      };
      border-top-color: transparent;
      width: 10px;
      height: 10px;
      position: absolute;
      left: 50%;
      top: 50%;
      animation: spin 0.8s linear infinite;
    }
  }

  &.failure {
    color: ${props =>
      props.theme.colour.lightGrey
    };
    position: relative;

    &:after {
      content: '✕';
      color: ${props =>
        props.theme.colour.red
      };
      position: absolute;
      left: 0;
      right: 0;
    }
  }
`

export const TagButton = (props: TagButtonProps) =>
  <Clickable
    as='button'
    onClick={props.onClick}
    className={
      props.loadFailure ?
        'unselected failure' :
      !props.selected ?
        props.loading ?
        'unselected loading' :
        'unselected' :
      undefined
    }
    disabled={props.loading}
    $transparentBorder
    $smallFont
    $smallPadding
    $largeBorderRadius
    $backgroundColour={props.backgroundColour}
    $textColour={props.textColour}
  >
    {props.children}
  </Clickable>;

export const Button = Clickable.withComponent('button');

export const RawLink = Clickable.withComponent('a');

export const RouterLink = Clickable.withComponent(Link);