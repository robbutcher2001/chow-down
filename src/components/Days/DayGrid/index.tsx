import React from 'react';

import styled, { css } from 'styled-components';

import { Day } from '../../../store/domain/days/types';
import DayCard from '../DayCard';
import { NegativeBox } from '../../MessageBox';

interface DayGridProps {
  dateFormat: string,
  seekDays: number,
  days: Day[]
};

const DayGrid = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  ${(props: any) =>
  props.primary &&
  css`
      // background: palevioletred;
      // color: white;
  `};
`

export default (props: DayGridProps) =>
  props.days && props.days.length > 0 ?
    <DayGrid>
      {props.days.map((day, i) =>
        <DayCard
          key={i}
          dateFormat={props.dateFormat}
          day={day}
        />
      )}
    </DayGrid> :
    <NegativeBox message='No days yet!' />;