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
  border-left-color: #0693E3;
  margin: 0.5rem;
  padding: 0.75rem;

  aside {
    font-size: 0.8rem;
    font-style: italic;
    margin-top: 0.5rem;

    &::before {
      content: "("
    }

    &::after {
      content: ")"
    }
  }
`

export default (props: UnitCardProps) => (
  <UnitCard>
    {props.unit.singular}
    <aside>{props.unit.plural}</aside>
  </UnitCard>
);