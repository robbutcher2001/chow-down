import React from 'react';

import styled from 'styled-components';

import { Unit } from '../../../store/domain/units/types';

interface UnitCardProps {
  unit: Unit
};

const UnitCard = styled.li`
  background: rgba(171, 184, 195, 0.25);
  border-left-style: solid;
  border-left-width: 0.35rem;
  border-left-color: ${props =>
    props.theme.colour.lightBlue
  };
  color: ${props => props.theme.isDark ?
    props.theme.colour.lightestGrey :
    props.theme.colour.black
  };
  margin: 0.5rem;
  padding: 0.75rem;
  border-radius: 4px;
  box-shadow: 0px 2px 2px 0 rgba(0,0,0,0.2);
  box-sizing: border-box;

  aside {
    font-size: ${props =>
      props.theme.typography.fontSize.xsmall
    };
    font-style: italic;
    margin-top: 0.5rem;

    &:before {
      content: '('
    }

    &:after {
      content: ')'
    }
  }
`

export default (props: UnitCardProps) => (
  <UnitCard>
    {props.unit.singular}
    <aside>{props.unit.plural}</aside>
  </UnitCard>
);