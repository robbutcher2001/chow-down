import React, { FunctionComponent, useState } from 'react';
import moment from 'moment';

import styled from 'styled-components';

import { Day, GetDayApiRequest } from '../../../store/domain/days/types';
import { UserAction } from '../../../store/app/user/types';
import DayCard from '../DayCard';

interface DayGridProps {
  failures: {
    [date: string]: string
  },
  loading: string[],
  days: {
    [date: string]: Day
  },
  getDay: (date: string) => GetDayApiRequest,
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
`

const DayGrid: FunctionComponent<DayGridProps> = (props: DayGridProps) => {
  const [dateFormat] = useState('YYYYMMDD');
  const [seekDays] = useState(8);
  const dayCards = [];

  for (let i: number = 0; i < seekDays; i++) {
    const date: string = moment().add(i, 'd').format(dateFormat);
    const day: Day = props.days[date];

    dayCards.push(
      <DayCard
        key={i}
        failed={props.failures[date]}
        isLoading={props.loading.includes(date)}
        dateFormat={dateFormat}
        date={date}
        day={day}
        getDay={props.getDay}
        setSelectingDay={props.setSelectingDay}
      />
    );
  }

  return (
    <StyledDayGrid>
      {dayCards}
    </StyledDayGrid>
  );
};

export default DayGrid;