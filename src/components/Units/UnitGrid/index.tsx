import React from 'react';

import styled from 'styled-components';

import { Unit } from '../../../store/domain/units/types';
import UnitCard from '../UnitCard';

interface UnitGridProps {
  units: Unit[]
};

const UnitGrid = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style-type: none;
  margin: 0;
  padding: 0;
`

export default (props: UnitGridProps) => (
  <UnitGrid>
    {props.units.map((unit, i) =>
      <UnitCard
        key={i}
        unit={unit}
      />
    )}
  </UnitGrid>
);