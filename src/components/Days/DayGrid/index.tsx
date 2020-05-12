import React, { FunctionComponent } from 'react';
import moment from 'moment';

import styled, { css } from 'styled-components';

import { Day } from '../../../store/domain/days/types';
import { UserAction } from '../../../store/app/user/types';
import DayCard from '../DayCard';

interface DayGridProps {
  dateFormat: string,
  seekDays: number,
  isLoading: boolean,
  days: Day[],
  setSelectingDay?: (day: string) => UserAction
};

const StyledDayGrid = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
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

const DayGrid: FunctionComponent<DayGridProps> = (props: DayGridProps) => {
  const dayCards = [];

  for (let i: number = 0; i < props.seekDays; i++) {
    const seekDay: string = moment().add(i, 'd').format(props.dateFormat);
    const day: Day = props.days.find(day => moment(seekDay).isSame(day.date));

    dayCards.push(
      <DayCard
        key={i}
        dateFormat={props.dateFormat}
        date={seekDay}
        day={day}
        setSelectingDay={props.setSelectingDay}
      />
    );
  }

  return (
    <StyledDayGrid className={props.isLoading ? 'spinner spinning' : 'spinner'} >
      {dayCards}
    </StyledDayGrid>
  );
};

export default DayGrid;