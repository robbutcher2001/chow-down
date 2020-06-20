import React from 'react';

import styled from 'styled-components';

import { Unit } from '../../../store/domain/units/types';
import UnitCard from '../UnitCard';
import { NegativeBox } from '../../MessageBox';

interface UnitGridProps {
  isLoading: boolean,
  units: Unit[]
};

const UnitGrid = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style-type: none;
  margin: 0;
  padding: 0;
  min-height: 120px;
`

export default (props: UnitGridProps) =>
  !props.isLoading && props.units.length === 0 ?
    <NegativeBox message='No units yet!' /> :
    <UnitGrid className={props.isLoading ? 'spinner spinning' : 'spinner'} >
      {props.units.map((unit, i) =>
        <UnitCard
          key={i}
          unit={unit}
        />
      )}
    </UnitGrid>;