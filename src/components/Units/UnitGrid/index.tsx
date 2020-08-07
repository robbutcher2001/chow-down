import React from 'react';

import styled from 'styled-components';

import { Unit } from '../../../store/domain/units/types';
import UnitCard from '../UnitCard';
import { NegativeBox } from '../../MessageBox';

interface UnitGridProps {
  isLoading: boolean,
  title: string,
  units: Unit[]
};

const UnitGrid = styled.div`
  h3 {
    color: ${props => props.theme.isDark ?
      props.theme.colour.lightestGrey :
      props.theme.colour.black
    };
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    list-style-type: none;
    margin: 0;
    padding: 0;
    min-height: 120px;
  }
`

export default (props: UnitGridProps) =>
  !props.isLoading && props.units.length === 0 ?
    <NegativeBox message='No units yet!' /> :
    <UnitGrid>
      <h3>{props.title}</h3>
      <ul className={props.isLoading ? 'spinner spinning' : 'spinner'} >
        {props.units.map((unit, i) =>
          <UnitCard
            key={i}
            unit={unit}
          />
        )}
      </ul>
    </UnitGrid>;