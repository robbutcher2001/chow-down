import React from 'react';

import styled from 'styled-components';

import { Unit } from '../../../store/domain/units/types';
import UnitCard from '../UnitCard';
import { ErrorBox } from '../../MessageBox';

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

export default (props: UnitGridProps) =>
  props.units && props.units.length > 0 ?
    <UnitGrid>
      {props.units.map((unit, i) =>
        <UnitCard
          key={i}
          unit={unit}
        />
      )}
    </UnitGrid> :
    <ErrorBox message='No units yet!' />;